import pandas as pd
import json
import os


def parse_file(file_path):
    """
    Detect whether the uploaded file is CSV or JSON
    and return its contents.
    """

    extension = os.path.splitext(file_path)[1].lower()

    if extension == ".csv":
        df = pd.read_csv(file_path)
        return df.to_dict(orient="records")

    elif extension == ".json":
        with open(file_path, "r", encoding="utf-8") as file:
            return json.load(file)

    else:
        raise ValueError("Unsupported file format")