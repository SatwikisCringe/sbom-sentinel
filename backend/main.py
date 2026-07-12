from services.risk import get_risk_summary
from services.users import get_users, get_top_risky_users
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
import pandas as pd

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
UPLOAD_FOLDER = "uploads"
DATA_FILE = "data/identity_events_labels.csv"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs("data", exist_ok=True)


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

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No file selected"
        )

    if not file.filename.lower().endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Only CSV files are supported"
        )

    upload_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    try:
        with open(upload_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        df = pd.read_csv(upload_path)

        required_columns = {
            "record_id",
            "user_id",
            "username",
            "is_anomaly",
            "anomaly_type",
            "severity",
            "explanation",
        }

        missing_columns = required_columns - set(df.columns)

        if missing_columns:
            raise HTTPException(
                status_code=400,
                detail={
                    "message": "CSV has missing required columns",
                    "missing_columns": sorted(missing_columns),
                },
            )

        df.to_csv(DATA_FILE, index=False)

        return {
            "message": "Identity event data analyzed successfully",
            "filename": file.filename,
            "total_records": int(len(df)),
        }

    except HTTPException:
        raise

    except pd.errors.EmptyDataError:
        raise HTTPException(
            status_code=400,
            detail="The uploaded CSV is empty"
        )

    except pd.errors.ParserError:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is not a valid CSV"
        )

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Upload processing failed: {str(error)}"
        )

    finally:
        await file.close()