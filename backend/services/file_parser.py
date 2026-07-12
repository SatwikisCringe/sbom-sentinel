import pandas as pd
import os


def parse_file(file_path):
    extension = os.path.splitext(file_path)[1].lower()

    if extension == ".csv":
        df = pd.read_csv(file_path)

    elif extension == ".json":
        df = pd.read_json(file_path)

    else:
        raise ValueError("Unsupported file format")

    return df.to_dict(orient="records")