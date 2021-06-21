import "./App.css";
import React, { useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [searchName, setSearchName] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    persons.forEach((person) => {
      if (newName === person.name) {
        alert(`${newName} is already added to phonebook.`);
        persons.pop();
      };
      setPersons(persons.concat(nameObject));
      setNewName("");
      setNewNumber("");
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
        onSubmit={addName}
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
