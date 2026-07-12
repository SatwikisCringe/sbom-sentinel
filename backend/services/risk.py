from services.loader import load_identity_events


def get_risk_summary():
    df = load_identity_events()

    anomalies = df[df["is_anomaly"] == True]

    summary = {
        "Critical": 0,
        "High": 0,
        "Medium": 0,
        "Low": 0
    }

    if "severity" in anomalies.columns:
        counts = anomalies["severity"].value_counts()

        for level in summary.keys():
            summary[level] = int(counts.get(level, 0))

    total = len(anomalies)

    summary["Total"] = total

    return summary