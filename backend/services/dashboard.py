from services.loader import load_identity_events


def get_dashboard_data():
    df = load_identity_events()

    anomaly_mask = (
        df["is_anomaly"]
        .astype(str)
        .str.strip()
        .str.lower()
        .isin(["true", "1", "yes"])
    )

    anomalies = df[anomaly_mask].copy()

    severity = (
        anomalies["severity"]
        .fillna("NONE")
        .astype(str)
        .str.strip()
        .str.upper()
    )

    return {
        "total_events": int(len(df)),
        "total_anomalies": int(len(anomalies)),
        "critical": int((severity == "CRITICAL").sum()),
        "high": int((severity == "HIGH").sum()),
        "medium": int((severity == "MEDIUM").sum()),
        "low": int((severity == "LOW").sum()),
    }


def get_recent_alerts(limit=10):
    df = load_identity_events()

    anomaly_mask = (
        df["is_anomaly"]
        .astype(str)
        .str.strip()
        .str.lower()
        .isin(["true", "1", "yes"])
    )

    alerts = df[anomaly_mask]

    return alerts.head(limit).to_dict(orient="records")