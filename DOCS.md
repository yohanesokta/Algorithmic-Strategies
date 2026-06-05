# Dokumentasi Teknis Sistem Sugesti KRS - Strategi Algoritma

## 1. Pendahuluan
Sistem ini dirancang untuk mengoptimalkan pemilihan mata kuliah mahasiswa (KRS) dengan batasan SKS dan jadwal yang tidak bentrok. Inti dari sistem ini adalah penggunaan algoritma *Dynamic Programming*.

## 2. Cara Kerja Algoritma (Step-by-Step)

Algoritma yang digunakan adalah gabungan antara **Weighted Interval Scheduling** (untuk menangani jadwal) dan **0/1 Knapsack** (untuk menangani bobot SKS).

### Tahap 1: Persiapan Data
1.  **Pengurutan (Sorting):** Semua mata kuliah yang tersedia diurutkan berdasarkan **Jam Selesai** terkecil ke terbesar. Ini penting untuk memastikan kita memproses jadwal secara kronologis.
2.  **Pencarian Pendahulu (Predecessor):** 
    *   Untuk setiap mata kuliah `i`, kita mencari mata kuliah `j` (di mana `j < i`) yang selesai paling akhir namun tidak bentrok dengan jam mulai mata kuliah `i`.
    *   **Aturan Khusus Ruangan:** Jika berpindah dari Lab ke Ruang F (atau sebaliknya), algoritma menambahkan jeda 1 jam sebagai waktu perjalanan. Jika tetap di tipe ruangan yang sama, jeda adalah 0 jam.

### Tahap 2: Pembentukan Tabel DP
Algoritma membuat tabel 2D bernama `tabelDp[jumlah_matkul + 1][batas_sks + 1]`.
*   **Baris (i):** Mewakili mata kuliah ke-i setelah diurutkan.
*   **Kolom (s):** Mewakili kapasitas SKS yang tersedia (dari 0 sampai batas maksimal).

**Proses Pengisian Tabel:**
Untuk setiap sel `tabelDp[i][s]`:
1.  Jika SKS mata kuliah ke-i (`matkul[i].sks`) lebih kecil atau sama dengan kapasitas SKS saat ini (`s`):
    *   **Opsi Ambil:** `matkul[i].sks + tabelDp[indeks_pendahulu][s - matkul[i].sks]`
    *   **Opsi Lewati:** `tabelDp[i - 1][s]`
    *   Nilai sel adalah nilai maksimal dari kedua opsi tersebut.
2.  Jika tidak bisa diambil, nilai sel mengikuti baris sebelumnya: `tabelDp[i - 1][s]`.

Tabel ini disimpan dalam `tmp.json` untuk keperluan audit dan verifikasi hasil.

### Tahap 3: Penelusuran Balik (Backtracking)
Setelah tabel penuh, nilai terbaik ada di sel pojok kanan bawah. Untuk mengetahui mata kuliah mana saja yang terpilih:
1.  Bandingkan nilai di `tabelDp[baris][kolom]` dengan `tabelDp[baris-1][kolom]`.
2.  Jika nilainya berbeda, berarti mata kuliah pada `baris` tersebut diambil.
3.  Kurangi kapasitas SKS (`kolom`) dengan SKS mata kuliah terpilih, dan pindah ke baris milik mata kuliah **pendahulu**-nya.
4.  Ulangi hingga baris atau kolom mencapai 0.

## 3. Penjelasan Generator Data
Generator menghasilkan data secara acak setiap kali tombol ditekan:
*   **Ruangan:** Terdiri dari 32 ruangan F (F101-F408) dan 3 Lab khusus.
*   **Mata Kuliah:** Diambil dari daftar tetap, namun jam dan ruangannya divariasikan secara acak.
*   **SKS Mahasiswa:** Ditentukan otomatis antara 19-24 SKS per mahasiswa.

## 4. Cara Menjalankan Sistem
1.  Buka terminal di folder `backend`, jalankan `npm install` lalu `npm run build`.
2.  Mulai server dengan `npm start`.
3.  Buka `frontend/index.html` di browser.
4.  Masukkan NIM dan klik "Sugestikan Pilihan".
