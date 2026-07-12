import pandas as pd


def load_events(file_path):
    return pd.read_csv(file_path)


def dashboard_stats(df):
    total_events = len(df)

    # Find the label column automatically
    label_col = None
    for col in df.columns:
        if col.lower() in ["label", "labels", "class", "target"]:
            label_col = col
            break

    if label_col:
        anomalies = len(df[df[label_col] != 0])
        normal = total_events - anomalies
    else:
        anomalies = 0
        normal = total_events

    return {
        "total_events": total_events,
        "anomalies": anomalies,
        "normal_events": normal
    }


def recent_anomalies(df):
    label_col = None

    for col in df.columns:
        if col.lower() in ["label", "labels", "class", "target"]:
            label_col = col
            break

    if label_col:
        recent = df[df[label_col] != 0].tail(10)
    else:
        recent = df.tail(10)

    return recent.to_dict(orient="records")