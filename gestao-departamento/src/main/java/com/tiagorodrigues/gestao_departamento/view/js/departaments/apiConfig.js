const API_BASE_URL = "http://localhost:8080";

$(document).ready(function () {
  function getDepartaments() {
    $.ajax({
      type: "GET",
      url: `${API_BASE_URL}/departaments`,
      success: function (data) {
        showEmployers(data);
      },
      error: function (xhr, status, error) {
        console.error("HTTP-Error: " + xhr.status, error);
      },
    });
  }
});
