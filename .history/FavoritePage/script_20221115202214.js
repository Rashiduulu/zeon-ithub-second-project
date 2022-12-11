let favCart = document.getElementById("poke-card");
//  localStorage.setItem("data", card);
window.addEventListener("click", function (event) {
  if (event.target.hasAttribute("src")) {
    const card = event.target.closest(".card");
      console.log(card);
     
    const productInfo = {
      id: card.dataset.id,
      image: card.querySelector(".poke-img").getAttribute("src"),
        name: card.querySelector(".poke-name").innerText,
      };
    //    localStorage.setItem("data", JSON.stringify(productInfo));

      favCart.innerHTML = ''
  }
});
