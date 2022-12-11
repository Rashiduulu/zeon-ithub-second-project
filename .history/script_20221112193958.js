const pokeCard = document.getElementById("poke-card");
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");

/////////////////////////////////////////////////////////////////////// pagination

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
let limit = 19;

function getPokemons(offset, limit) {
  fetchPokemon(offset, limit);
}

function removeChild(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//////////////////////////////////////////////////////////////////////// fetch

const fetchPokemon = async (offset, limit) => {
  const promises = [];
  for (let i = offset; i <= offset + limit; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    promises.push(fetch(url).then((res) => res.json()));
  }
  await Promise.all(promises).then((results) => {
    const pokemon = results.map((result) => ({
      name: result.name,
      image: result.sprites.other.off["front_default"],
    }));
    showPokemon(pokemon);
  });
};

const showPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTML = pokemon
    .map(
      (poke) =>
        `<li class="card"> 
        <div class="leftSide">
          <img class="poke-img" src="${poke.image}" />
          <h3 class="poke-name">${poke.name}</h3>
        </div>

        <div class="right-side">
        <button class= "btn">Info</button>
        </div>
       
    </li>`
    )
    .join("");

  pokeCard.innerHTML = pokemonHTML;
};

fetchPokemon();
getPokemons(offset, limit);
