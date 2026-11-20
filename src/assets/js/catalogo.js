const catalogModels = {
  clasicos: [
    {
      make: "FERRARI",
      model: "250 GTO",
      year: 1962,
      price: "$40,000,000",
      status: "Usado",
      image: "../assets/images/catalogo/modelosclasicos/ferrari250gto1962.jpg",
    },
    {
      make: "PORSCHE",
      model: "911 Carrera RS",
      year: 1973,
      price: "$1,200,000",
      status: "Usado",
      image: "../assets/images/catalogo/modelosclasicos/porsche911carrera%20rs1973.jpg",
    },
    {
      make: "FERRARI",
      model: "F40",
      year: 1987,
      price: "$3,500,000",
      status: "Usado",
      image: "../assets/images/catalogo/modelosclasicos/ferrarif401987.jpg",
    },
    {
      make: "HONDA",
      model: "NSX",
      year: 1990,
      price: "$120,000",
      status: "Usado",
      image: "../assets/images/catalogo/modelosclasicos/hondansx1990.jpg",
    },
  ],
  contemporaneos: [
    {
      make: "PORSCHE",
      model: "Carrera GT",
      year: 2004,
      price: "$1,500,000",
      status: "Usado",
      image: "../assets/images/catalogo/modeloscontemporaneos/porschecarreragt2004.jpg",
    },
    {
      make: "BUGATTI",
      model: "Veyron",
      year: 2005,
      price: "$1,800,000",
      status: "Usado",
      image: "../assets/images/catalogo/modeloscontemporaneos/bugattiveyron2005.jpg",
    },
    {
      make: "LEXUS",
      model: "LFA",
      year: 2010,
      price: "$900,000",
      status: "Usado",
      image: "../assets/images/catalogo/modeloscontemporaneos/lexuslfa2010.jpg",
    },
    {
      make: "FERRARI",
      model: "LaFerrari",
      year: 2013,
      price: "$3,800,000",
      status: "Usado",
      image: "../assets/images/catalogo/modeloscontemporaneos/ferrarilaferrari2013.jpg",
    },
  ],
  modernos: [
    {
      make: "PORSCHE",
      model: "911 GT3 RS",
      year: 2023,
      price: "$350,000",
      status: "Usado",
      image: "../assets/images/catalogo/modelosmodernos/porsche911gt3rs2023.jpg",
    },
    {
      make: "FERRARI",
      model: "SF90 Stradale",
      year: 2022,
      price: "$600,000",
      status: "Usado",
      image: "../assets/images/catalogo/modelosmodernos/ferrarisf90stradale2022.jpg",
    },
    {
      make: "LAMBORGHINI",
      model: "Revuelto",
      year: 2024,
      price: "$650,000",
      status: "Nuevo",
      image: "../assets/images/catalogo/modelosmodernos/lamborghinirevuelto2024.jpg",
    },
    {
      make: "MCLAREN",
      model: "750S",
      year: 2024,
      price: "$330,000",
      status: "Nuevo",
      image: "../assets/images/catalogo/modelosmodernos/mclaren750s2024.jpg",
    },
  ],
};

const categoryButtons = document.querySelectorAll(".catalog__category");
const modelsContainer = document.querySelector("#catalog-models");
const mobileModelsSelect = document.querySelector("#catalog-mobile-models");
const detailContainer = document.querySelector("#catalog-detail");
const requestForm = document.querySelector("#catalog-request-form");
const requestMake = document.querySelector("#request-make");
const requestModel = document.querySelector("#request-model");
const requestYear = document.querySelector("#request-year");
const requestStatus = document.querySelector("#catalog-request-status");

const allModels = Object.values(catalogModels).flat();
const makes = [...new Set(allModels.map((model) => model.make))].sort();

makes.forEach((make) => {
  requestMake.append(new Option(make, make));
});

requestMake.addEventListener("change", () => {
  const matchingModels = allModels.filter((model) => model.make === requestMake.value);
  requestModel.replaceChildren(new Option("Selecciona un modelo", ""));
  matchingModels.forEach((model) => {
    requestModel.append(new Option(model.model, model.model));
  });
  requestModel.disabled = matchingModels.length === 0;
  requestYear.replaceChildren(new Option("Selecciona primero un modelo", ""));
  requestYear.disabled = true;
});

requestModel.addEventListener("change", () => {
  const matchingModel = allModels.find(
    (model) => model.make === requestMake.value && model.model === requestModel.value,
  );
  requestYear.replaceChildren(new Option("Selecciona un año", ""));
  if (matchingModel) {
    requestYear.append(new Option(String(matchingModel.year), String(matchingModel.year)));
    requestYear.disabled = false;
    return;
  }
  requestYear.disabled = true;
});

requestForm.addEventListener("submit", (event) => {
  event.preventDefault();
  requestStatus.textContent =
    "La solicitud no se envió: el formulario aún no está conectado con un asesor.";
});

function createTextElement(tagName, className, text) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

function showModelDetail(model) {
  const card = document.createElement("article");
  card.className = "catalog__detail-card";

  const imageWrap = document.createElement("div");
  imageWrap.className = "catalog__image-wrap";
  const image = document.createElement("img");
  image.className = "catalog__image";
  image.src = model.image;
  image.alt = `${model.make} ${model.model}, ${model.year}`;
  imageWrap.append(image, createTextElement("span", "catalog__status", model.status));

  const info = document.createElement("div");
  info.className = "catalog__detail-info";
  info.append(
    createTextElement("h3", "catalog__detail-title", `${model.make} ${model.model}`),
    createTextElement("p", "catalog__detail-meta", `${model.year} · ${model.price}`),
  );

  const visitLink = document.createElement("a");
  visitLink.className = "catalog__visit";
  visitLink.href = `mailto:?subject=${encodeURIComponent(`Visita para ${model.make} ${model.model}`)}&body=${encodeURIComponent(`Hola, quisiera coordinar una visita para ver el ${model.make} ${model.model} (${model.year}), publicado a ${model.price}.`)}`;
  visitLink.textContent = "Coordinar una visita";
  info.append(visitLink);
  card.append(imageWrap, info);

  detailContainer.replaceChildren(card);
}

function showCategory(category, button) {
  categoryButtons.forEach((categoryButton) => {
    const isSelected = categoryButton === button;
    categoryButton.setAttribute("aria-pressed", String(isSelected));
  });

  const models = catalogModels[category];
  if (!models) {
    throw new Error(`Categoría de catálogo desconocida: ${category}`);
  }

  modelsContainer.replaceChildren();
  detailContainer.replaceChildren(
    createTextElement("p", "catalog__prompt", "Elige un modelo para descubrir todos sus detalles."),
  );

  if (mobileModelsSelect) {
    mobileModelsSelect.replaceChildren();
    models.forEach((model, index) => {
      mobileModelsSelect.append(new Option(`${model.make} ${model.model}`, String(index)));
    });
    mobileModelsSelect.disabled = false;
  }

  models.forEach((model) => {
    const modelButton = document.createElement("button");
    modelButton.className = "catalog__model";
    modelButton.type = "button";
    modelButton.setAttribute("aria-pressed", "false");
    modelButton.setAttribute("aria-label", `${model.make} ${model.model}, ${model.year}, ${model.price}`);

    const copy = document.createElement("span");
    copy.className = "catalog__model-copy";
    copy.append(
      createTextElement("span", "catalog__model-make", model.make),
      createTextElement("span", "catalog__model-name", model.model),
    );

    const meta = document.createElement("span");
    meta.className = "catalog__model-meta";
    meta.append(
      createTextElement("span", "catalog__model-year", String(model.year)),
      createTextElement("span", "catalog__model-price", model.price),
    );

    modelButton.append(copy, meta);
    modelButton.addEventListener("click", () => {
      modelsContainer.querySelectorAll(".catalog__model").forEach((item) => {
        item.setAttribute("aria-pressed", String(item === modelButton));
      });
      showModelDetail(model);
    });

    modelsContainer.append(modelButton);
  });
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    if (!category) {
      throw new Error("El botón de categoría no tiene una categoría asignada.");
    }
    showCategory(category, button);
  });
});

const defaultCategoryButton = [...categoryButtons].find(
  (button) => button.dataset.category === "clasicos",
);

if (defaultCategoryButton) {
  showCategory("clasicos", defaultCategoryButton);
  const firstModelButton = modelsContainer.querySelector(".catalog__model");
  if (firstModelButton) {
    firstModelButton.setAttribute("aria-pressed", "true");
    showModelDetail(catalogModels.clasicos[0]);
  }
}

if (mobileModelsSelect) {
  mobileModelsSelect.value = "0";
  mobileModelsSelect.addEventListener("change", () => {
    const selectedCategory = [...categoryButtons].find(
      (button) => button.getAttribute("aria-pressed") === "true",
    )?.dataset.category;
    const models = selectedCategory ? catalogModels[selectedCategory] : null;
    const selectedModel = models?.[Number(mobileModelsSelect.value)];

    if (selectedModel) {
      showModelDetail(selectedModel);
      modelsContainer.querySelectorAll(".catalog__model").forEach((button, index) => {
        button.setAttribute("aria-pressed", String(index === Number(mobileModelsSelect.value)));
      });
    }
  });
}
