const favCart = document.getElementById("favorite-cart");

favCart.addEventListener("click", function (event) {
  if (event.target.hasAttribute("src")) {
    const card = event.target.closest(".card");

    const productInfo = {
      id: card.dataset.id,
      image: card.querySelector(".poke-img").getAttribute("src"),
      name: card.querySelector(".poke-name").innerText,
    };

    const cartFavHtml = `
   <div class="card" data-id = "2"> 
        <div class="left-side">
          <img class="poke-img" src="${productInfo.image}" />
          <h4 class="poke-name">${productInfo.name}</h4>
        </div>
        <div class="right-side">
         <a href = "#" class = "info-btn">info</a>
         <img class="add-to-fav" src="./imgs/liked.png" /> 
        </div>
    </div>
    `;

    favCart.insertAdjacentHTML("beforeend", cartFavHtml);
  }
});
