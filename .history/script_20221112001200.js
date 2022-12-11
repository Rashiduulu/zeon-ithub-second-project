const pokeCard = document.getElementById("poke-card");

const previous = document.querySelector(".previous");
const next = document.querySelector(".next");


previous.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 9;
    removeChild(card);
    getPokemons(offset, limit);
  }
  console.log(previous);
});

next.addEventListener("click", () => {
  offset += 9;
  removeChild(card);
  getPokemons(offset, limit);

  console.log(next);
});





const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 50; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }
  Promise.all(promises).then((results) => {
    const pokemon = results.map((result) => ({
      name: result.name,
      image: result.sprites["front_default"],
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
        <img class="poke-img" src="${poke.image}" />
        <h3 class="poke-name">${poke.name}</h3>
    </li>`
    )
    .join("");
  pokeCard.innerHTML = pokemonHTML;
};

fetchPokemon();
