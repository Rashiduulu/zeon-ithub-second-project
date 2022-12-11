const favCart = document.querySelector("#favorite-cart");
//  localStorage.setItem("data", card);
const card = JSON.parse(localStorage.getItem("favorites"));
console.log(card);
// favCart.textContent = JSON.stringify(card);

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

const removeItem = id => {
  const card = JSON.parse(localStorage.getItem("favorites"));

  const index = card.findIndex
}

// window.addEventListener("click", function (event) {
//   if (event.target.hasAttribute("src")) {
//     // const card = event.target.closest(".card");
//     //   console.log(card);
//       const card = JSON.parse(localStorage.getItem("favorites"));
//       console.log(card);

//     const productInfo = {
//       id: card.dataset.id,
//       image: card.querySelector(".poke-img").getAttribute("src"),
//       name: card.querySelector(".poke-name").innerText,
//     };
//     //    localStorage.setItem("data", JSON.stringify(productInfo));

//     let cartFavHtml = `
//         <div class="card" data-id = "${productInfo.id}">
//         <div class="left-side">
//           <img class="poke-img" src="${productInfo.image}" />
//           <h4 class="poke-name">${productInfo.name}</h4>
//         </div>
//         <div class="right-side">
//          <a href = "#" class = "info-btn">info</a>
//          <img class="add-to-fav" src="./imgs/liked.png" />
//         </div>
//     </div>
//     `;
//     const localPokes = localStorage.getItem("data");
//     //   log
//     //   if (localPokes) {
//     //     localStorage.setItem("data", JSON.stringify([...localPokes, productInfo])
//     //     );
//     //   } else {
//     //       localStorage.setItem("data", JSON.stringify([productInfo]))
//     //   }

//     //   const getItem = this.localStorage.getItem(productInfo);
//     //   console.log(productInfo, favCart);
//     //   console.log("html element", favCart);
//     favCart.textContent = card;
//   }
// });
