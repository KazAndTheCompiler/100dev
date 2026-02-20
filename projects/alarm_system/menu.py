import os
from datetime import datetime, timedelta
from typing import List, Dict, Any

from storage import load_alarms, save_alarms, load_reminders, save_reminders
from media_player import log

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def _next_alarm_id(alarms: List[Dict[str, Any]]) -> int:
    return (max((a.get("id", 0) for a in alarms), default=0) + 1) or 1


def _next_reminder_id(reminders: List[Dict[str, Any]]) -> int:
    return (max((r.get("id", 0) for r in reminders), default=0) + 1) or 1


def input_str(prompt: str) -> str:
    try:
        return input(prompt)
    except EOFError:
        return ""


def add_alarm() -> None:
    alarms = load_alarms()
    print("\n=== Add Alarm ===")
    while True:
        t_str = input_str("Enter alarm time (HH:MM, 24h): ").strip()
        try:
            dt = datetime.strptime(t_str, "%H:%M")
            hour, minute = dt.hour, dt.minute
            break
        except ValueError:
            print("Invalid time format. Please use HH:MM (24h).")

    label = input_str("Enter label (optional): ").strip()
    youtube_url = input_str("Enter YouTube URL (optional, press Enter to skip): ").strip()

    alarm_id = _next_alarm_id(alarms)
    alarm = {
        "id": alarm_id,
        "hour": hour,
        "minute": minute,
        "label": label or f"Alarm {alarm_id}",
        "youtube_url": youtube_url,
        "enabled": True,
        "last_trigger_date": None,
    }
    alarms.append(alarm)
    save_alarms(alarms)
    log(f"[menu] Added alarm id={alarm_id} time={hour:02d}:{minute:02d} label={alarm['label']}")
    print(f"Alarm {alarm_id} added.\n")


def list_alarms() -> None:
    alarms = load_alarms()
    print("\n=== Alarms ===")
    if not alarms:
        print("No alarms set.\n")
        return
    for alarm in alarms:
        status = "ON" if alarm.get("enabled", True) else "OFF"
        print(f"ID {alarm.get('id')}: {alarm.get('hour'):02d}:{alarm.get('minute'):02d} "
              f"[{status}] label='{alarm.get('label')}' "
              f"YouTube='{alarm.get('youtube_url') or '-'}'")
    print("")


def delete_alarm() -> None:
    alarms = load_alarms()
    list_alarms()
    if not alarms:
        return
    try:
        alarm_id = int(input_str("Enter alarm ID to delete: ").strip())
    except ValueError:
        print("Invalid ID.\n")
        return
    new_alarms = [a for a in alarms if a.get("id") != alarm_id]
    if len(new_alarms) == len(alarms):
        print("No alarm with that ID.\n")
        return
    save_alarms(new_alarms)
    log(f"[menu] Deleted alarm id={alarm_id}")
    print("Alarm deleted.\n")


def toggle_alarm() -> None:
    alarms = load_alarms()
    list_alarms()
    if not alarms:
        return
    try:
        alarm_id = int(input_str("Enter alarm ID to toggle ON/OFF: ").strip())
    except ValueError:
        print("Invalid ID.\n")
        return
    found = False
    for alarm in alarms:
        if alarm.get("id") == alarm_id:
            alarm["enabled"] = not alarm.get("enabled", True)
            state = "ON" if alarm["enabled"] else "OFF"
            log(f"[menu] Toggled alarm id={alarm_id} -> {state}")
            print(f"Alarm {alarm_id} is now {state}.\n")
            found = True
            break
    if not found:
        print("No alarm with that ID.\n")
        return
    save_alarms(alarms)


def add_reminder() -> None:
    reminders = load_reminders()
    print("\n=== Add Reminder ===")
    try:
        minutes = int(input_str("Remind me in how many minutes? ").strip())
        if minutes <= 0:
            raise ValueError
    except ValueError:
        print("Invalid number of minutes.\n")
        return
    message = input_str("Reminder message (spoken): ").strip() or "Reminder"
    now = datetime.now()
    due_at = now + timedelta(minutes=minutes)
    reminder_id = _next_reminder_id(reminders)
    reminder = {
        "id": reminder_id,
        "message": message,
        "created_at": now.isoformat(),
        "due_at": due_at.isoformat(),
        "spoken": False,
    }
    reminders.append(reminder)
    save_reminders(reminders)
    log(f"[menu] Added reminder id={reminder_id} in {minutes} minutes message='{message}'")
    print(f"Reminder {reminder_id} set for {minutes} minutes from now.\n")


def list_reminders() -> None:
    reminders = load_reminders()
    print("\n=== Reminders ===")
    if not reminders:
        print("No reminders set.\n")
        return
    for r in reminders:
        status = "DONE" if r.get("spoken") else "PENDING"
        print(f"ID {r.get('id')}: due_at={r.get('due_at')} [{status}] message='{r.get('message')}'")
    print("")


def delete_reminder() -> None:
    reminders = load_reminders()
    list_reminders()
    if not reminders:
        return
    try:
        reminder_id = int(input_str("Enter reminder ID to delete: ").strip())
    except ValueError:
        print("Invalid ID.\n")
        return
    new_reminders = [r for r in reminders if r.get("id") != reminder_id]
    if len(new_reminders) == len(reminders):
        print("No reminder with that ID.\n")
        return
    save_reminders(new_reminders)
    log(f"[menu] Deleted reminder id={reminder_id}")
    print("Reminder deleted.\n")


def main_menu() -> None:
    while True:
        print("=== YouTube Alarm & Reminder Menu ===")
        print("1) Add alarm")
        print("2) List alarms")
        print("3) Delete alarm")
        print("4) Toggle alarm ON/OFF")
        print("5) Add reminder (X minutes)")
        print("6) List reminders")
        print("7) Delete reminder")
        print("8) Exit")
        choice = input_str("Select option: ").strip()
        if choice == "1":
            add_alarm()
        elif choice == "2":
            list_alarms()
        elif choice == "3":
            delete_alarm()
        elif choice == "4":
            toggle_alarm()
        elif choice == "5":
            add_reminder()
        elif choice == "6":
            list_reminders()
        elif choice == "7":
            delete_reminder()
        elif choice == "8":
            print("Exiting menu.")
            break
        else:
            print("Invalid choice.\n")


if __name__ == "__main__":
    main_menu()
