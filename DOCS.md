# Dokumentasi Teknis Sistem Sugesti KRS - Strategi Algoritma

## Update: 5 Juni 2026 - Analisis Kapasitas SKS
Banyak pengguna bertanya mengapa sistem terkadang hanya menyarankan maksimal 12 SKS meskipun batas mahasiswa adalah 24 SKS. Berikut adalah penjelasannya:

1.  **Batasan Waktu Fisik:** Jika semua mata kuliah diletakkan pada hari yang sama (misal Senin), dengan rentang waktu kuliah 07:00 - 17:00 (10 jam), maka secara fisik kita hanya bisa mengambil maksimal 3-5 mata kuliah tanpa bentrok (tergantung durasi 2-3 jam).
2.  **Jarak Ruangan (Lab vs Ruang F):** Aturan jeda minimal 15 menit (0.25 jam) saat berpindah tipe ruangan. Jika jeda antara waktu selesai matkul pertama dan waktu mulai matkul kedua lebih dari 15 menit, maka matkul tersebut boleh diambil meskipun berpindah dari Lab ke Ruang F.
3.  **Solusi Multi-Hari:** Untuk mencapai 24 SKS, sistem telah diperbarui untuk mendukung jadwal 5 hari kerja (Senin-Jumat). Dengan penyebaran hari ini, algoritma Dynamic Programming dapat menemukan kombinasi optimal yang mencapai atau mendekati batas 24 SKS tanpa adanya bentrok jadwal.

---

## 1. Pendahuluan
Sistem ini dirancang untuk mengoptimalkan pemilihan mata kuliah mahasiswa (KRS) dengan batasan SKS dan jadwal yang tidak bentrok. Inti dari sistem ini adalah penggunaan algoritma *Dynamic Programming*.

## 2. Cara Kerja Algoritma (Step-by-Step)

Algoritma yang digunakan adalah gabungan antara **Weighted Interval Scheduling** (untuk menangani jadwal) dan **0/1 Knapsack** (untuk menangani bobot SKS).

### Tahap 1: Persiapan Data
1.  **Pengurutan (Sorting):** Semua mata kuliah diurutkan berdasarkan **Hari** terlebih dahulu, kemudian **Jam Selesai**.
2.  **Pencarian Pendahulu (Predecessor):** 
    *   Mencari mata kuliah sebelumnya yang tidak bentrok. Jika hari berbeda, maka otomatis tidak bentrok. Jika hari sama, dicek jam selesai + jeda ruangan.

### Tahap 2: Pembentukan Tabel DP
Algoritma membuat tabel 2D bernama `tabelDp[jumlah_matkul + 1][batas_sks + 1]`.
*   **Proses Pengisian:** Menggunakan fungsi rekursif yang dimemokan (atau iteratif) untuk memilih: apakah mengambil mata kuliah saat ini (`matkul[i].sks + hasil_terbaik_pendahulu`) atau melewatinya (`hasil_terbaik_sebelumnya`).

### Tahap 3: Penelusuran Balik (Backtracking)
Mengidentifikasi mata kuliah spesifik yang membentuk nilai maksimal dalam tabel dengan membandingkan perubahan nilai antar baris.

## 3. Penjelasan Generator Data
Generator menghasilkan data acak meliputi:
*   **Hari:** Senin sampai Jumat.
*   **Ruangan:** 32 Ruang F dan 3 Lab.
*   **Jam:** 07:00 sampai 17:00.

## 4. Cara Menjalankan Sistem
1.  `npm run install-all`
2.  `npm run dev`
3.  Buka `http://localhost:5500`.

## 5. Alur Pemrosesan Endpoint API
*   **Endpoint `/ambil-matkul` (POST):**
    Menerima input NIM mahasiswa, kemudian menghasilkan daftar mata kuliah yang tersedia (`daftarMatkulTersedia`) secara acak melalui fungsi generator data. Pada tahap ini, batas maksimal SKS (antara 19 hingga 24 SKS) juga dihasilkan secara acak dan disimpan sebagai batas SKS global. Hasil respons berisi data NIM, `maxSks`, dan `availableCourses`.
*   **Endpoint `/suggest` (POST):**
    Menerima input NIM mahasiswa dan hanya bertugas untuk mengeksekusi algoritma Dynamic Programming (`hitungSaranKRS`) dengan parameter daftar mata kuliah tersedia serta batas SKS global yang sudah ditentukan sebelumnya pada tahap `/ambil-matkul`. Endpoint ini tidak menghasilkan data baru atau mengubah batas SKS, melainkan murni memproses dan mengembalikan hasil saran mata kuliah terbaik.
