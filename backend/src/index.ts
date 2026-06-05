import express from "express";
import cors from "cors";
import { buatDataMataKuliah, MataKuliah } from "./utils/generator";
import { hitungSaranKRS } from "./utils/algorithm";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let daftarMatkulTersedia: MataKuliah[] = [];

app.post("/ambil-matkul", (req, res) => {
  const { nim } = req.body;
  if (!nim) {
    return res.status(400).json({ error: "NIM wajib diisi" });
  }

  daftarMatkulTersedia = buatDataMataKuliah();
  res.json({
    nim,
    availableCourses: daftarMatkulTersedia
  });
});

app.post("/suggest", (req, res) => {
  const { nim } = req.body;
  if (!nim) {
    return res.status(400).json({ error: "NIM wajib diisi" });
  }

  if (daftarMatkulTersedia.length === 0) {
    daftarMatkulTersedia = buatDataMataKuliah();
  }

  const batasSks = Math.floor(Math.random() * (24 - 19 + 1)) + 19;
  const saranMatkul = hitungSaranKRS(daftarMatkulTersedia, batasSks);

  res.json({
    nim,
    maxSks: batasSks,
    suggestions: saranMatkul
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
