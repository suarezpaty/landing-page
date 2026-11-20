const navToggle = document.querySelector(".nav-toggle");
const mainNavigation = document.querySelector(".main-nav");

if (navToggle && mainNavigation) {
  const closeNavigation = () => {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú");
    mainNavigation.classList.remove("is-open");
  };

  navToggle.addEventListener("click", () => {
    const willOpen = navToggle.getAttribute("aria-expanded") !== "true";
    navToggle.setAttribute("aria-expanded", String(willOpen));
    navToggle.setAttribute("aria-label", willOpen ? "Cerrar menú" : "Abrir menú");
    mainNavigation.classList.toggle("is-open", willOpen);
  });

  mainNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeNavigation();
    }
  });
}
