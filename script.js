$(document).ready(function() {

    let next_url = 'https://pokeapi.co/api/v2/pokemon/';
    fetchData();

    //Jquery

    //$('#nexto').click(function(e){
    //    e.preventDefault();
    //    $('#characters').html(" ");
    //    fetchData();
    //});

    //JS

    document.getElementById('nexto').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('characters').innerHTML = '';
        fetchData();
    })
    
    function fetchData() {
        $.ajax({
            url: next_url, 
            dataType: 'json',
            method: 'GET',
            success: function(response){
                next_url = response.next;
                //console.log(response.results);
                response.results.forEach(function(character){
                    let list = `
                    <div class="card img-fluid col-2 mx-2" >
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${character.url.split('/')[6]}.png" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Pokémon: ${character.name}</h5>
                            <p class="card-text">Numero: ${character.url.split('/')[6]}</p>
                            <a href="#" id="${character.name}-${character.url.split('/')[6]}" class="btn btn-primary">¡Quiero saber más de este pokémon!</a>
                        </div>
                    </div>`;
                    //Insertar los pokemon 
                    document.querySelector('#characters').insertAdjacentHTML('beforeend', list);
                    document.querySelector(`#${character.name}-${character.url.split('/')[6]}`).addEventListener('click', (e) => {
                        e.preventDefault();
                        //document.getElementById('characters').innerHTML = '';
                        //fetchData(character.url.split('/')[6]);
                        $('#theModal').modal('show');
                        document.querySelector('#pokeName').innerHTML = "Nombre: " + character.name;
                        fetch(character.url)
                        .then(function(response){
                            return response.json();
                        })
                        .then(function(pokemonsito){
                            document.querySelector('#abilities').innerHTML = getAbilities(pokemonsito)
                            document.querySelector('#pokeTypes').innerHTML = getPokeTypes(pokemonsito)
                            document.querySelector('#firstFiveMoves').innerHTML = getPokeMoves(pokemonsito)  
                        })
                    })

                });
            }
        });  
    };


    function getAbilities(character) {
        let abi = 'Habilidades : '
        character.abilities.forEach(function(ability){
            abi += ` ${ability.ability.name}`
        })
        return abi;
    }


    function getPokeTypes(character) {
        let types = 'Tipo : '
        character.types.forEach(function(type){
            types += ` ${type.type.name}`
        })
        return types;
    }

    function getPokeMoves(character) {
        let move = 'Movimientos : '
        character.moves.forEach(function(movesito, index){
            if (index < 5) {
                move += ` ${movesito.move.name}`
            }
        })
        return move;
    }
    
});