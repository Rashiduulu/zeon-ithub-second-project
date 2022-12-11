window.addEventListener("click", function (event) {
  if (event.target.hasAttribute("src")) {
    const card = event.target.closest(".card");

    const productInfo = {
      id: card.dataset.id,
      name: card.name,
      image: card.sprites.other["official-artwork"].front_default,
      weight: card.weight,
      id: card.id,
    };

    console.log(productInfo);
  }
});
