const API_BASE_URL = "http://localhost:8080";

$(document).ready(function () {
  // Defina showEmployers antes de getEmployers, ou chame diretamente
  getEmployers();

  $("#newEmployerButton").on("click", function () {
    $("#saveEmployerModal").modal("show");
  });

  function getEmployers() {
    $.ajax({
      type: "GET",
      url: `${API_BASE_URL}/employers`,
      success: function (data) {
        // Aqui você pode chamar diretamente a função showEmployers
        let table = "";

        data.forEach((employer) => {
          table += `<tr>
                    <td scope="row">${employer.id}</td>
                    <td>${employer.name}</td>
                    <td>${employer.mail}</td>
                    <td>${employer.household}</td>
                    <td>${employer.date_of_birth}</td>
                    <td>${employer.id_departament}</td>
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
      },
      error: function (xhr, status, error) {
        console.error("HTTP-Error: " + xhr.status, error);
      },
    });
  }
});
