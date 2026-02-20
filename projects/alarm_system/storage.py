import json
import os
import threading
from typing import List, Dict, Any

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ALARMS_PATH = os.path.join(BASE_DIR, "alarms.json")
REMINDERS_PATH = os.path.join(BASE_DIR, "reminders.json")

_file_lock = threading.Lock()


def _load_json(path: str) -> Any:
    if not os.path.exists(path):
        return []
    with _file_lock:
        with open(path, "r", encoding="utf-8") as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return []


def _save_json(path: str, data: Any) -> None:
    tmp_path = path + ".tmp"
    with _file_lock:
        with open(tmp_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        os.replace(tmp_path, path)


def load_alarms() -> List[Dict[str, Any]]:
    data = _load_json(ALARMS_PATH)
    return data if isinstance(data, list) else []


def save_alarms(alarms: List[Dict[str, Any]]) -> None:
    _save_json(ALARMS_PATH, alarms)


def load_reminders() -> List[Dict[str, Any]]:
    data = _load_json(REMINDERS_PATH)
    return data if isinstance(data, list) else []


def save_reminders(reminders: List[Dict[str, Any]]) -> None:
    _save_json(REMINDERS_PATH, reminders)
