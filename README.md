# KRS Suggestion System - Algorithmic Strategies

Sistem pemilihan matakuliah otomatis (KRS) menggunakan algoritma **Dynamic Programming** untuk membantu mahasiswa mendapatkan pilihan matakuliah terbaik berdasarkan batasan SKS dan jadwal.

## Persyaratan Sistem
- Node.js (v14 atau lebih baru)
- npm (v6 atau lebih baru)

## Cara Instalasi & Menjalankan
Proyek ini mendukung manajemen satu pintu dari root directory:

1. **Instalasi Semua Dependensi:**
   ```bash
   npm run install-all
   ```

2. **Menjalankan dalam Mode Pengembangan (Dev):**
   ```bash
   npm run dev
   ```
   - Backend akan berjalan di: `http://localhost:3000`
   - Frontend akan berjalan di: `http://localhost:5500`

3. **Menjalankan dalam Mode Produksi/Normal:**
   ```bash
   npm start
   ```

## Struktur Folder
- `backend/`: Logika server, generator data, dan algoritma DP.
- `frontend/`: Antarmuka pengguna (HTML/CSS/JS).
- `docs/`: Penyimpanan dokumen tambahan.
- `DOCS.md`: Penjelasan teknis algoritma Dynamic Programming.
- `tmp.json`: File hasil tabel DP (dihasilkan setelah menjalankan sugesti).


