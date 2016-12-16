const model = require("./model");
const Task = model.Task;

function list(req, res) {
    Task.find({}, function (err, taskList) {
        let context = {
            tasks: taskList,
            error: req.query.error
        };
        res.render('tasks', context);
    });
}

function create(req, res){
	var newTask = new Task({
		name: req.body.name,
		description: req.body.description,
		opened: true,
	})
    newTask.save(function(err){
        if (err)
            res.redirect(303, `/task/add?error=${err.message}`);
        else
            res.redirect(303, '/');
    });
}

function edit(req, res){
	let id = req.params.id;
	Task.update({"_id": id}, {$set: req.body}, function(err, result){
        if (err)
            res.redirect(303, `/task/edit/${id}?error=${err.message}`);
        else
            res.redirect(303, '/');
    });
}
function deleteOne(req, res) {
	let id = req.params.id;
	Task.remove({"_id": id}, function(err, result){
        if (err)
            res.redirect(303, `/?error=${err.message}`);
        else
            res.redirect(303, '/');
    });
}

function addPage(req, res) {
	let context = {
        error: req.query.error
    };
    res.render('addTask', context);
}
function editPage(req, res) {
	let id = req.params.id;
	Task.findById(id, function(err, result){
        let context = {
            task: {
                name: result.name,
				description: result.description,
                id: id,
				//opened: result.opened,
                error: req.query.error
            },
        };
        res.render('editTask', context);
    });
}
function deletePage(req, res) {
	let id = req.params.id;
	Task.findById(id, function(err, result){
        let context = {
            task: {
                name: result.name,
				description: result.description,
                id: id,
                error: req.query.error
            },
        };
        res.render('deleteTask', context);
    });
}
module.exports = {
    list,
	addPage,
	create,
	editPage,
	edit,
	deletePage,
	deleteOne
};