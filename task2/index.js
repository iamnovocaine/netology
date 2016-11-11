const pokemons = require('./pokemons'); //данные о покемонах
const PokemonList = require('./PokemonList'); //класс PokemonList
const Pokemon = require('./Pokemon'); //класс Pokemon
const Hidenseek = require("./hidenseek"); //класс Hidenseek

let method = process.argv[2],
	path = process.argv[3];

if (method == "seek"){
	Hidenseek.seek(path, (error, foundedPokemons) => {
		if (error) throw error;
		foundedPokemons.show();
	});
}
else if(method == "hide"){
	
	let pokemons = require(process.argv[4]);
	let pokemonsObj = pokemons.map(data => new Pokemon(data.level, data.name));
	let pokemonList = new PokemonList(...pokemonsObj);

	Hidenseek.hide(path, pokemonList, (error, hiddenPokemons) => {
		if (error) throw error;
		hiddenPokemons.show();
	});
}
else{
	console.log(`seek <path> - найти покемонов в папке path
hide <path> <pokemonDataPath> - спрятать покемонов в папке path`);
}