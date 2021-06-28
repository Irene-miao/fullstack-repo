import "./App.css";
import React, { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import axios from 'axios';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    console.log('effect');
    axios
    .get('http://localhost:3001/persons')
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

    axios
    .post('http://localhost:3001/persons', personObject) // Object sent to server using axios post method
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

      <Persons personsToShow={personsToShow}/>
    </div>
  );
};

export default App;
