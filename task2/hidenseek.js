const PokemonList = require('./PokemonList'); //класс PokeminList
const pokemons = require('./pokemons'); //данные о покемонах
const Pokemon = require('./Pokemon'); //класс Pokemon
const fs = require('fs');
const file = 'pokemon.txt'; //название файла
const random = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  max = Math.floor(Math.random() * (max - min + 1));
  return max + min;
};
const folders = 10; //максимальное число папок

function hide(path ='./', Pokemons, callback) {
	countPokemons = Pokemons.length > 3 ? random(1, 3) : random(1,Pokemons.length), //нужно спрятать число покемонов
	selectedPokemons = new PokemonList, //массив выбранных случайным образом покемонов
	hiddenPokemons = new PokemonList, 
	hiddencountPokemons = countPokemons;
	shuffle(Pokemons);

    for(let i = 1; i <= countPokemons; i++) //формируем тех, кого спрятать
    {
		let id = random(0, Pokemons.length);
		selectedPokemons.push(Pokemons[id]);
    }

	function shuffle(list) {
		return list.sort(function() {return 0.5 - Math.random()});
	}
	
	fs.access(path, fs.constants.W_OK, newFolders);
	
	function newFolders(error){
		if (error) callback(error, null);
	  	
  		  for (let i = 1; i <= folders; i++){	
				let folder = String(i);
				if (folder.length < 2)
					folder = `0${folder}`;
				fs.mkdir(path + "/" + folder, (error) => {
					if (error) callback(error, null);
					newFile(folder);
				});
		  };
	}
	function newFile(folder){		
		if(countPokemons > 0) {
			let pushing = selectedPokemons.shift();
			fs.writeFile(path + "/" + folder + "/" + file, pushing.info(), (error) => {
				if (error) callback(error, null);
				savePokemon(pushing);
			});
			countPokemons--;
		}
			
	}
	
	function savePokemon(pokemon){
		hiddenPokemons.push(pokemon);
	  	if (hiddenPokemons.length == hiddencountPokemons)
	  		callback(null, hiddenPokemons);
	}	
}

function seek(path ='./', callback) {	
	
	let foundedPokemons = new PokemonList(),
		readedFolders = 0,
		foldersCount;
		
	fs.readdir(path, searchFiles);
	
	function readFiles(error, data){
		readedFolders++;

	  	if (!error){
	  		let pokemonData = data.split("|");
		  	foundedPokemons.add(pokemonData[0], pokemonData[1]);

		  	if (readedFolders == foldersCount)
	  			callback(null, foundedPokemons);
	  	}
	}

	function searchFiles(error, folders){
		if (error) callback(error, null);
		foldersCount = folders.length;

	  	folders.forEach(function(folder) {
      		fs.readFile(path + folder + '/' + file, 'utf8', readFiles);
	  	});
	}
}
module.exports = {
	hide,
	seek
}