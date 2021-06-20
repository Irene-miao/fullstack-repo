import "./App.css";
import React, { useState } from "react";


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: 12345678 }
  ]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber] = useState('');

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    persons.forEach((person) => {
      if (newName === person.name) {
        alert(`${newName} is already added to phonebook.`)
        persons.pop();
      };
    setPersons(persons.concat(nameObject));
    setNewName('');
    setNewNumber('');
    })
  };

const handleNameChange = (event) => {
  console.log(event.target.value);
  setNewName(event.target.value);
};

const handleNumberChange = (event) => {
  console.log(event.target.value);
  setNewNumber(event.target.value);
};

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: 
          <input 
          value={newName}
         onChange={handleNameChange} 
         />
        </div>
        <div>
          number: 
          <input 
          value={newNumber}
         onChange={handleNumberChange} 
         />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        (<div key={person.name}>
        <p>
          {person.name} &nbsp; {person.number}
          </p>
          </div>)
      )}
    </div>
  )
}

export default App