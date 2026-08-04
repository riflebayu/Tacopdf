# Arsip Script Migrasi

Script sekali pakai dari sesi migrasi Next.js → Astro (Antigravity IDE).
Tidak dipakai oleh aplikasi production. Disimpan sebagai referensi.

## Isi

| File | Fungsi |
|------|--------|
| `.fix_exact_how.js` | Patch konten halaman How It Works |
| `.insert_translations.js` | Insert batch terjemahan |
| `.patch_blog.js` / `.patch_blog_desc.js` | Patch metadata blog |
| `.update_desc.js` / `.update_hero.js` | Update teks hero & deskripsi |
| `.update_mobile_tip.js` / `.update_select_hint.js` | Update hint UI mobile |
| `fix-blog.js` / `fix-md.js` | Perbaikan file blog markdown |
| `fix-nocheck.mjs` | Tambah @ts-nocheck ke file |
| `patch.mjs` | Patch umum |
| `test-ai.js` / `test-collection.js` | Test Gemini & Astro content |
| `list-models.ts` | List model Gemini tersedia |
