import "./App.css";
import React, { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import backend from './services/backend';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    console.log('effect');
    backend
    .getAll()
    .then(response => {
      console.log(response.data);
      setPersons(response.data);
    })
  }, []);

  console.log('render', persons.length, 'persons');

  // Create new Person Object
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    backend
    .create(personObject) // Object sent to server using axios post method
    .then(response => {
      setPersons(persons.concat(response.data)); //Save response sent from server to variable
      setNewName("");
      setNewNumber("");
    });

    persons.forEach((person) => {
      if (newName === person.name) {
        alert(`${newName} is already added to phonebook.`);
        persons.pop();
      };
    });
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleSearchNameChange = (event) => {
    console.log(event.target.value);
    setShowAll(!showAll);
    setSearchName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleDelete =(id) => {
    console.log(`${id} to be deleted`);
    backend
    .remove(id)
    .then(response => {
      const result = window.confirm("Do you want to delete?");
      if (result) {
        window.open("exit.html", "Deleted successfully!")
      };
      console.log(`Delete success ${response.data}`);
      setPersons(persons.filter(person => person.id !== id));
    });
  };

  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(searchName.toLowerCase())
      );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={searchName} onChange={handleSearchNameChange} />

      <h3>Add a new person details</h3>

      <PersonForm
        onSubmit={addPerson}
        value={newName}
        onChange={handleNameChange}
        valueNo={newNumber}
        onChangeNo={handleNumberChange}
      />

      <h2>Numbers</h2>
<ul>
{personsToShow.map((person) => 
  <Persons 
  key = {person.id}
      person={person}
      handleDelete={() => handleDelete(person.id)}
      />
)}
</ul>
    </div>
  );
};

export default App;
