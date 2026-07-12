from services.loader import load_identity_users


def get_users():
    df = load_identity_users()

    return df.to_dict(orient="records")


def get_top_risky_users(limit=10):
    df = load_identity_users()

    if "risk_score" in df.columns:
        df = df.sort_values(by="risk_score", ascending=False)

    return df.head(limit).to_dict(orient="records")