
import os
import subprocess
import hashlib
from typing import Optional

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
LOG_PATH = os.path.join(BASE_DIR, "logs", "system.log")
MEDIA_DIR = os.path.join(BASE_DIR, "media")
CACHE_DIR = os.path.join(BASE_DIR, "cache")

PLAYER_COMMAND = ["mpv", "--no-video", "--really-quiet"]
YTDLP_COMMAND = ["yt-dlp", "-f", "bestaudio"]

def log(msg: str) -> None:
    os.makedirs(os.path.dirname(LOG_PATH), exist_ok=True)
    with open(LOG_PATH, "a", encoding="utf-8") as f:
        f.write(msg + "\n")

def _run_subprocess(args, timeout=120) -> bool:
    try:
        result = subprocess.run(
            args,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            timeout=timeout
        )
        return result.returncode == 0
    except subprocess.TimeoutExpired:
        log(f"[media_player] Timeout running: {args}")
        return False
    except Exception as e:
        log(f"[media_player] Error running {args}: {e}")
        return False

def play_file(path: str) -> bool:
    if not os.path.exists(path):
        log(f"[media_player] File not found: {path}")
        return False
    return _run_subprocess(PLAYER_COMMAND + [path])

def play_youtube(url: str) -> bool:
    if not url:
        return False

    os.makedirs(CACHE_DIR, exist_ok=True)
    tmp_file = os.path.join(CACHE_DIR, "yt_alarm_audio.%(ext)s")

    download_cmd = YTDLP_COMMAND + ["-o", tmp_file, url]
    log(f"[media_player] Downloading YouTube audio: {url}")
    if not _run_subprocess(download_cmd, timeout=180):
        log("[media_player] yt-dlp download failed")
        return False

    # Resolve actual downloaded filename
    for fname in os.listdir(CACHE_DIR):
        if fname.startswith("yt_alarm_audio"):
            full_path = os.path.join(CACHE_DIR, fname)
            ok = play_file(full_path)
            try:
                os.remove(full_path)
            except Exception:
                pass
            return ok

    log("[media_player] No downloaded file found")
    return False

def say_text(text: str) -> bool:
    if not text:
        return False
    # Using gTTS (online system as requested)
    from gtts import gTTS
    os.makedirs(CACHE_DIR, exist_ok=True)
    h = hashlib.sha256(text.encode("utf-8")).hexdigest()[:16]
    mp3_path = os.path.join(CACHE_DIR, f"tts_{h}.mp3")

    if not os.path.exists(mp3_path):
        try:
            tts = gTTS(text=text, lang="en")
            tts.save(mp3_path)
            log(f"[media_player] Generated TTS for hash={h}")
        except Exception as e:
            log(f"[media_player] TTS generation failed: {e}")
            return False

    return play_file(mp3_path)

def play_alarm_event(youtube_url: Optional[str], tts: Optional[str]) -> None:
    tone_path = os.path.join(MEDIA_DIR, "alarm_tone.wav")

    if tts:
        say_text(tts)

    if youtube_url:
        if play_youtube(youtube_url):
            return
        log("[media_player] Falling back to local tone")

    if not play_file(tone_path):
        log("[media_player] Failed to play fallback tone")
