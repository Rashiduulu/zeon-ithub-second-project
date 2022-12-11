const pokeCard = document.getElementById("poke-card");
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");
const pokeDetailsContent = document.querySelector(".poke-details-content");
const closeBtn = document.querySelector(".info-close-btn");
pokeCard.addEventListener("click", getPokeInfo);

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
  for (let i = offset; i <= offset + limit; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    promises.push(fetch(url).then((res) => res.json()));
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
        <button class="info-btn">Info</button>
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

function getPokeInfo(e) {
  e.preventDefault();
  const info = [];
  if (e.target.classList.contains("info-btn")) {
    let pokeItem = e.target.parentElement.parentElement;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeItem.id}`)
    promises.push(fetch(url).then((res) => res.json()))
    
 Promise.all(promises).then((results) => {
    const pokemon = results.map((result) => ({
      name: result.name,
      image: result.sprites.other["official-artwork"].front_default,
    }));
   pokeInfoModal(pokemon)
  }
}

function pokeInfoModal(poke) {
  console.log(poke);
  poke = poke[0];
  let html = ` 
  <div class="card">     
          <h2 class="poke-name">${poke.name}</h2>    
    </div>`;
  pokeDetailsContent.innerHTML = html
  pokeDetailsContent.parentElement.classList.add("showInfo");
}
