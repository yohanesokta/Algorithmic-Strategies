import fs from "fs";
import path from "path";
import { MataKuliah } from "./generator";

export const hitungSaranKRS = (daftarMatkul: MataKuliah[], batasSks: number): MataKuliah[] => {
  const hariKeIndeks: { [key: string]: number } = {
    "Senin": 0, "Selasa": 1, "Rabu": 2, "Kamis": 3, "Jumat": 4
  };

  const matkulUrut = [...daftarMatkul].sort((a, b) => {
    if (a.hari !== b.hari) return hariKeIndeks[a.hari] - hariKeIndeks[b.hari];
    return a.jamSelesai - b.jamSelesai;
  });

  const jumlahMatkul = matkulUrut.length;
  const cekApakahLab = (namaRuang: string) => namaRuang.startsWith("Lab");

  const pendahulu = new Array(jumlahMatkul).fill(-1);
  for (let i = 0; i < jumlahMatkul; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (matkulUrut[j].hari !== matkulUrut[i].hari) {
        pendahulu[i] = j;
        break;
      }

      const jedaWaktu = (cekApakahLab(matkulUrut[j].ruangan) !== cekApakahLab(matkulUrut[i].ruangan)) ? 0.25 : 0;
      if (matkulUrut[j].jamSelesai + jedaWaktu <= matkulUrut[i].jamMulai) {
        pendahulu[i] = j;
        break;
      }
    }
  }


  console.log(pendahulu);

  const tabelDp: number[][] = Array.from({ length: jumlahMatkul + 1 }, () => new Array(batasSks + 1).fill(0));
  for (let i = 1; i <= jumlahMatkul; i++) {
    const matkul = matkulUrut[i - 1];
    const indeksPendahulu = pendahulu[i - 1] + 1;

    for (let s = 1; s <= batasSks; s++) {
      if (matkul.sks <= s) {
        const opsiAmbil = matkul.sks + tabelDp[indeksPendahulu][s - matkul.sks];
        const opsiLewati = tabelDp[i - 1][s];
        tabelDp[i][s] = Math.max(opsiAmbil, opsiLewati);
      } else {
        tabelDp[i][s] = tabelDp[i - 1][s];
      }
    }
  }



  const pathTmp = path.join(__dirname, "../../tmp.json");
  fs.writeFileSync(pathTmp, JSON.stringify(tabelDp, null, 2));

  const hasilSaran: MataKuliah[] = [];
  let baris = jumlahMatkul;
  let kolom = batasSks;

  while (baris > 0 && kolom > 0) {
    const matkul = matkulUrut[baris - 1];
    const indeksPendahulu = pendahulu[baris - 1] + 1;

    if (matkul.sks <= kolom && (matkul.sks + tabelDp[indeksPendahulu][kolom - matkul.sks] > tabelDp[baris - 1][kolom])) {
      hasilSaran.push(matkul);
      kolom -= matkul.sks;
      baris = indeksPendahulu;
    } else {
      baris--;
    }
  }

  return hasilSaran;
};
