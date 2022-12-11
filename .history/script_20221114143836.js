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

const fetchPokemon = async (offset, limit) => {
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
  await Promise.all(promises).then((results) => {
    const pokemon = results.map((result) => ({
      name: result.name,
      image: result.sprites.other["official-artwork"].front_default,
      weight: result.weight,
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
        `<div class="card"> 
        <div class="left-side">
          <img class="poke-img" src="${poke.image}" />
          <h4 class="poke-name">${poke.name}</h4>
        </div>
        <div class="right-side">
         <a href = "#" class = "info-btn">info</a>
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
    let pokeItem = e.target;
    console.log(pokeItem);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeItem.id}`)
      .then((respose) => respose.json())
      .then((url) => pokeInfoModal(url));
  }
}

function pokeInfoModal(url) {
  console.log(url);
  data = url[0];
  let html = `
    <div class="info-card">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
          class="pokeImg" alt="">
           <h2 class="poke-name">${url.count}</h2>
           <p>Weight: 160</p>
           <p>Type: Power</p>
    </div>
 `;
  pokeDetailsContent.innerHTML = html;
  pokeDetailsContent.parentElement.classList.add("showInfo");
}
