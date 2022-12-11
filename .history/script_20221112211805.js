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
let limit = 8;

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
        `<ul class="card"> 
        <li class="leftSide">
          <img class="poke-img" src="${poke.image}" />
          <h2 class="poke-name">${poke.name}</h5>
        </li>
        <li class="right-side">
        <button class="btn">Info</button>
        </li>
    </ul>`
    )
    .join("");

  pokeCard.innerHTML = pokemonHTML;
};

fetchPokemon();
getPokemons(offset, limit);




