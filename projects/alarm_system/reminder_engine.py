import os
import time
from datetime import datetime
from typing import List, Dict, Any

from storage import load_reminders, save_reminders
from media_player import say_text, log


def run_reminder_loop(poll_interval: int = 10) -> None:
    log("[reminder_engine] Starting reminder loop")
    while True:
        try:
            now = datetime.now()
            reminders: List[Dict[str, Any]] = load_reminders()
            changed = False

            for reminder in reminders:
                if reminder.get("spoken"):
                    continue
                due_at_str = reminder.get("due_at")
                message = reminder.get("message") or "Reminder"
                if not due_at_str:
                    continue
                try:
                    due_at = datetime.fromisoformat(due_at_str)
                except ValueError:
                    continue

                if now >= due_at:
                    log(f"[reminder_engine] Speaking reminder id={reminder.get('id')} message={message}")
                    if not say_text(message):
                        log("[reminder_engine] TTS failed for reminder")
                    reminder["spoken"] = True
                    changed = True

            if changed:
                save_reminders(reminders)

        except Exception as e:
            log(f"[reminder_engine] Unexpected error in loop: {e}")

        time.sleep(poll_interval)


if __name__ == "__main__":
    run_reminder_loop()
