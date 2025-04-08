import yt_dlp
import os

# Funkcja do pobierania wideo z TikTok
def download_tiktok_video(url, custom_filename=None):
    # Tworzymy folder downloads, jeśli nie istnieje
    download_folder = 'edits'
    if not os.path.exists(download_folder):
        os.makedirs(download_folder)

    # Jeśli użytkownik podał niestandardową nazwę pliku, użyj jej
    if custom_filename:
        output_template = os.path.join(download_folder, custom_filename + '.%(ext)s')
    else:
        # Inaczej użyj tytułu wideo z TikToka
        output_template = os.path.join(download_folder, '%(title)s.%(ext)s')

    # Konfiguracja yt-dlp
    ydl_opts = {
        'outtmpl': output_template,  # Ustawienie ścieżki zapisu
        'format': 'bestvideo+bestaudio/best',  # Pobranie najlepszego dostępnego wideo i audio
        'noplaylist': True,  # Nie pobieramy playlist
        'quiet': False  # Pokazuje logi pobierania
    }

    # Pobieranie wideo
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

# Wprowadź URL wideo TikToka, które chcesz pobrać
tiktok_url = input("Podaj URL wideo z TikToka: ")
# Opcjonalnie, wprowadź niestandardową nazwę pliku
custom_filename = input("Podaj niestandardową nazwę pliku (lub naciśnij Enter, aby użyć tytułu wideo): ")

# Jeśli użytkownik nie podał nazwy, użyj domyślnej (pusty ciąg)
if custom_filename.strip() == "":
    custom_filename = None

download_tiktok_video(tiktok_url, custom_filename)
