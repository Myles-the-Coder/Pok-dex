const poke_container = document.getElementById("poke-container");
const form = document.getElementById("form");
const search = document.getElementById("search");
const url = 'https://pokeapi.co/api/v2/pokemon/"';
const pokemon_count = 151;
const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#778899",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

const main_types = Object.keys(colors);

const fetchPokemon = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  await axios
    .get(url)
    .then((response) => {
      let data = response.data;
      console.log(data);
      createPokemonCard(data);
    })
    .catch((error) => {
      if (error.response.status == 404) {
        createErrorCard("No Pokémon Found");
      }
    });
};

const createErrorCard = (mes) => {
  const errorCard = `
    <div class="pokemon">
    <div class = 'img-container'>
    <img src="https://th.bing.com/th/id/R4b45fc4ef00851a028427cf3b7f19fa4?rik=ppuWkPvRu11qEA&riu=http%3a%2f%2fvignette2.wikia.nocookie.net%2fmcleodgaming%2fimages%2fd%2fd8%2fMissingNo..png%2frevision%2flatest%3fcb%3d20131108185400&ehk=0lD8ZaESQ%2fccht%2bf%2ft7jAAS71yCb9%2f%2bePVaB5AFlSqs%3d&risl=&pid=ImgRaw" alt="Missing no.">
    </div>
    <div class="info"
      <h3 class="name">${mes}</h3>
    </div>
    </div>
  `;
  poke_container.innerHTML = errorCard;
};

const createPokemonCard = (pokemon) => {
  const pokemonEL = document.createElement("div");
  pokemonEL.classList.add("pokemon");

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, "0");
  const poke_types = pokemon.types.map((type) => type.type.name);
  const type =
    main_types.find((type) => poke_types.indexOf(type) > -1)[0].toUpperCase() +
    main_types.find((type) => poke_types.indexOf(type) > -1).slice(1);
  const color = colors[type[0].toLowerCase() + type.slice(1)];

  pokemonEL.style.backgroundColor = color;
  const pokemonInnerHTML = `
  <div class = 'img-container'>
  <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="">
  </div>
  <div class="info">
    <span class="number">#${id}</span>
    <h3 class="name">${name}</h3>
    <small class="type">Type: <span>${type}</span></small>
  </div>
  `;

  pokemonEL.innerHTML = pokemonInnerHTML;

  poke_container.appendChild(pokemonEL);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    poke_container.innerHTML = "";
    getPokemon(searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});

fetchPokemon();

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const searchTerm = search.value;

//   if (searchTerm && searchTerm !== "") {
//     getMovies(SEARCH_API + searchTerm);
//     search.value = "";
//   } else {
//     window.location.reload;
//   }
// });
