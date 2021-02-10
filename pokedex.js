document.getElementById("pokeball").addEventListener("click", function () {

    const userInput = document.querySelector(".search-text").value;

    let apiUrl = `https://pokeapi.co/api/v2/pokemon/${userInput}`; // api url

    const names = document.querySelector("#nameBox"); // pokemon name
    const bigImage = document.querySelector("#picture"); // pokemon image
    const pokeId = document.querySelector("#IDBox");

    const allMoves = document.querySelector("#pokeMovements");
    let prevEvolutionimg = document.querySelector('.evo1'); //image of the pokemon
    let evolu = document.getElementById('Evolutions');
    fetch(apiUrl).then(res => {
        return res.json()
            .then((data, index) => {
                let movesNames = [];

                names.textContent = data["name"]
                bigImage.src = data["sprites"]["front_default"];
                pokeId.textContent = "pokemon ID: " + data["id"]

                console.log(data);

                for (let i = 0; i < 4; i++) {
                    index = i
                    let dataMoves = data["moves"][index]
                    let dataMoveName = dataMoves["move"]["name"]
                    movesNames.push(dataMoveName);
                }

                let four = allMoves.slice(0, 4)
                four.textContent = data["moves"];

                function evolutionPokemon(evopokemon) {
                    fetch(`https://pokeapi.co/api/v2/pokemon-species/${userInput}`)
                        .then(response => response.json())
                        .then(evopokemon => {
                            console.log(evopokemon)

                            if (evopokemon.evolves_from_species !== null) {
                                let innerEvol = evopokemon.evolves_from_species.name;
                                evolu.textContent = innerEvol;


                                function internImage() {
                                    fetch(`https://pokeapi.co/api/v2/pokemon/${innerEvol}`)
                                        .then(response => response.json())
                                        .then(response => {
                                            console.log(response);
                                            prevEvolutionimg.evo1 = data["sprites"]["front_default"];
                                        })
                                }

                                internImage()

                            } else {
                                evolu.textContent = 'No previous evolution';
                                prevEvolutionimg.setAttribute("src", "");
                            }
                        });
                }

                evolutionPokemon();

            });
    })
})

