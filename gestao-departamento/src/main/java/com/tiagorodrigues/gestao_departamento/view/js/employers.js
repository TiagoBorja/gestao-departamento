const API_URL = "http://localhost:8080";
let departmentId = 0;
let employerId = 0;

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

function deleteEmployer(employer) {
  $.ajax({
    type: "DELETE",
    url: `${API_URL}/employers/${employerId}`,
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

function fillModalById(id, modalPrefix) {
  $.ajax({
    type: "GET",
    url: `${API_URL}/employers/${id}`,
    success: function (employer) {
      // Preencher os campos do modal com base no prefixo
      $(`#${modalPrefix}Id`).val(employer.id);
      $(`#${modalPrefix}Name`).val(employer.name);
      $(`#${modalPrefix}Mail`).val(employer.mail);
      $(`#${modalPrefix}Household`).val(employer.household);
      $(`#${modalPrefix}Birth`).val(employer.date_of_birth);
      $(`#${modalPrefix}Department`).val(employer.id_department["name"]);

      // Exibir o modal
      $(`#${modalPrefix}Modal`).modal("show");
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

  //#region Modals Config

  //Modal Config - saveEmployerModal
  $("#newEmployerButton").on("click", function () {
    $("#saveEmployerModal").modal("show");
  });

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
    $("#saveEmployerModal").find("form")[0].reset();
    $("#saveEmployerModal").modal("hide");
  });

  //Modal Config - viewEmployerModal
  $("#employerTableBody").on("click", "#viewEmployerButton", function () {
    fillModalById($(this).data("id"), "viewEmployer");
  });

  //Modal Config - editEmployerModal
  $("#employerTableBody").on("click", "#editEmployerButton", function () {
    fillModalById($(this).data("id"), "editEmployer");
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

  //Modal Config - deleteEmployerModal
  $("#employerTableBody").on("click", "#deleteEmployerButton", function () {
    fillModalById($(this).data("id"), "deleteEmployer");
  });

  $("#employerDeleteForm").on("submit", function (e) {
    e.preventDefault();

    employerId = $("#deleteEmployerId").val();

    const employer = {
      id: employerId,
    };

    deleteEmployer(employer);
    $("#deleteEmployerModal").modal("hide");
  });
  //#endregion
});

//#endregion
