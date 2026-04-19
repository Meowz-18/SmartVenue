import asyncio
import json
import random
from contextlib import asynccontextmanager
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, constr

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    asyncio.create_task(data_streamer())
    yield
    # Shutdown logic could go here

app = FastAPI(title="SmartVenue AI Backend", lifespan=lifespan)

# Security and Google Services
@app.middleware("http")
async def add_security_headers(request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
async def chat_assistant(request: AssistantQuery):
    # Mock AI response for now
    user_query = request.query.lower()
    
    if "seat" in user_query:
        return {"response": "Your seat is located in Section 112, Row G. I have highlighted the fastest route on your map, which avoids the current congestion at the East Concourse."}
    elif "food" in user_query or "order" in user_query:
        return {"response": "Hot Dog Hub is currently the fastest option with a 3-minute wait. Would you like me to place a pre-order for pickup?"}
    else:
        return {"response": "I am monitoring the venue. All systems are operating within nominal parameters. How can I assist your event experience?"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
