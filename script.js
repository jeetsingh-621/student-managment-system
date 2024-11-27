
const searchInput = document.getElementById('search-bar');
const searchButton = document.getElementById('search-btn');
const tableBody = document.querySelector('#student-table tbody');

let students = [];
fetch("https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json")
.then((response)=>response.json())
.then((data)=>{
    students = data;
renderTable(students);
// console.log(students);

});

function renderTable(data) {
    let tablebody = document.querySelector("#student-table tbody");

    tablebody.innerHTML = '';
    data.forEach((student)=>{
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${student.id}</td>
        <td> <img src="${student.
img_src}" alt="${student.
first_name}" width="50">${student.
first_name} ${student.
last_name}</td>
         <td>${student.email}</td>
      <td>${student.marks}</td>
      <td>${student.class}</td>
      <td>${student.gender}</td>
       <td>${student.passing ? 'Passing' : 'Failed'}</td>
        `;
        tablebody.appendChild(row);
    });


}

function filterTable() {
  const query = searchInput.value.toLowerCase();
  const filtered = students.filter(student =>
      student.first_name.toLowerCase().includes(query) ||
      student.last_name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query)
  );
  renderTable(filtered);
}
function sortTable(criteria) {
  let sorted = [...students];
  if (criteria === 'az') {
      sorted.sort((a, b) => a.first_name.localeCompare(b.first_name));
  } else if (criteria === 'za') {
      sorted.sort((a, b) => b.first_name.localeCompare(a.first_name));
  } else if (criteria === 'marks') {
      sorted.sort((a, b) => a.marks - b.marks);
  } else if (criteria === 'class') {
      sorted.sort((a, b) => a.class - b.class);
  } else if (criteria === 'passing') {
      sorted = sorted.filter(student => student.passing);
  } else if (criteria === 'gender') {
      const males = sorted.filter(student => student.gender === 'Male');
      const females = sorted.filter(student => student.gender === 'Female');
      renderTable(females);
      renderTable(males);
      return;
  }
  renderTable(sorted);
}

searchButton.addEventListener('click', filterTable);
searchInput.addEventListener('input', filterTable);


document.getElementById('sort-az').addEventListener('click', () => sortTable('az'));
document.getElementById('sort-za').addEventListener('click', () => sortTable('za'));
document.getElementById('sort-marks').addEventListener('click', () => sortTable('marks'));
document.getElementById('sort-class').addEventListener('click', () => sortTable('class'));
document.getElementById('sort-passing').addEventListener('click', () => sortTable('passing'));
document.getElementById('sort-gender').addEventListener('click', () => sortTable('gender'));
