const model = require("./model");
const User = model.User;
const mongoose = require('mongoose');

function list(req, res) {
    User.find({}, function (err, userList) {
        let context = {
            users: userList,
            error: req.query.error,
        };
        res.render('users', context);
    });
}

function create(req, res){
	var newUser = new User({
		name: req.body.name
	});
    newUser.save(function(err){
        if (err)
            res.redirect(303, `/user/add/?error=${err.message}`);
        else
            res.redirect(303, '/users');
    });
}

function edit(req, res){
	let id = req.params.id;
	User.update({"_id": id}, {$set: req.body}, function(err, result){
        if (err)
            res.redirect(303, `/user/edit/${id}?error=${err.message}`);
        else
            res.redirect(303, '/users/');
    });
}
function deleteOne(req, res) {
	let id = req.params.id;
	User.remove({"_id": id}, function(err, result){
        if (err)
            res.redirect(303, `/users/?error=${err.message}`);
        else
            res.redirect(303, '/users/');
    });
}

function addPage(req, res) {
	let context = {
        error: req.query.error
    };
    res.render('addUser', context);
}
function editPage(req, res) {
	let id = req.params.id;
	User.findById(id, function(err, result){
        let context = {
            user: {
                name: result.name,
                id: id,
                error: req.query.error
            }
        };
        res.render('editUser', context);
    });
}
function deletePage(req, res) {
	let id = req.params.id;
	User.findById(id, function(err, result){
        let context = {
            user: {
                name: result.name,
                id: id,
                error: req.query.error
            }
        };
        res.render('deleteUser', context);
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