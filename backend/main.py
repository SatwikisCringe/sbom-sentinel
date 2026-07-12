from services.risk import get_risk_summary
from services.users import get_users, get_top_risky_users
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from services.dashboard import (
    get_dashboard_data,
    get_recent_alerts,
)

app = FastAPI(
    title="Identity & Access Risk Analyzer",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Identity & Access Risk Analyzer Running"
    }


@app.get("/health")
def health():
    return {
        "status": "running"
    }


@app.get("/dashboard")
def dashboard():
    return get_dashboard_data()


@app.get("/alerts")
def alerts():
    return get_recent_alerts()
@app.get("/users")
def users():
    return get_users()


@app.get("/top-users")
def top_users():
    return get_top_risky_users()

@app.get("/risk-summary")
def risk_summary():
    return get_risk_summary()