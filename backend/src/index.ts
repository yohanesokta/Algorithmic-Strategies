import express from "express";
import cors from "cors";
import { buatDataMataKuliah, MataKuliah, buatNamaMahasiswa } from "./utils/generator";
import { hitungSaranKRS } from "./utils/algorithm";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let daftarMatkulTersedia: MataKuliah[] = [];
let batasSksGlobal = 24;

app.post("/ambil-matkul", (req, res) => {
  const { nim } = req.body;
  if (!nim) {
    return res.status(400).json({ error: "NIM wajib diisi" });
  }

  daftarMatkulTersedia = buatDataMataKuliah();
  batasSksGlobal = Math.floor(Math.random() * (24 - 19 + 1)) + 19;
  const nama = buatNamaMahasiswa();

  res.json({
    nim,
    nama,
    maxSks: batasSksGlobal,
    availableCourses: daftarMatkulTersedia
  });
});

app.post("/suggest", (req, res) => {
  const { nim } = req.body;
  if (!nim) {
    return res.status(400).json({ error: "NIM wajib diisi" });
  }

  const saranMatkul = hitungSaranKRS(daftarMatkulTersedia, batasSksGlobal);

  res.json({
    nim,
    suggestions: saranMatkul
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
