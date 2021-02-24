document.getElementById("pokeball").addEventListener("click", function () {

    const userInput = document.querySelector(".search-text").value;

    let apiUrl = `https://pokeapi.co/api/v2/pokemon/${userInput}`;

    const names = document.querySelector("#nameBox");
    const bigImage = document.querySelector("#picture");
    const pokeId = document.querySelector("#IDBox");

    const allMoves = document.querySelector("#pokeMovements");
    let prevEvolutionimg = document.querySelector('#evo1');
    let evolution = document.getElementById('Evolutions');
    fetch(apiUrl).then(res => {
        return res.json()
            .then((data, index) => {
                let movesNames = [];

                names.textContent = data["name"]
                bigImage.src = data["sprites"]["front_default"];
                pokeId.textContent = "pokemon ID: " + data["id"]

                for (let i = 0; i < 4; i++) {
                    index = i
                    let dataMoves = data["moves"][index]
                    let dataMoveName = dataMoves["move"]["name"]
                    movesNames.push(dataMoveName);
                }

                let four = allMoves.slice(0, 4)
                four.textContent = data["moves"];

                function evolutionPokemon() {
                    fetch(`https://pokeapi.co/api/v2/pokemon-species/${userInput}`)
                        .then(response => response.json())
                        .then(evopokemon => {

                            if (evopokemon.evochain !== null) {
                                let innerEvol = evopokemon.evochain.name;
                                evolution.textContent = innerEvol;


                                function internImage() {
                                    fetch(`https://pokeapi.co/api/v2/pokemon/${innerEvol}`)
                                        .then(response => response.json())
                                        .then(response => {
                                            prevEvolutionimg.src = data["sprites"]["front_default"];

                                        })
                                }

                                internImage()

                            } else {
                                evolution.textContent = 'No previous evolution';
                                prevEvolutionimg.setAttribute("src", "");
                            }
                        });
                }

                evolutionPokemon();

            });
    })
})

