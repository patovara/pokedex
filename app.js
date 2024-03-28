const pokemonList = document.querySelector('#pokemon-list');
const buttonsHeader = document.querySelectorAll('.btn-header');
let URL = 'https://pokeapi.co/api/v2/pokemon/';

 for (let i = 1; i <= 151; i++){
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => showPokemon(data))
        
 }

 function showPokemon(data){

    let types = data.types.map(types => `<p class="${types.type.name} type">${types.type.name}</p>`);
    types = types.join('');

    let pokemonId = data.id.toString();
    if(pokemonId.length === 1){
        pokemonId = '00' + pokemonId;
    }else if(pokemonId.length === 2){
        pokemonId = '0' + pokemonId;
    }

    const div = document.createElement("div");
    div.classList.add('pokemon');
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokemonId}</p>
            <div class="pokemon-img">
                <img src="${data.sprites.other['official-artwork'].front_default}" alt="${data.name}">
            </div>
            <div class="pokemon-info">
                <div class="name-container">
                    <p class="pokemon-id">#${pokemonId}</p>
                    <h2 class="pokemon-name">${data.name}</h2>
                </div>
                <div class="pokemon-type">
                    ${types}
                </div>
                <div class="pokemon-stats">
                    <p class="stats">${data.height}</p>
                    <p class="stats">${data.weight}</p>
                </div>
            </div>
        `;
        pokemonList.append(div);
 }

 buttonsHeader.forEach(button => button.addEventListener('click', (event) => {
    const buttonId = event.currentTarget.id;

    pokemonList.innerHTML='';

    for (let i = 1; i <= 151; i++){
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if(buttonId === 'ver-todos'){
                    showPokemon(data)
                } else {
                    const types = data.types.map(types => types.type.name);
                    if(types.some(type => type.includes(buttonId))){
                        showPokemon(data);
                    }
                }

            })
     }
 }))