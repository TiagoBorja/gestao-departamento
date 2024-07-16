const API_BASE_URL = "http://localhost:8080";

function getEmployers() {
  $.ajax({
    type: "GET",
    url: `${API_BASE_URL}/employers`,
    success: function (data) {
      showEmployers(data);
    },
    error: function (xhr, status, error) {
      console.error("HTTP-Error: " + xhr.status, error);
    },
  });
}

//#region DOM Functions
function fillDepartamentSelect() {
  $.ajax({
    type: "GET",
    url: `${API_BASE_URL}/departaments`,
    success: function (departaments) {
      const departamentSelect = document.getElementById("departamentId");

      // Limpa o select antes de adicionar as novas opções
      departamentSelect.innerHTML = "";

      departaments.forEach((departament) => {
        const option = document.createElement("option");
        option.value = departament.id;
        option.textContent = departament.name;
        departamentSelect.appendChild(option);
      });
    },
    error: function (xhr, status, error) {
      console.error("HTTP-Error: " + xhr.status, error);
    },
  });
}

function showEmployers(employers) {
  let table = "";

  employers.forEach((employer) => {
    table += `<tr>
                    <td scope="row">${employer.id}</td>
                    <td>${employer.name}</td>
                    <td>${employer.mail}</td>
                    <td>${employer.household}</td>
                    <td>${employer.date_of_birth}</td>
                    <td>${employer.id_departament["name"]}</td>
                    <td>
                      <button id="viewEmployerButton" class="viewEmployerButton btn btn-secondary btn-sm"
                      data-id="${employer.id}">
                        View
                      </button>
                      <button id="editEmployerButton" class="editEmployerButton btn btn-primary btn-sm" 
                      data-id="${employer.id}">
                        Edit
                      </button>
                      <button id="deleteEmployerButton" class="deleteEmployerButton btn btn-danger btn-sm" 
                      data-id="${employer.id}">
                        Delete
                      </button>
                    </td>
                  </tr>`;
  });
  $("#employersTableBody").html(table);
}
$(document).ready(function () {
  getEmployers();
  fillDepartamentSelect();
});
//#endregion
