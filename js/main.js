const pokemonContainer = document.querySelector('#cardsContainer');
const btn_type = document.querySelectorAll('.btn_type');

let URL = 'https://pokeapi.co/api/v2/pokemon/';
let promises = [];

for (let i = 1; i <= 151; i++) {
    promises.push(fetch(URL + i).then(res => res.json()));
}

Promise.all(promises)
    .then(results => {
        results.forEach(data => mostrarPokemon(data));

        btn_type.forEach(btn => {
            btn.addEventListener('click', (event) => {
                pokemonContainer.innerHTML = '';
                const btnId = event.currentTarget.id;
                if (btnId === 'all') {
                    results.forEach(data => mostrarPokemon(data));
                } else {
                    results.filter(data => data.types.map(type => type.type.name).includes(btnId))
                            .forEach(data => mostrarPokemon(data));
                }
            });
        });
    });

function mostrarPokemon(data){
    let tipos = data.types.map(type => `<p class="${type.type.name}">${type.type.name}</p>`);
    tipos = tipos.join('');

    let id = data.id.toString();
    if(id.length === 1){
        id = `00${id}`;
    } else if (id.length === 2){
        id = `0${id}`;
    }

    let div = document.createElement('div');
    div.className = 'pokemon_container';
    div.innerHTML = `
    <p class="id_background">#${id}</p>
    <img src="${data.sprites.other['official-artwork'].front_default}" alt="${data.name} imagen" class="img_pokemon" />
    <div class="pokemon_info">
        <p class="id">${id}</p>
        <h4 class="pokemon_nombre">${data.name}</h4>
    </div>
    <div class="pokemon_tipos">
        ${tipos}
    </div>
    <div class="pokemon_description">
        <p class="pokemon_altura">${data.height}M</p>
        <p class="pokemon_peso">${data.weight}KG</p>
    </div>
    `;
    pokemonContainer.append(div);
}


