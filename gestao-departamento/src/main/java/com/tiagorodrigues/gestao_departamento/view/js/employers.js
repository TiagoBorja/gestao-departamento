const API_URL = "http://localhost:8080";
let departmentId = 0;

//#region Modals Config

//Modal Config - Create Employer
$("#newEmployerButton").on("click", function () {
  $("#saveEmployerModal").modal("show");

  $("#employerSaveForm").on("submit", function (e) {
    e.preventDefault();

    departmentId = $("#departmentId").val();

    const employer = {
      name: $("#employerName").val(),
      mail: $("#employerMail").val(),
      household: $("#employerHousehold").val(),
      date_of_birth: $("#employerBirth").val(),
      id_department: { id: departmentId },
    };

    createEmployer(employer);
    $("#saveEmployerModal").modal("hide");
  });
});

//#endregion

//#region API Functions

function getEmployers() {
  $.ajax({
    type: "GET",
    url: `${API_URL}/employers`,
    success: function (data) {
      showEmployers(data);
    },
    error: function (xhr, status, error) {
      console.error("HTTP-Error: " + xhr.status, error);
    },
  });
}

function createEmployer(employer) {
  $.ajax({
    type: "POST",
    url: `${API_URL}/employers/department/${departmentId}`,
    contentType: "application/json",
    data: JSON.stringify(employer),
    success: function () {
      getEmployers();
    },
    error: function (xhr, status, error) {
      console.error("HTTP-Error: " + xhr.status, error);
    },
  });
}

//#endregion

//#region DOM Functions

function showEmployers(employers) {
  let table = "";

  employers.forEach((employer) => {
    table += `<tr>
                <td scope="row">${employer.id}</td>
                <td>${employer.name}</td>
                <td>${employer.mail}</td>
                <td>${employer.household}</td>
                <td>${employer.date_of_birth}</td>
                <td>${employer.id_department["name"]}</td>
                <td>
                  <button id="viewEmployerButton" class="viewEmployerButton btn btn-secondary btn-sm" data-id="${employer.id}">
                    View
                  </button>
                  <button id="editEmployerButton" class="editEmployerButton btn btn-primary btn-sm" data-id="${employer.id}">
                    Edit
                  </button>
                  <button id="deleteEmployerButton" class="deleteEmployerButton btn btn-danger btn-sm" data-id="${employer.id}">
                    Delete
                  </button>
                </td>
              </tr>`;
  });

  $("#employerTableBody").html(table);
}

function fillSelectDepartment() {
  $.ajax({
    type: "GET",
    url: `${API_URL}/departments`,
    success: function (departments) {
      var departmentSelect = document.getElementById("departmentId");
      departmentSelect.innerHTML = "";

      departments.forEach((department) => {
        const option = document.createElement("option");
        option.value = department.id;
        option.text = department.name;
        departmentSelect.appendChild(option);
      });
    },
    error: function (xhr, status, error) {
      console.error("HTTP-Error: " + xhr.status, error);
    },
  });
}

//#endregion

//#region Document Ready

$(document).ready(function () {
  getEmployers();
  fillSelectDepartment();
});

//#endregion
