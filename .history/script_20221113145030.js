const pokeCard = document.getElementById("poke-card");
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");
const pokeDetailsContent = document.querySelector(".poke-details-content");
const closeBtn = document.querySelector(".info-close-btn");

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
  const info = [];
  for (let i = offset; i <= offset + limit; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    promises.push(fetch(url).then((res) => res.json()))
    info.push(fetch(url).then((pokemon) => pokeInfoModal(pokemon)));
  }
  Promise.all(promises).then((results) => {
    const pokemon = results.map((result) => ({
      name: result.name,
      image: result.sprites.other["official-artwork"].front_default,
    }));
    showPokemon(pokemon);
  });
};

const showPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTML = pokemon
    .map(
      (poke) =>
        `<div class="card"> 
        <div class="left-side">
          <img class="poke-img" src="${poke.image}" />
          <h4 class="poke-name">${poke.name}</h4>
        </div>
        <div class="right-side">
        <button class="btn">Info</button>
        </div>
    </div>`
    )
    .join("");

  pokeCard.innerHTML = pokemonHTML;
};

fetchPokemon();
getPokemons(offset, limit);

//////////////////////////////////////////////////////////////////// pokemon details /////////////////////////////////////////////////////////////////

closeBtn.addEventListener("click", () => {
  pokeDetailsContent.parentElement.classList.remove("showInfo");
});

function pokeInfoModal(pokemon) {
  console.log(pokemon);
  poke = data[0];
  let html = `
        <h2 class = "recipe-title">${data.name}</h2>
        <p class = "recipe-category">${data.weight}</p>
    `;
  pokeDetailsContent.innerHTML = html;
  pokeDetailsContent.parentElement.classList.add("showInfo");
}
