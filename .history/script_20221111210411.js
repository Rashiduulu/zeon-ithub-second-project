const pokedex = document.getElementById("pokedex")

const fetchPokemon = () => {
    const promises = []
    for (let i = 1; i <= 50; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`
        promises.push(fetch(url).)
    }
}