const tombolCek = document.getElementById('checkBtn');
const tombolSuggest = document.getElementById('suggestBtn');
const inputNim = document.getElementById('nim');
const divTersedia = document.getElementById('availableSection');
const divHasil = document.getElementById('result');
const spanMaxSks = document.getElementById('maxSks');
const tabelTersediaBody = document.querySelector('#availableTable tbody');
const tabelSaranBody = document.querySelector('#courseTable tbody');
const spanTotalSks = document.getElementById('totalSks');

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
    const response = await fetch('https://algorithmic-strategies.vercel.app/ambil-matkul', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nim })
    });

    if (!response.ok) throw new Error('Gagal mengambil data');

    const data = await response.json();
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
    row.innerHTML = `
            <td>${course.id}</td>
            <td>${course.nama}</td>
            <td>${course.sks}</td>
            <td>${course.hari}</td>
            <td>${course.ruangan}</td>
            <td>${course.jamMulai}:00 - ${course.jamSelesai}:00</td>
        `;
    tabelTersediaBody.appendChild(row);
  });
}

async function ambilSugesti(nim) {
  try {
    const response = await fetch('http://localhost:3000/suggest', {
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
  spanMaxSks.textContent = data.maxSks;
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
