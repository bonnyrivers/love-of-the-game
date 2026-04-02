import json
from functools import lru_cache
from pathlib import Path


COPY_FILE_PATH = Path(__file__).resolve().parent.parent / "copy.json"


@lru_cache(maxsize=1)
def get_copy_data() -> dict:
    with COPY_FILE_PATH.open("r", encoding="utf-8") as file:
        return json.load(file)
