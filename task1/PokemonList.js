const Pokemon = require('./Pokemon'); //данные о покемонах
class PokemonList extends Array {
    constructor(...pokemons) {
	pokemons = pokemons.filter(pokemon => pokemon instanceof Pokemon);
        super(...pokemons);
    }
    show() {
        console.log(`Выводим покемонов ... (всего ${this.length})`);
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
		return this.find(item => item.level == LevelMax);
	}
}
module.exports = PokemonList;
