const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const dashboardUrl = new URL(
    "../../../maquetado/src/views/dashboard.html",
    window.location.href
  );
  window.location.assign(dashboardUrl.href);
});
