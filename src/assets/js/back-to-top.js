const hero = document.querySelector("#inicio");
const backToTopButton = document.querySelector(".back-to-top");

if (hero && backToTopButton) {
  const updateButtonVisibility = () => {
    const heroBottom = hero.getBoundingClientRect().bottom;
    backToTopButton.classList.toggle("is-visible", heroBottom < 80);
  };

  window.addEventListener("scroll", updateButtonVisibility, { passive: true });
  updateButtonVisibility();
}
