const pokedex = document.getElementById("pokedex")

const fetchPokemon = () => {
    const promises = []
    for (let i = 1; i <= 50; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites["front_default"]
        }));
        showPokemon()
    })
}

const showPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTML = pokemon
        .map(
            (poke) => {
                <li class="card"> 

                </li>
        }
    )
}