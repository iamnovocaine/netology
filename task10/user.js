const users = require('./users'); //data
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/users';
let database;

MongoClient.connect(url, (err, db) => {
	if (err) {
	console.log('Ошибка подключения ', err);
	} else {
		database = db;
		const collection = db.collection('users');
		collection.insert(users, (err, result) => {
		if (err) {
			console.log(err);
		}
		});
	}
});

function create(req, res) {
	let newUser = [{
        "name": req.body.name,
        "phone": req.body.phone,
		"secondname": req.body.secondname,
    }];
	database.collection('users').insert(newUser);
	
}
function list(req, res) {
	let id = req.params.id;
    let search = req.query ? req.query : {};
    if (id)
        search["_id"] = new mongodb.ObjectID(id);
	
	database.collection('users').find(search).toArray((err, result) => {
		if (err) {
		console.log(err);
		} else {
		res.json({users: result});
		};
	});
}
function deleteOne(req, res) {
	let id = req.params.id;
	database.collection('users').deleteOne( { "_id" : new mongodb.ObjectID(id) },
    (err, result) => {
	if (err) {
        console.log(err);
		res.json({error: err.message})
      } else if (result) {
        res.json(result);
      } else {
        res.json({ message: 'Not Found' });
      };
    });	
}
function update(req, res) {
	let id = req.params.id;
    let newdata = {};
    if (req.body.name || req.query.name)
        newdata["name"] = req.body.name ? req.body.name : req.query.name;
    if (req.body.secondname || req.query.secondname)
        newdata["secondname"] = req.body.secondname ? req.body.secondname : req.query.secondname;
    if (req.body.phone || req.query.phone)
        newdata["phone"] = req.body.phone ? req.body.phone : req.query.phone ;
	database.collection('users').update({'_id': new mongodb.ObjectID(id)}, {$set: newdata},
    (err, result) => {
	if (err) {
        console.log(err);
		res.json({error: err.message})
      } else if (result) {
        res.json(result);
      } else {
        res.json({ message: 'Not Found' });
      };
    });
}
function deleteMany(req, res) {
	database.collection('users').deleteMany({}, (err, result) => {
	if (err) {
        console.log(err);
		res.json({error: err.message})
      } else if (result) {
        res.json(result);
      } else {
        res.json({ message: 'Not Found' });
      };
    });
    
}
module.exports = {
    create,
	list,
	deleteOne,
	update,
	deleteMany
};