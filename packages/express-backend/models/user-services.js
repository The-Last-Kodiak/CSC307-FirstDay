import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

function getUsers(name, job) {
  if (name === undefined && job === undefined) return userModel.find();
  if (name) return userModel.find({ name });
  if (job) return userModel.find({ job });
  return userModel.find({ name, job });
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  return userToAdd.save();
}

function findUserByName(name) {
  return userModel.find({ name });
}

function findUserByJob(job) {
  return userModel.find({ job });
}

function findUserByNameAndJob(name, job) {
  return userModel.find({ name, job });
}

function deleteUser(id) {
  return userModel.findByIdAndDelete(id);
}

export default {
  addUser,
  getUsers,
  findUserById,
  deleteUser,
  findUserByNameAndJob // Ensure this is exported
};