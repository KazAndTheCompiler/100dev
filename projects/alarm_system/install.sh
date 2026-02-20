#!/usr/bin/env bash
set -e

echo "[install] Updating package list..."
sudo apt-get update -y

echo "[install] Installing system packages (mpv, python3-pip)..."
sudo apt-get install -y mpv python3-pip

echo "[install] Installing Python packages (gTTS)..."
pip3 install --user gTTS

echo "[install] Installation complete."
echo ""
echo "To start the alarm engine (in background, e.g. via tmux or systemd):"
echo "  cd $(dirname "$0")"
echo "  nohup python3 alarm_engine.py >/dev/null 2>&1 &"
echo ""
echo "To start the reminder engine (in background, e.g. via tmux or systemd):"
echo "  cd $(dirname "$0")"
echo "  nohup python3 reminder_engine.py >/dev/null 2>&1 &"
echo ""
echo "To open the menu (over SSH):"
echo "  cd $(dirname "$0")"
echo "  python3 menu.py"
