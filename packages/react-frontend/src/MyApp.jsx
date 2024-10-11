import Table from "./Table";
import Form from "./Form";
import React, { useState, useEffect } from "react";

function MyApp() {
  const [characters, setCharacters] = useState([
    {
      name: "Charlie",
      job: "Janitor"
    },
    {
      name: "Mac",
      job: "Bouncer"
    },
    {
      name: "Dee",
      job: "Aspring actress"
    },
    {
      name: "Dennis",
      job: "Bartender"
    }
  ]);

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function deleteUser(id) {
    return fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });
  }

  function updateList(person) {
    postUser(person)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          console.log("Failed to add user. Status code: ", response.status);
        }
      })
      .then((newUser) => {
        if (newUser) {
          setCharacters([...characters, newUser]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function removeOneCharacter(index) {
    const characterToDelete = characters[index];
    deleteUser(characterToDelete.id)
      .then((response) => {
        if (response.status === 204) {
          const updated = characters.filter((character, i) => {
            return i !== index;
          });
          setCharacters(updated);
        } else {
          console.log("Failed to delete user. Status code: ", response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
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
