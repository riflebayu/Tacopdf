import re

with open('src/data/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

en_additions = """
    "tool.organize_pdf.beta_warning": "Not stable for production",
    "tool.organize_pdf.instruction.1": "Upload a PDF file to see its pages.",
    "tool.organize_pdf.instruction.2": "Drag and drop any page to reorder them.",
    "tool.organize_pdf.instruction.3": "Click and drag the background to scroll horizontally.",
    "tool.organize_pdf.instruction.4": "Click the trash icon to remove a page completely.",
    "tool.organize_pdf.btn_save": "Save Changes",
    "tool.organize_pdf.btn_processing": "Processing...",

    "tool.compress_pdf.beta_warning": "Not stable for production",
    "tool.compress_pdf.level": "Compression Level",
    "tool.compress_pdf.max": "Maximum Compression",
    "tool.compress_pdf.max_desc": "Smallest file size, lower visual quality.",
    "tool.compress_pdf.balanced": "Balanced (Recommended)",
    "tool.compress_pdf.balanced_desc": "Good compression and good quality.",
    "tool.compress_pdf.low": "Low Compression",
    "tool.compress_pdf.low_desc": "Preserves high quality, larger file size.",
    "tool.compress_pdf.warning": "This tool flattens the PDF into images. Text will no longer be selectable.",
    "tool.compress_pdf.btn_compress": "Compress PDF",
    "tool.compress_pdf.btn_processing": "Compressing...",

    "tool.ocr.beta_warning": "Not stable for production",
    "tool.ocr.lang_label": "Document Language(s)",
    "tool.ocr.search_ph": "Search for languages...",
    "tool.ocr.warning": "For best results, ensure your document has a clear background and high contrast.",
    "tool.ocr.force": "Force Image OCR",
    "tool.ocr.force_desc": "Check this to scan images inside Digital PDFs (like charts or scanned photos). This will be slower.",
    "tool.ocr.btn_extract": "Extract Text",
    "tool.ocr.btn_processing": "Extracting..."
"""

id_additions = """
    "tool.organize_pdf.beta_warning": "Belum stabil untuk produksi",
    "tool.organize_pdf.instruction.1": "Unggah file PDF untuk melihat halaman-halamannya.",
    "tool.organize_pdf.instruction.2": "Tarik dan lepas halaman mana saja untuk mengatur ulang urutannya.",
    "tool.organize_pdf.instruction.3": "Klik dan tarik latar belakang untuk menggulir secara horizontal.",
    "tool.organize_pdf.instruction.4": "Klik ikon tempat sampah untuk menghapus halaman sepenuhnya.",
    "tool.organize_pdf.btn_save": "Simpan Perubahan",
    "tool.organize_pdf.btn_processing": "Memproses...",

    "tool.compress_pdf.beta_warning": "Belum stabil untuk produksi",
    "tool.compress_pdf.level": "Tingkat Kompresi",
    "tool.compress_pdf.max": "Kompresi Maksimal",
    "tool.compress_pdf.max_desc": "Ukuran file terkecil, kualitas visual lebih rendah.",
    "tool.compress_pdf.balanced": "Seimbang (Disarankan)",
    "tool.compress_pdf.balanced_desc": "Kompresi bagus dan kualitas bagus.",
    "tool.compress_pdf.low": "Kompresi Rendah",
    "tool.compress_pdf.low_desc": "Mempertahankan kualitas tinggi, ukuran file lebih besar.",
    "tool.compress_pdf.warning": "Alat ini meratakan PDF menjadi gambar. Teks tidak akan bisa dipilih lagi.",
    "tool.compress_pdf.btn_compress": "Kompres PDF",
    "tool.compress_pdf.btn_processing": "Mengkompresi...",

    "tool.ocr.beta_warning": "Belum stabil untuk produksi",
    "tool.ocr.lang_label": "Bahasa Dokumen",
    "tool.ocr.search_ph": "Cari bahasa...",
    "tool.ocr.warning": "Untuk hasil terbaik, pastikan dokumen Anda memiliki latar belakang yang bersih dan kontras tinggi.",
    "tool.ocr.force": "Paksa OCR Gambar",
    "tool.ocr.force_desc": "Centang ini untuk memindai gambar di dalam PDF Digital (seperti bagan atau foto pindaian). Ini akan lebih lambat.",
    "tool.ocr.btn_extract": "Ekstrak Teks",
    "tool.ocr.btn_processing": "Mengekstrak..."
"""

# Find where "id": { starts
id_match = re.search(r',\s*"id":\s*\{', content)
if id_match:
    en_end_index = id_match.start()
    # Insert before en_end_index
    content = content[:en_end_index] + ",\n" + en_additions + content[en_end_index:]

# Find where "es": { starts, we inserted so need to search again
es_match = re.search(r',\s*"es":\s*\{', content)
if es_match:
    id_end_index = es_match.start()
    content = content[:id_end_index] + ",\n" + id_additions + content[id_end_index:]

with open('src/data/translations.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Modified translations successfully.")
