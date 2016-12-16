const bodyParser = require("body-parser");
const express = require("express");
const jade = require('jade');
const mongoose = require('mongoose');

const task = require('./task');
const user = require('./user');

const url = 'mongodb://localhost:27017/taskbase1';
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

app.listen(port);

mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

app.set('views', './views');
app.set('view engine', 'jade')

//работа с пользователями
app.get("/users", user.list);				//Список пользователей
app.get("/user/add", user.addPage); 		//Показ формы для добавления пользователя
app.post("/user/add", user.create); 		//Добавление пользователя

app.get("/user/edit/:id", user.editPage); 	//Показ формы для редактирования пользователя
app.post("/user/edit/:id", user.edit); 		//Редактирование пользователя

app.get("/user/delete/:id", user.deletePage); 	//Показ формы для удаления пользователя
app.post("/user/delete/:id", user.deleteOne); 	//Удаление пользователя

//работа с задачами
app.get("/", task.list);					//Список задач
app.get("/task/add", task.addPage); 		//Показ формы для добавления задачи
app.post("/task/add", task.create); 		//Добавление задачи

app.get("/task/edit/:id", task.editPage);	//Показ формы для редактирования задачи
app.post("/task/edit/:id", task.edit); 		//Редактирование задачи

app.get("/task/delete/:id", task.deletePage); 	//Показ формы для удаления задачи
app.post("/task/delete/:id", task.deleteOne); 	//Удаление задачи

app.use(function(req, res){
	res.status(404).send('404 Not Found');
});
app.use(function(err, req, res, next){
	console.dir(err);
	res.status(500).send('500 Server Error');
});
