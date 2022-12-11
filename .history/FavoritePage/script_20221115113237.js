window.addEventListener("click", function (event) {
  if (event.target.hasAttribute("src")) {
    const card = event.target.closest(".card");

    const productInfo = {
      id: card.dataset.id,
        image: card.querySelector(".poke-img").getAttribute("src"), 
      name: card.querySelector(".poke-name")
    };

    console.log(productInfo);
  }
});
