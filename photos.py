import os
import requests
import time

SAVE_FOLDER = "Photos"
os.makedirs(SAVE_FOLDER, exist_ok=True)

def download_image(image_url, filename):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    try:
        response = requests.get(image_url, headers=headers, stream=True)
        response.raise_for_status()
        
        with open(filename, 'wb') as file:
            for chunk in response.iter_content(1024):
                file.write(chunk)
        print(f"Zapisano: {filename}")
    except Exception as e:
        print(f"Błąd podczas pobierania {image_url}: {e}")

if __name__ == "__main__":
    print("Podaj URL obrazu z Imgur (np. https://imgur.com/fZA6P5X):")
    imgur_url = input().strip()
    
    # Jeśli podano link do strony (imgur.com/xxx), zamień na bezpośredni link do obrazu (i.imgur.com/xxx.png)
    if "imgur.com" in imgur_url and not imgur_url.startswith(("http://i.imgur.com", "https://i.imgur.com")):
        image_id = os.path.basename(imgur_url)
        image_url = f"https://i.imgur.com/{image_id}.png"
    else:
        image_url = imgur_url
    
    filename = os.path.join(SAVE_FOLDER, os.path.basename(image_url))
    download_image(image_url, filename)
    time.sleep(1)  # Ogranicz requesty