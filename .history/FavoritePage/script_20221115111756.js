window.addEventListener("click", function (event) {
  if (event.target.hasAttribute("src")) {
    const card = event.target.closest(".card");

    const productInfo = {
      id: card.dataset.id,
      name: card.name,
      image: card.image,
      weight: card.weight,
      id: card.id,
    };

    console.log(productInfo);
  }
});
