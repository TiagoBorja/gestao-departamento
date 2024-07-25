function getNavbarPath() {
  const currentPath = window.location.pathname;

  if (currentPath.includes("/page/")) {
    return "../assets/navbar.html";
  }

  return "./assets/navbar.html";
}

// Função para carregar o conteúdo do arquivo navbar.html
function loadNavbar() {
  fetch(getNavbarPath())
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao carregar a navbar");
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;
      updateNavbarLinks();
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
}

function updateNavbarLinks() {
  const currentPath = window.location.pathname;
  const links = document.querySelectorAll("#navbar a.nav-link");
  links.forEach((link) => {
    if (currentPath.includes("/page/")) {
      link.href = "../" + link.getAttribute("href");
    }
  });
}

loadNavbar();
