import Table from "./Table";
import Form from "./Form";
import React, { useState, useEffect } from "react";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function fetchUsers() {
    return fetch("http://localhost:8000/users")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      });
  }

  function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
  }

  function deleteUser(id) {
    return fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    });
  }

  function updateList(person) {
    postUser(person)
      .then(newUser => {
        setCharacters([...characters, newUser]);
      })
      .catch(error => {
        console.error("Failed to add user:", error);
      });
  }

  function removeOneCharacter(index) {
  const characterToDelete = characters[index];
  deleteUser(characterToDelete._id)
    .then(() => {
      const updated = characters.filter((character, i) => i !== index);
      setCharacters(updated);
    })
    .catch(error => {
      console.error("Failed to delete user:", error);
    });
  }

  useEffect(() => {
    fetchUsers()
      .then(json => {
        console.log("Fetched users:", json);
        setCharacters(json);
      })
      .catch(error => {
        console.error("Failed to fetch users:", error);
      });
    }, []);

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
