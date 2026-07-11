from services.file_parser import parse_file
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil

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

# Create uploads folder if it doesn't exist
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/")
def home():
    return {
        "message": "Welcome to SBOM Sentinel 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "Backend Running"
    }


@app.get("/dashboard")
def dashboard():
    return {
        "security_score": 82,
        "vulnerabilities": 5,
        "license_issues": 2,
        "dependencies": 50
    }


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Parse the uploaded file
    parsed_data = parse_file(file_path)

    return {
        "message": "File uploaded successfully!",
        "filename": file.filename,
        "rows": len(parsed_data),
        "preview": parsed_data[:5]
    }