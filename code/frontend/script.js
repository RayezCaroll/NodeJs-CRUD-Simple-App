
const api = window._env_.API_URL + '/students';

async function loadStudents() {
  const res = await fetch(api);
  const data = await res.json();
  const table = document.getElementById('studentTable');
  table.innerHTML = '';
  data.forEach(row => {
    table.innerHTML += `<tr>
      <td>${row.id}</td>
      <td>${row.name}</td>
      <td>${row.age}</td>
      <td><button onclick="editStudent(${row.id})">EDIT</button></td>
      <td><button onclick="deleteStudent(${row.id})">DELETE</button></td>
    </tr>`;
  });
}

async function addStudent() {
  const name = document.getElementById('name').value.trim();
  const age = document.getElementById('age').value.trim();
  if (!name || !age) return alert("All fields required.");
  await fetch(api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, age })
  });
  document.getElementById('name').value = '';
  document.getElementById('age').value = '';
  loadStudents();
}

async function editStudent(id) {
  const name = prompt("Enter new name:");
  const age = prompt("Enter new age:");
  if (!name || !age) return alert("All fields required.");
  await fetch(api + '/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, age })
  });
  loadStudents();
}

async function deleteStudent(id) {
  await fetch(api + '/' + id, { method: 'DELETE' });
  loadStudents();
}

window.onload = loadStudents;
