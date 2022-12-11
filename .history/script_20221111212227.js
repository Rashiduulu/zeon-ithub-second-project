const pokeCard = document.getElementById("poke-card");

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
    showPokemon();
  });
};

const showPokemon = (pokemon) => {
  console.log(pokemon);
    const pokemonHTML = pokemon
        .map((pokemon) => 
    `<li class="card"> 
        <img class="poke-img" src="${poke.image}" />
        <h3 class="poke-name">${poke.name}</h3>
    </li>`
    ).join("")
    pokeCard.innerHTML = pokemonHTML
};

fetchPokemon()