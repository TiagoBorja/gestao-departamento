$(document).ready(function () {
  // Carrega a navbar
  $("#navbar").load("components/navbar.html", function () {
    // Adiciona eventos de clique nos links da navbar
    $(".nav-link").on("click", function (event) {
      event.preventDefault();
      const page = $(this).data("page");
      loadPage(page);
    });
  });

  // Carrega a página inicial
  loadPage("home");
});

function loadPage(page) {
  let pageUrl;
  switch (page) {
    case "employers":
      pageUrl = "page/employers.html";
      break;
    case "departments":
      pageUrl = "page/departments.html";
      break;
    case "users":
      pageUrl = "page/users.html";
      break;
    case "login":
      pageUrl = "page/login.html";
      break;
    default:
      pageUrl = "page/home.html";
  }

  $("#content").load(pageUrl);
}
