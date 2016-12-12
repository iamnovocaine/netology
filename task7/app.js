const express = require("express");
const bodyParser = require("body-parser");
const user = require("./user");
const app = express();
const port = process.env.PORT || 3000;
const type = process.argv[2] || 'rest';
app.listen(port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

if(type == 'rest') {	
	app.post("/users", function(req, res){
		let result = user.create({'name':req.body.name, 'score':req.body.score});
		res.json(result);
	});
	app.get("/users", function(req, res){
		let result = user.list({});
		res.json(result);
	});
	app.delete("/users/:id", function(req, res){
		let result = user.deleteFunc({"id":req.params.id});
		if(result) {
			res.json(result);
		}
		else {
			res.status(404).send('User ['+ req.params.id +'] is not exist');
		}
	});
	app.get("/users/:id", function(req, res){
		let result = user.get({"id":req.params.id});
		if(result) {
			res.json(result);
		}
		else {
			res.status(404).send('User ['+ req.params.id +'] is not exist');
		}
	});
	app.put("/users/:id", function(req, res){
		let result = user.update({"id":req.params.id, "name":req.body.name, "score":req.body.score});
		if (result) {
			res.json(result);
		} else {
			res.status(404).send('User ['+ req.params.id +'] is not exist');
		}		
	});
	app.delete("/users/", function(req, res){
		let result = user.deleteMany({});
		res.json(result);
	});
	app.use(function(req, res){
		res.status(404).send('404 Not Found');
	});
	app.use(function(err, req, res, next){
		console.dir(err);
		res.status(500).send('500 Server Error');
	});
}
else if(type == 'rpc') {
	app.post('/rpc', (req, res) => {
		let method = req.body.method; 
		let func = user[method]; 
		if(func) {
			func(req.body.params, function(error, result) {
				if(error) {
					res.json({
						jsonrpc: "2.0", 
						error: {
							code: -32500, 
							message: error
						}, 
						id: req.body.id
					});
				} else {
					res.json({
						jsonrpc: "2.0", 
						result: result, 
						id: req.body.id
					});
				}
			});
		} else {
			res.json({
			jsonrpc: "2.0", 
			error: {
				code: -32601, 
				message: "Method not found"
			}, 
			id: req.body.id
		});
		}
	});
	
	app.use(function(err, req, res, next){
		res.json({
			jsonrpc: "2.0", 
			error: {
				code: -32500, 
				message: "Server error"
			}, 
			id: req.body.id
		});
	});

}
else {
	console.log('Bad choise');
}