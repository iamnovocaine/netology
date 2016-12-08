const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/test';
const pokemons = require('./pokemons');

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.log('Ошибка подключения ', err);
  } else {
    const collection = db.collection('pokemons');
	collection.insert(pokemons, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        collection.find({level:20}).toArray((err, result) => {
          if (err) {
            console.log(err);
          } else if (result.length) {
            console.log('Нашли:', result);
          } else {
            console.log('Не нашли покемона!');
          }
        });
        collection.remove();
		console.log('Очистили коллекцию!');
      };
      db.close();
    });
  }
});