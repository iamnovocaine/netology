const express = require("express");
const bodyParser = require("body-parser");
const user = require("./user"); //library
const app = express();
const port = process.env.PORT || 3000;

app.listen(port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

app.get("/users", user.list);//Список телефонов с фамилией и именем;
app.post("/users", user.create);//Добавление нового контакта;
app.put("/users/:id", user.update);//Редактирование старой информации;
app.delete("/users/:id", user.deleteOne);//Удаление контакта;
app.get("/users/:id", user.list); //Поиск по id, номеру телефона, фамилии, имени;
app.delete("/users", user.deleteMany);//Удаление всех контактов; 

app.use(function(req, res){
	res.status(404).send('404 Not Found');
});
app.use(function(err, req, res, next){
	console.dir(err);
	res.status(500).send('500 Server Error');
});
