import asyncio
import json
import random
from contextlib import asynccontextmanager
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from pydantic import BaseModel, constr
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan event handler for FastAPI.
    Manages background tasks like the live data streamer.
    """
    asyncio.create_task(data_streamer())
    yield
    # Shutdown logic could go here

app = FastAPI(title="SmartVenue AI Backend", lifespan=lifespan)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(GZipMiddleware, minimum_size=1000)

# Security and Google Services
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    """
    Adds essential HTTP security headers to all responses.
    Prevents clickjacking, XSS, and enforces HTTPS.
    """
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "https://smartvenue.app"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_text(json.dumps(message))
            except Exception:
                pass

manager = ConnectionManager()

# Simulate live venue data
async def data_streamer():
    """
    Simulates a continuous stream of live venue metrics including
    zone density and queue times, broadcasting to all connected clients.
    """
    while True:
        # Generate random fluctuations in density and queue times
        data = {
            "type": "venue_update",
            "zones": [
                {"id": "north", "density": round(random.uniform(85, 95), 1), "status": "critical"},
                {"id": "south", "density": round(random.uniform(30, 40), 1), "status": "optimal"},
                {"id": "east",  "density": round(random.uniform(70, 85), 1), "status": "warning"},
                {"id": "west",  "density": round(random.uniform(50, 70), 1), "status": "nominal"}
            ],
            "queues": [
                {"id": 1, "wait": random.randint(5, 15)},
                {"id": 2, "wait": random.randint(15, 25)},
                {"id": 3, "wait": random.randint(1, 10)},
                {"id": 4, "wait": random.randint(10, 20)}
            ]
        }
        await manager.broadcast(data)
        await asyncio.sleep(2) # Send update every 2 seconds

@app.websocket("/ws/venue")
async def websocket_endpoint(websocket: WebSocket):
    """
    WebSocket endpoint for real-time venue updates.
    """
    await manager.connect(websocket)
    try:
        while True:
            # Keep connection open, handle incoming if needed
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

# Security: Input validation using Pydantic
class AssistantQuery(BaseModel):
    query: constr(min_length=1, max_length=500)

@app.post("/api/assistant")
@limiter.limit("20/minute")
async def chat_assistant(request: Request, body: AssistantQuery):
    """
    AI Assistant endpoint to process user queries.
    Rate limited to 20 requests per minute to prevent abuse.
    """
    # Mock AI response for now
    user_query = body.query.lower()
    
    if "seat" in user_query:
        return {"response": "Your seat is located in Section 112, Row G. I have highlighted the fastest route on your map, which avoids the current congestion at the East Concourse."}
    elif "food" in user_query or "order" in user_query:
        return {"response": "Hot Dog Hub is currently the fastest option with a 3-minute wait. Would you like me to place a pre-order for pickup?"}
    else:
        return {"response": "I am monitoring the venue. All systems are operating within nominal parameters. How can I assist your event experience?"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
