const tombolCek = document.getElementById('checkBtn');
const tombolSuggest = document.getElementById('suggestBtn');
const inputNim = document.getElementById('nim');
const divTersedia = document.getElementById('availableSection');
const divHasil = document.getElementById('result');
const spanMaxSks = document.getElementById('maxSks');
const tabelTersediaBody = document.querySelector('#availableTable tbody');
const tabelSaranBody = document.querySelector('#courseTable tbody');
const spanTotalSks = document.getElementById('totalSks');
const endpoint = "http://localhost:3000"
const spanInfoNim = document.getElementById('infoNim');
const spanInfoNama = document.getElementById('infoNama');
const spanInfoMaxSks = document.getElementById('infoMaxSks');
let maxSks = 0;

tombolCek.addEventListener('click', () => {
  const nim = inputNim.value;
  if (!nim) {
    alert('Silakan masukkan NIM terlebih dahulu');
    return;
  }
  ambilMatkulTersedia(nim);
});

tombolSuggest.addEventListener('click', () => {
  const nim = inputNim.value;
  ambilSugesti(nim);
});

async function ambilMatkulTersedia(nim) {
  try {
    const response = await fetch(`${endpoint}/ambil-matkul`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nim })
    });

    if (!response.ok) throw new Error('Gagal mengambil data');

    const data = await response.json();
    maxSks = data.maxSks;
    spanInfoNim.textContent = data.nim;
    spanInfoNama.textContent = data.nama;
    spanInfoMaxSks.textContent = data.maxSks;
    tampilkanTersedia(data.availableCourses);
  } catch (error) {
    console.error(error);
    alert('Terjadi kesalahan saat mengambil daftar matakuliah');
  }
}

function tampilkanTersedia(courses) {
  divTersedia.classList.remove('hidden');
  divHasil.classList.add('hidden');
  tabelTersediaBody.innerHTML = '';

  courses.forEach(course => {
    const row = document.createElement('tr');
    const penuh = (course.penuh) ? "<span style= 'color:red;'>penuh</span>" : "<span style='color:green;'>tersedia</span>"
    row.innerHTML = `
            <td>${course.id}</td>
            <td>${course.nama}</td>
            <td>${course.sks}</td>
            <td>${course.hari}</td>
            <td>${course.ruangan}</td>
            <td>${course.jamMulai}:00 - ${course.jamSelesai}:00</td>
            <td>${penuh}</td>

        `;
    tabelTersediaBody.appendChild(row);
  });
}

async function ambilSugesti(nim) {
  try {
    const response = await fetch(`${endpoint}/suggest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nim })
    });

    if (!response.ok) throw new Error('Gagal mengambil sugesti');

    const data = await response.json();
    tampilkanSaran(data);
  } catch (error) {
    console.error(error);
    alert('Terjadi kesalahan saat mengambil sugesti');
  }
}

function tampilkanSaran(data) {
  divHasil.classList.remove('hidden');
  spanMaxSks.textContent = maxSks;
  tabelSaranBody.innerHTML = '';
  let totalSks = 0;

  data.suggestions.forEach(course => {
    const row = document.createElement('tr');
    row.innerHTML = `
            <td>${course.id}</td>
            <td>${course.nama}</td>
            <td>${course.sks}</td>
            <td>${course.hari}</td>
            <td>${course.ruangan}</td>
            <td>${course.jamMulai}:00 - ${course.jamSelesai}:00</td>
        `;
    tabelSaranBody.appendChild(row);
    totalSks += course.sks;
  });

  spanTotalSks.textContent = totalSks;
  divHasil.scrollIntoView({ behavior: 'smooth' });
}
