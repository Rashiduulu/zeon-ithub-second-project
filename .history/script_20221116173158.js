const pokeCard = document.getElementById("poke-card");
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");
const pokeDetailsContent = document.querySelector(".poke-details-content");
const closeBtn = document.querySelector(".info-close-btn");
const favoriteBtn = document.querySelector(".add-favorite-btn");
const inputPage = document.querySelector(".input-page");

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
});

next.addEventListener("click", () => {
  offset += 9;
  removeChild(pokeCard);
  getPokemons(offset, limit);
});

inputPage.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    offset += 9;
    removeChild(pokeCard);
    getPokemons(offset, limit);
  }
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
      type: result.types[0].type.name,
    }));
    showPokemon(pokemon);
  });
};

// PokeTypeF = (pokemon) => {
  
// };



const addToFavorite = (btn) => {
  const localPokes = JSON.parse(localStorage.getItem("favorites"));

  // console.log(
  //   btn.dataset.pokemonId,
  //   btn.dataset.image,
  //   btn.dataset.name,
  //   btn.dataset.weight,
  //   btn.dataset.type
  // );
  const productInfo = {
    id: btn.dataset.pokemonId,
    image: btn.dataset.image,
    name: btn.dataset.name,
    weight: btn.dataset.weight,
    type: btn.dataset.type,
  };

  console.log(localPokes);
  if (localPokes) {
    localStorage.setItem(
      "favorites",
      JSON.stringify([...localPokes, productInfo])
    );
  } else {
    localStorage.setItem("favorites", JSON.stringify([productInfo]));
  }
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
         <div onclick="addToFavorite(this)" data-pokemon-id="${poke.id}" data-image="${poke.image}" data-name="${poke.name}" data-weight="${poke.weight}" data-type="${poke.type}" >
          <img class="add-to-fav" src="./imgs/liked.png" /> 
         </div>
        </div>
    </div>`
    )
    .join("");
  pokeCard.innerHTML = pokemonHTML;
};

getPokemons(offset, limit);

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
