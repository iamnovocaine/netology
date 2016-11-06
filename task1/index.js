const pokemons = require('./pokemons'); //данные о покемонах
const PokemonList = require('./PokemonList'); //класс PokemonList
const Pokemon = require('./Pokemon'); //класс Pokemon

const objects = pokemons.map(
    obj => new Pokemon(obj.level, obj.name)
);

const lost = new PokemonList(...objects.filter(i => i % 2)); //Создать два списка покемонов 
const found = new PokemonList(...objects.filter(i => !(i % 2)));// и сохранить их в переменных lost и found 

lost.add(objects[1].level, objects[1].name); //Добавить несколько новых покемонов в каждый список.
found.add(objects[0].level, objects[0].name);

lost.show();
found.show();

found.push(lost.pop()); //Перевести одного из покемонов из списка lost в список found

console.log('Ищем максимального...');
found.max().show(); //возвращает покемона максимального уровня.
