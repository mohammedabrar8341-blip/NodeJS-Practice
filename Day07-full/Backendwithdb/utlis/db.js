const mongoose = require("mongoose");
const { title } = require("node:process");
const { describe } = require("node:test");
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const TodoSchema = new Schema({
  title: String,
  description: String,
  isDone: Boolean,
  userId: ObjectId,
});

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
});

const TodoModel = mongoose.model("todo", TodoSchema);
const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
  TodoModel,
};
