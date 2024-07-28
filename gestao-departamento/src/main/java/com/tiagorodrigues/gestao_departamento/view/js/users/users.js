const API_URL = "http://localhost:8080";
//#region API Config
function getUsers() {
  $.ajax({
    type: "GET",
    url: `${API_URL}/users`,
    success: function (data) {
      showUsers(data);
    },
    error: function (xhr, status, error) {
      console.error("HTTP-Error: " + xhr.status, error);
    },
  });
}

function createUser(user) {
  $.ajax({
    type: "POST",
    url: `${API_URL}/users`,
    contentType: "application/json",
    data: JSON.stringify(user),
    success: function () {
      getUsers();
    },
    error: function (xhr, status, error) {
      console.error("HTTP-Error: " + xhr.status, error);
    },
  });
}

function updateUser(department) {
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
function showUsers(users) {
  let table = "";

  users.forEach((user) => {
    table += `<tr>
                <td scope="row">${user.id}</td>
                <td>${user.name}</td>
                <td>${user.user_type}</td>
                <td>
                  <button id="viewUserButton" class="btn btn-secondary btn-sm"
                    data-id="${user.id}">View</button>
                  
                  <button id="editUserButton" class="btn btn-primary btn-sm"
                    data-id="${user.id}">Edit</button>
                  
                    <button id="deleteUserButton" class="btn btn-danger btn-sm"
                    data-id="${user.id}">Delete</button>
                </td>
              </tr>`;
  });

  $("#userTableBody").html(table);
}

function fillModalById(id, modalPrefix) {
  $.ajax({
    type: "GET",
    url: `${API_URL}/users/${id}`,
    success: function (user) {
      $(`#${modalPrefix}Id`).val(user.id);
      $(`#${modalPrefix}Name`).val(user.name);
      $(`#${modalPrefix}Type`).val(user.user_type);

      $(`#${modalPrefix}Modal`).modal("show");
    },
    error: function (xhr, status, error) {
      console.error("HTTP-Error: " + xhr.status, error);
    },
  });
}
//#endregion

$(document).ready(function () {
  getUsers();

  //#region Create Modal Config
  $("#newUserButton").on("click", function () {
    $("#saveUserModal").modal("show");
  });

  $("#userSaveForm").on("submit", function (e) {
    e.preventDefault();

    const user = {
      name: $("#userName").val(),
      password: $("#userPassword").val(),
      user_type: $("#userType").val(),
    };

    createUser(user);
    $("#saveUserModal").find("form")[0].reset();
    $("#saveUserModal").modal("hide");
  });
  //#endregion

  //#region View Modal Config
  $("#departmentTableBody").on("click", "#viewDepartmentButton", function () {
    fillModalById($(this).data("id"), "viewDepartment");
  });
  //#endregion

  //#region Edit Modal Config
  $("#departmentTableBody").on("click", "#editUserButton", function () {
    fillModalById($(this).data("id"), "editUser");
  });

  $("#userEditForm").on("submit", function (e) {
    e.preventDefault();

    const user = {
      id: $("#editUserId").val(),
      name: $("#editUserName").val(),
      user_type: $("#editUserType").val(),
    };

    updateUser(user);
    $("#editUserModal").modal("hide");
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
