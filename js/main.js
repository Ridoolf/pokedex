const pokemonContainer = document.querySelector('#cardsContainer');

let URL = 'https://pokeapi.co/api/v2/pokemon/';
let promises = [];

for (let i = 1; i <= 151; i++) {
    promises.push(fetch(URL + i)
        .then(res => res.json())
    );
}

Promise.all(promises)
    .then(results => {
        results.forEach(data => mostrarPokemon(data));
    });

function mostrarPokemon(data){

    let id = data.id.toString();
    if(id.length === 1){
        id = `00${id}`
    } else if (id.length === 2){
        id = `0${id}`
    }

    let div = document.createElement('div');
    div.className = 'pokemon_container';
    div.innerHTML = `
    <p class="id_background">#${id}</p>
    <img src="${data.sprites.other['official-artwork'].front_default}" alt="pikachu" class="img_pokemon" />
    <div class="pokemon_info">
        <p class="id">${id}</p>
        <h4 class="pokemon_nombre">${data.name}</h4>
    </div>
    <div class="pokemon_tipos">
        <p>Fighting</p>
        <p>Psychic</p>
    </div>
    <div class="pokemon_description">
        <p class="pokemon_altura">${data.height}M</p>
        <p class="pokemon_peso">${data.weight}KG</p>
    </div>
    `
    pokemonContainer.append(div);
}

/*
<div class="pokemon_container">
    
</div>
*/