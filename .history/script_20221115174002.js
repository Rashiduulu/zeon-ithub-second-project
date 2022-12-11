const pokeCard = document.getElementById("poke-card");
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");
const pokeDetailsContent = document.querySelector(".poke-details-content");
const closeBtn = document.querySelector(".info-close-btn");

pokeCard.addEventListener("click", getPokeInfo);
closeBtn.addEventListener("click", () => {
  pokeDetailsContent.parentElement.classList.remove("showInfo");
});
/////////////////////////////////////////////////////////////////////// pagination //////////////////////////////////////////////////////////////////

previous.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 9;
    removeChild(pokeCard);
    getPokemons(offset, limit);
  }
  console.log(previous);
});

next.addEventListener("click", () => {
  offset += 9;
  removeChild(pokeCard);
  getPokemons(offset, limit);

  console.log(next);
});

let offset = 1;
let limit = 8;

function getPokemons(offset, limit) {
  fetchPokemon(offset, limit);
}

function removeChild(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//////////////////////////////////////////////////////////////////////// fetch /////////////////////////////////////////////////////////////////////

const fetchPokemon = (offset, limit) => {
  const promises = [];

  // promises.sort((name, weight) => {
  //   if (name < weight) {
  //     return -1;
  //   } else if (name > weight) {
  //     return 1;
  //   }
  //   return 0;
  // });
  // console.log(promises)

  for (let i = offset; i <= offset + limit; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    promises.push(fetch(url).then((res) => res.json()));
  }
  Promise.all(promises).then((results) => {
    const pokemon = results.map((result) => ({
      name: result.name,
      image: result.sprites.other["official-artwork"].front_default,
      weight: result.weight,
      id: result.id,
    }));
    showPokemon(pokemon);
    // infoPokemon(pokemon);
  });
};

const showPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTML = pokemon
    .map(
      (poke) =>
        `<div class="card" data-id = "${poke.id}"> 
        <div class="left-side">
          <img class="poke-img" src="${poke.image}" />
          <h4 class="poke-name">${poke.name}</h4>
        </div>
        <div class="right-side">
         <a href = "#" class = "info-btn">info</a>
         <img class="add-to-fav" src="./imgs/liked.png" /> 
        </div>
    </div>`
    )
    .join("");
  pokeCard.innerHTML = pokemonHTML;
};

getPokemons(offset, limit);

// function getPokemonInfo(e) {
//   e.preventDefault();
//   if (e.target.classList.contains("recipe-btn")) {
//     let pokeItem = e.target.parentElement.parentElement;
//     fetch(`https://pokeapi.co/api/v2/pokemon/`)
//       .then((response) => response.json())
//       .then((pokemon) => infoPokemon(pokemon));
//   }
// }

// const infoPokemon = (pokemon) => {
//   console.log(pokemon);
//   let html = "";
//   pokemon = pokemon[0]
//   html += `<div class="card">
//         <div class="left-side">
//           <h4 class="poke-name">${pokemon.name}</h4>
//         </div>
//     </div>`;

//   pokeDetailsContent.innerHTML = html;
// };

//////////////////////////////////////////////////////////////////// pokemon details /////////////////////////////////////////////////////////////////

function getPokeInfo(e) {
  e.preventDefault();
  if (e.target.classList.contains("info-btn")) {
    let pokeItem = e.target.parentElement.parentElement;
    console.log(pokeItem);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeItem.dataset.id}`)
      .then((respose) => respose.json())
      .then((data) => pokeInfoModal(data));
  }
}

function pokeInfoModal(data) {
  console.log(data);
  poke = data[0];
  let html = `
    <div class="info-card">
          <img src="${data.sprites.other["official-artwork"].front_default}"
          class="pokeImg" alt="pokemonImg">
           <h2 class="poke-name">${data.name}</h2>
           <p>Type: ${data.types[0].type.name}</p>
           <p>Weight: ${data.weight}</p>
    </div>
 `;
  pokeDetailsContent.innerHTML = html;
  pokeDetailsContent.parentElement.classList.add("showInfo");
}





const favCart = document.getElementById("-cart");

window.addEventListener("click", function (event) {
  if (event.target.hasAttribute("src")) {
    const card = event.target.closest(".card");
    console.log(card);

    const productInfo = {
      id: card.dataset.id,
      image: card.querySelector(".poke-img").getAttribute("src"),
      name: card.querySelector(".poke-name").innerText,
    };

    const cartFavHtml = `
        <div class="card" data-id = "${productInfo.id}"> 
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
    console.log(cartFavHtml);

    favCart.insertAdjacentHTML("beforeend", cartFavHtml);
  }
});

////////////////////////////////////////////////////////////////////////////////////
