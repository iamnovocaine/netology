const Pokemon = require('./Pokemon'); //данные о покемонах
class PokemonList extends Array {
    constructor(...pokemons) {
        super(...pokemons);
    }
    show() {
        console.log("Выводим покемонов ... (всего %d)", this.length);
        for (let pokemon of this) {
            pokemon.show();
        }
    }
	add(level, name){
		let newPokemon = new Pokemon(level, name);
		this.push(newPokemon);
    }
	max() {
		let LevelMax = Math.max(...this);
		for (let pokemon of this) {
            if(pokemon.level == LevelMax)
				return pokemon;		
        }
	}
	max1() {		
		let LevelMax = Math.max(...this);
		for (let pokemon of this) {
            if(pokemon.valueOf() == LevelMax)
				return pokemon;		
        }
	}
}
module.exports = PokemonList;