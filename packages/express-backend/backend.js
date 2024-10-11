import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    },
    {
      "id": "qwe123",
      "job": "Zookeeper",
      "name": "Cindy"
    }
  ]
};

app.use(cors());
app.use(express.json());

const generateRandomId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const addUser = (user) => {
    user.id = generateRandomId(); // Assign a random ID to the user
    users["users_list"].push(user);
    return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const newUser = addUser(userToAdd); // addUser now returns the added user with the generated ID
  res.status(201).send(newUser); // Return 201 Created with the new user
});

const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

const findUsersByNameAndJob = (name, job) => {
    return users["users_list"].filter(
        (user) => user["name"] === name && user["job"] === job
    );
};

const deleteUserById = (id) => {
  const index = users["users_list"].findIndex((user) => user.id === id);
  if (index !== -1) {
      users["users_list"].splice(index, 1);
      return true;
  }
  return false;
};

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    let result;
    if (name && job) {
        result = findUsersByNameAndJob(name, job);
        result = { users_list: result };
    } else if (name) {
        result = findUserByName(name);
        result = { users_list: result };
    } else {
        result = users;
    }
    res.send(result);
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const success = deleteUserById(id);
  if (success) {
      res.status(204).send(); // No Content
  } else {
      res.status(404).send("Resource not found.");
  }
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
