export interface MataKuliah {
  id: string;
  nama: string;
  sks: number;
  ruangan: string;
  hari: string;
  jamMulai: number;
  jamSelesai: number;
  penuh: number;
}

const DAFTAR_NAMA_MATKUL = [
  "Algoritma dan Struktur Data",
  "Basis Data",
  "Pemrograman Web",
  "Jaringan Komputer",
  "Sistem Operasi",
  "Kecerdasan Buatan",
  "Grafika Komputer",
  "Keamanan Informasi",
  "Interaksi Manusia dan Komputer",
  "Rekayasa Perangkat Lunak",
  "Teori Bahasa dan Automata",
  "Pemrograman Mobile",
  "Analisis Algoritma",
  "Sistem Terdistribusi",
  "Cloud Computing"
];

const HARI = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

const RUANGAN_F: string[] = [];
for (let lantai = 1; lantai <= 4; lantai++) {
  for (let nomorRuang = 1; nomorRuang <= 8; nomorRuang++) {
    RUANGAN_F.push(`F${lantai}0${nomorRuang}`);
  }
}

const RUANGAN_LAB = ["Lab JAI", "Lab PRG", "Lab RDA"];
const SEMUA_RUANGAN = [...RUANGAN_F, ...RUANGAN_LAB];

export const buatDataMataKuliah = (): MataKuliah[] => {
  const daftarMatkul: MataKuliah[] = [];
  let penghitungId = 1;
  let max_penuh = 100;
  DAFTAR_NAMA_MATKUL.forEach((nama) => {
    const jumlahVariasi = Math.floor(Math.random() * 2) + 2;
    const sks = Math.random() > 0.5 ? 3 : 2;

    for (let i = 0; i < jumlahVariasi; i++) {
      const ruangan = SEMUA_RUANGAN[Math.floor(Math.random() * SEMUA_RUANGAN.length)];
      const hari = HARI[Math.floor(Math.random() * HARI.length)];
      const jamMulai = Math.floor(Math.random() * 8) + 7;
      const durasi = sks;
      let penuh = 0;
      if (max_penuh > 0) {
        penuh = Math.floor(Math.random() * 2);
        max_penuh -= 1;
      }
      daftarMatkul.push({
        id: `C${penghitungId++}`,
        nama,
        sks,
        ruangan,
        hari,
        jamMulai: jamMulai,
        jamSelesai: jamMulai + durasi,
        penuh: penuh
      });
    }
  });

  return daftarMatkul;
};

const DAFTAR_NAMA_MAHASISWA = [
  "Ahmad Dahlan",
  "Budi Santoso",
  "Siti Aminah",
  "Rian Hidayat",
  "Dewi Lestari",
  "Eko Prasetyo",
  "Mega Wijaya",
  "Aditya Pratama",
  "Putri Utami",
  "Fajar Nugraha"
];

export const buatNamaMahasiswa = (): string => {
  return DAFTAR_NAMA_MAHASISWA[Math.floor(Math.random() * DAFTAR_NAMA_MAHASISWA.length)];
};
