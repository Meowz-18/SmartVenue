import pytest
from fastapi.testclient import TestClient
from main import app
import json

client = TestClient(app)

def test_chat_assistant_seat():
    response = client.post("/api/assistant", json={"query": "where is my seat?"})
    assert response.status_code == 200
    assert "Section 112" in response.json()["response"]

def test_chat_assistant_food():
    response = client.post("/api/assistant", json={"query": "I want some food"})
    assert response.status_code == 200
    assert "Hot Dog Hub" in response.json()["response"]

def test_chat_assistant_general():
    response = client.post("/api/assistant", json={"query": "hello"})
    assert response.status_code == 200
    assert "nominal parameters" in response.json()["response"]

def test_security_headers():
    response = client.get("/api/assistant")
    # This is a POST endpoint so GET returns 405, but headers should still be present
    assert response.headers.get("x-content-type-options") == "nosniff"
    assert response.headers.get("x-frame-options") == "DENY"

def test_websocket_connection():
    with client.websocket_connect("/ws/venue") as websocket:
        # We connected successfully, no exception thrown
        pass
