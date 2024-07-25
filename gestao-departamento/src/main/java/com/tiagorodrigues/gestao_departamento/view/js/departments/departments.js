const API_URL = "http://localhost:8080";
//#region API Config
function getDepartments() {
  $.ajax({
    type: "GET",
    url: `${API_URL}/departments`,
    success: function (data) {
      showDepartments(data);
    },
    error: function (xhr, status, error) {
      console.error("HTTP-Error: " + xhr.status, error);
    },
  });
}

function createDepartment(department) {
  $.ajax({
    type: "POST",
    url: `${API_URL}/departments`,
    contentType: "application/json",
    data: JSON.stringify(department),
    success: function () {
      getDepartments();
    },
    error: function (xhr, status, error) {
      console.error("HTTP-Error: " + xhr.status, error);
    },
  });
}

function updateDepartment(department) {
  $.ajax({
    type: "PUT",
    url: `${API_URL}/departments/${department.id}`,
    contentType: "application/json",
    data: JSON.stringify(department),
    success: function () {
      getDepartments();
    },
    error: function (xhr, status, error) {
      console.error("HTTP-Error: " + xhr.status, error);
    },
  });
}

function deleteDepartment(department) {
  $.ajax({
    type: "DELETE",
    url: `${API_URL}/departments/${department.id}`,
    success: function () {
      getDepartments();
    },
    error: function (xhr, status, error) {
      console.error("HTTP-Error: " + xhr.status, error);
    },
  });
}
//#endregion

//#region DOM Functions
function showDepartments(departments) {
  let table = "";

  departments.forEach((department) => {
    table += `<tr>
                <td scope="row">${department.id}</td>
                <td>${department.name}</td>
                <td>
                  <button id="viewDepartmentButton" class="btn btn-secondary btn-sm"
                    data-id="${department.id}">View</button>
                  
                  <button id="editDepartmentButton" class="btn btn-primary btn-sm"
                    data-id="${department.id}">Edit</button>
                  
                    <button id="deleteDepartmentButton" class="btn btn-danger btn-sm"
                    data-id="${department.id}">Delete</button>
                </td>
              </tr>`;
  });

  $("#departmentTableBody").html(table);
}

function fillModalById(id, modalPrefix) {
  $.ajax({
    type: "GET",
    url: `${API_URL}/departments/${id}`,
    success: function (department) {
      $(`#${modalPrefix}Id`).val(department.id);
      $(`#${modalPrefix}Name`).val(department.name);

      $(`#${modalPrefix}Modal`).modal("show");
    },
    error: function (xhr, status, error) {
      console.error("HTTP-Error: " + xhr.status, error);
    },
  });
}
//#endregion

$(document).ready(function () {
  getDepartments();

  //#region Create Modal Config
  $("#newDepartmentButton").on("click", function () {
    $("#saveDepartmentModal").modal("show");
  });

  $("#departmentSaveForm").on("submit", function (e) {
    e.preventDefault();

    const department = {
      name: $("#departmentName").val(),
    };

    createDepartment(department);
    $("#saveDepartmentModal").find("form")[0].reset();
    $("#saveDepartmentModal").modal("hide");
  });
  //#endregion

  //#region View Modal Config
  $("#departmentTableBody").on("click", "#viewDepartmentButton", function () {
    fillModalById($(this).data("id"), "viewDepartment");
  });
  //#endregion

  //#region Edit Modal Config
  $("#departmentTableBody").on("click", "#editDepartmentButton", function () {
    fillModalById($(this).data("id"), "editDepartment");
  });

  $("#departmentEditForm").on("submit", function (e) {
    e.preventDefault();

    const department = {
      id: $("#editDepartmentId").val(),
      name: $("#editDepartmentName").val(),
    };

    updateDepartment(department);
    $("#editDepartmentModal").modal("hide");
  });
  //#endregion

  //#region Delete Modal Config
  $("#departmentTableBody").on("click", "#deleteDepartmentButton", function () {
    fillModalById($(this).data("id"), "deleteDepartment");
  });

  $("#departmentDeleteForm").on("submit", function (e) {
    e.preventDefault();

    const department = {
      id: $("#deleteDepartmentId").val(),
    };

    deleteDepartment(department);
    $("#deleteDepartmentModal").modal("hide");
  });
  //#endregion
});
