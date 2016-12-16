const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String
});

var taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  opened: Boolean,
  user: mongoose.Schema.Types.ObjectId
});

exports.User = mongoose.model('User', userSchema);
exports.Task = mongoose.model('Task', taskSchema);
