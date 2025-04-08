import yt_dlp
import os

# Funkcja do pobierania wideo z TikTok
def download_tiktok_video(url):
    # Tworzymy folder downloads, jeśli nie istnieje
    download_folder = 'edits'
    if not os.path.exists(download_folder):
        os.makedirs(download_folder)

    # Konfiguracja yt-dlp
    ydl_opts = {
        'outtmpl': os.path.join(download_folder, '%(title)s.%(ext)s'),  # Ustawienie ścieżki zapisu
        'format': 'bestvideo+bestaudio/best',  # Pobranie najlepszego dostępnego wideo i audio
        'noplaylist': True,  # Nie pobieramy playlist
        'quiet': False  # Pokazuje logi pobierania
    }

    # Pobieranie wideo
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

# Wprowadź URL wideo TikToka, które chcesz pobrać
tiktok_url = input("Podaj URL wideo z TikToka: ")
download_tiktok_video(tiktok_url)
