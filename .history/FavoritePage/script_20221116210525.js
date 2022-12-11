const favCart = document.querySelector("#favorite-cart");
const card = JSON.parse(localStorage.getItem("favorites"));
console.log(card);


function PokeCart() {
  if (Boolean(card)) {
    const pokeHTML = card
      .map((p) => {
        return `
       <div class="card" data-id = "${p.id}">
         <div class="left-side">
           <img class="poke-img" src="${p.image}" />
           <h2 class="poke-name">${p.name}</h2>
           <h3>Weight: ${p.weight}</h3>
           <h3>Type: ${p.type}</h3>
         </div>
         <div class="right-side">
         <i class="fas fa-circle-xmark" onclick="removeItem()"></i>
         </div>
     </div>
    `;
      })
      .join("");
    favCart.innerHTML = pokeHTML;
  } else {
    const noPoke = `<h1 class="notPoke">No Pokemons ☹️</h1>`;
    favCart.innerHTML = noPoke;
  }
}
PokeCart();


function removeItem() {
  localStorage.removeItem("favorites");
}


