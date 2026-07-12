import pandas as pd


def load_identity_events():
    return pd.read_csv("data/identity_events_labels.csv")


def load_identity_users():
    return pd.read_csv("data/identity_users_labels.csv")