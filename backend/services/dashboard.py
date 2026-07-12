from services.loader import load_identity_events


def get_dashboard_data():
    df = load_identity_events()

    total_events = len(df)

    anomalies = df[df["is_anomaly"] == True]

    critical = len(anomalies[anomalies["severity"] == "Critical"])
    high = len(anomalies[anomalies["severity"] == "High"])
    medium = len(anomalies[anomalies["severity"] == "Medium"])
    low = len(anomalies[anomalies["severity"] == "Low"])

    return {
        "total_events": total_events,
        "total_anomalies": len(anomalies),
        "critical": critical,
        "high": high,
        "medium": medium,
        "low": low
    }


def get_recent_alerts(limit=10):
    df = load_identity_events()

    alerts = df[df["is_anomaly"] == True]

    return alerts.head(limit).to_dict(orient="records")