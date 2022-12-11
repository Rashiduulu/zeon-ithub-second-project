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

    favCart.innerHTML = "";
    
      favCart.innerHTML += `
             <div class="card" data-id = "${item.id}"> 
        <div class="left-side">
          <img class="poke-img" src="${item.image}" />
          <h4 class="poke-name">${item.name}</h4>
        </div>
        <div class="right-side">
         <a href = "#" class = "info-btn">info</a>
         <img class="add-to-fav" src="./imgs/liked.png" /> 
        </div>
    </div>
          `;

  }
});
