export interface MataKuliah {
  id: string;
  nama: string;
  sks: number;
  ruangan: string;
  jamMulai: number;
  jamSelesai: number;
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

  DAFTAR_NAMA_MATKUL.forEach((nama) => {
    const jumlahVariasi = Math.floor(Math.random() * 2) + 2;
    const sks = Math.random() > 0.5 ? 3 : 2;

    for (let i = 0; i < jumlahVariasi; i++) {
      const ruangan = SEMUA_RUANGAN[Math.floor(Math.random() * SEMUA_RUANGAN.length)];
      const jamMulai = Math.floor(Math.random() * 10) + 7;
      const durasi = sks;
      
      daftarMatkul.push({
        id: `C${penghitungId++}`,
        nama,
        sks,
        ruangan,
        jamMulai: jamMulai,
        jamSelesai: jamMulai + durasi
      });
    }
  });

  return daftarMatkul;
};
