
import time
from datetime import datetime, timedelta, date
from typing import List, Dict, Any

from storage import load_alarms, save_alarms
from media_player import play_alarm_event, log

def _compute_next_fire(alarm: Dict[str, Any]) -> datetime:
    now = datetime.now()
    hour = int(alarm.get("hour", 0))
    minute = int(alarm.get("minute", 0))
    fire_time = now.replace(hour=hour, minute=minute, second=0, microsecond=0)

    if fire_time <= now:
        fire_time += timedelta(days=1)

    return fire_time

def run_alarm_loop() -> None:
    log("[alarm_engine] Starting deterministic alarm loop")

    while True:
        alarms: List[Dict[str, Any]] = load_alarms()
        enabled_alarms = [a for a in alarms if a.get("enabled", True)]

        if not enabled_alarms:
            time.sleep(60)
            continue

        next_alarm = min(enabled_alarms, key=_compute_next_fire)
        next_fire_time = _compute_next_fire(next_alarm)

        sleep_seconds = (next_fire_time - datetime.now()).total_seconds()
        if sleep_seconds > 0:
            time.sleep(sleep_seconds)

        # Reload to avoid stale state
        alarms = load_alarms()
        today_str = date.today().isoformat()

        for alarm in alarms:
            if not alarm.get("enabled", True):
                continue

            hour = int(alarm.get("hour", 0))
            minute = int(alarm.get("minute", 0))
            tts = alarm.get("tts")
            youtube_url = alarm.get("youtube_url")
            last_date = alarm.get("last_trigger_date")

            now = datetime.now()
            alarm_time = now.replace(hour=hour, minute=minute, second=0, microsecond=0)

            if now >= alarm_time and last_date != today_str:
                log(f"[alarm_engine] Firing alarm id={alarm.get('id')}")
                play_alarm_event(youtube_url, tts)
                alarm["last_trigger_date"] = today_str
                save_alarms(alarms)
