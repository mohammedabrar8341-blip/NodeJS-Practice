const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
});

const TodoSchema = new Schema({
  title: String,
  description: String,
  isDone: Boolean,
  userId: ObjectId,
});

const TodoModel = mongoose.model("todo", TodoSchema);
const UserModel = mongoose.model("user", UserSchema);

module.exports = {
  TodoModel,
  UserModel,
};