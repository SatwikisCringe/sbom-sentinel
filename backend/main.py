from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="SBOM Sentinel",
    description="Software Supply Chain Risk Analyzer",
    version="1.0.0"
)

# Allow React frontend to talk to FastAPI
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
        "message": "Welcome to SBOM Sentinel 🚀"
    }

@app.get("/health")
def health():
    return {
        "status": "Backend Running",
        "project": "SBOM Sentinel",
        "version": "1.0.0"
    }