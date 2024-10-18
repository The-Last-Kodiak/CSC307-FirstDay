import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userServices from './models/user-services.js';

const app = express();
const port = 8000;

mongoose.connect('mongodb://localhost:27017/users').catch(error => console.error(error));

app.use(cors());
app.use(express.json());

const generateRandomId = () => {
  return Math.random().toString(36).substr(2, 9);
};

app.post("/users", (req, res) => {
  userServices.addUser(req.body)
    .then(newUser => res.status(201).json(newUser))
    .catch(err => res.status(400).json({ message: err.message }));
});

app.get("/users/:id", (req, res) => {
  userServices.findUserById(req.params.id)
    .then(user => {
      if (user) res.json(user);
      else res.status(404).json({ message: 'User not found' });
    })
    .catch(err => res.status(500).json({ message: err.message }));
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;
  if (name && job) {
    userServices.findUserByNameAndJob(name, job)
      .then(users => res.json(users))
      .catch(err => res.status(500).json({ message: err.message }));
  } else {
    userServices.getUsers(name, job)
      .then(users => res.json(users))
      .catch(err => res.status(500).json({ message: err.message }));
  }
});

app.delete("/users/:id", (req, res) => {
  userServices.deleteUser(req.params.id)
    .then(success => {
      if (success) res.status(204).send();
      else res.status(404).json({ message: 'Resource not found' });
    })
    .catch(err => res.status(500).json({ message: err.message }));
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
