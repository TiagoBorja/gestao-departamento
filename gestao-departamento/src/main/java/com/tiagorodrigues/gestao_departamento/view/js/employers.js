const API_URL = "http://localhost:8080";
let departmentId = 0;
let employerId = 0;
//#region Modals Config

//Modal Config - saveEmployerModal
$("#newEmployerButton").on("click", function () {
  $("#saveEmployerModal").modal("show");
});

$("#employerEditForm").on("submit", function (e) {
  e.preventDefault();

  employerId = $("#editEmployerId").val();
  departmentId = $("#editDepartmentId").val();

  const employer = {
    id: employerId,
    name: $("#editEmployerName").val(),
    mail: $("#editEmployerMail").val(),
    household: $("#editEmployerHousehold").val(),
    date_of_birth: $("#editEmployerBirth").val(),
    id_department: { id: departmentId },
  };

  updateEmployer(employer);
  $("#editEmployerModal").modal("hide"); // Use the correct ID here
});

//Modal Config - viewEmployerModal
$("#employerTableBody").on("click", "#viewEmployerButton", function () {
  fillModalById($(this).data("id"));
});

//Modal Config - editEmployerModal
$("#employerTableBody").on("click", "#editEmployerButton", function () {
  fillEditModalById($(this).data("id"));
});

$("#employerEditForm").on("submit", function (e) {
  e.preventDefault();

  employerId = $("#editEmployerId").val();
  departmentId = $("#editDepartmentId").val();

  const employer = {
    id: employerId,
    name: $("#editEmployerName").val(),
    mail: $("#editEmployerMail").val(),
    household: $("#editEmployerHousehold").val(),
    date_of_birth: $("#editEmployerBirth").val(),
    id_department: { id: departmentId },
  };

  updateEmployer(employer);
  $("#editEmployerModal").modal("hide");
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

function updateEmployer(employer) {
  $.ajax({
    type: "PUT",
    url: `${API_URL}/employers/${employerId}/department/${departmentId}`,
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
      console.log("Departments received:", departments); // Log para verificar os dados recebidos

      const departmentSelects = ["departmentId", "editDepartmentId"];

      departmentSelects.forEach((selectId) => {
        var departmentSelect = document.getElementById(selectId);
        departmentSelect.innerHTML = "";

        departments.forEach((department) => {
          const option = document.createElement("option");
          option.value = department.id;
          option.text = department.name;
          departmentSelect.appendChild(option);
        });
      });
    },
    error: function (xhr, status, error) {
      console.error("HTTP-Error: " + xhr.status, error);
    },
  });
}

function fillModalById(id) {
  $.ajax({
    type: "GET",
    url: `${API_URL}/employers/${id}`,
    success: function (employer) {
      $("#viewEmployerId").val(employer.id);
      $("#viewEmployerName").val(employer.name);
      $("#viewEmployerMail").val(employer.mail);
      $("#viewEmployerHousehold").val(employer.household);
      $("#viewEmployerBirth").val(employer.date_of_birth);
      $("#viewEmployerDepartment").val(employer.id_department["name"]);

      $("#viewEmployermodal").modal("show");
    },
    error: function (xhr, status, error) {
      console.error("HTTP-Error: " + xhr.status, error);
    },
  });
}

function fillEditModalById(id) {
  $.ajax({
    type: "GET",
    url: `${API_URL}/employers/${id}`,
    success: function (employer) {
      $("#editEmployerId").val(employer.id);
      $("#editEmployerName").val(employer.name);
      $("#editEmployerMail").val(employer.mail);
      $("#editEmployerHousehold").val(employer.household);
      $("#editEmployerBirth").val(employer.date_of_birth);
      $("#editEmployerDepartment").val(employer.id_department["name"]);

      $("#editEmployerModal").modal("show");
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
