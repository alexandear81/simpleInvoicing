import csv
import os
import translators as ts
from collections import defaultdict

INPUT_CSV = "Polish_Labels.csv"  # файл с колонками: Key,Polish
TARGET_LANGS = ["en", "ru", "uk"]
OUTPUT_DIR = "output_translations"

os.makedirs(OUTPUT_DIR, exist_ok=True)

# Загрузка исходных данных
with open(INPUT_CSV, newline='', encoding="utf-8") as f:
    reader = csv.DictReader(f)
    rows = list(reader)

# Основной словарь перевода
translations = {lang: {} for lang in TARGET_LANGS}
missed = defaultdict(list)  # Пропущенные ключи

for row in rows:
    key = row["Key"]
    polish_text = row["Polish"]

    for lang in TARGET_LANGS:
        try:
            print(f"Let's translate: {key} to {lang}: {polish_text}")
            translated = ts.translate_text(from_language="pl", to_language=lang, query_text=polish_text, translator="google")
            print(f"And the answer is: {translated}")
            translations[lang][key] = translated
        except Exception as e:
            print(f"⚠️ Error translating {key} to {lang}: {polish_text} --> {e}")
            translations[lang][key] = polish_text  # fallback
            missed[lang].append((key, polish_text))

# Сохраняем переводы в JSON-подобных .ts файлах
for lang, data in translations.items():
    out_path = os.path.join(OUTPUT_DIR, f"{lang}.ts")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(f"export const translations_{lang} = ")
        f.write("{\n")
        for k, v in data.items():
            f.write(f'  "{k}": "{v}",\n')
        f.write("};\n")
    print(f"✅ Saved: {out_path}")

# Сохраняем пропущенные переводы
for lang, items in missed.items():
    miss_path = os.path.join(OUTPUT_DIR, f"missing_{lang}.csv")
    with open(miss_path, "w", encoding="utf-8", newline='') as f:
        writer = csv.writer(f)
        writer.writerow(["Key", "OriginalPolish"])
        writer.writerows(items)
    print(f"⚠️  Missing for {lang}: {miss_path}")
