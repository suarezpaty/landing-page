const subscriptionForm = document.querySelector("#subscription-form");
const subscriptionStatus = document.querySelector("#subscription-status");

subscriptionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  subscriptionStatus.textContent =
    "No se completó la suscripción: este sitio aún no está conectado a un servicio de correo.";
});
