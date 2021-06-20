import "./App.css";
import React, { useState } from "react";


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]); 
  const [ newName, setNewName ] = useState('');

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
    };
    persons.forEach((person) => {
      if (newName === person.name) {
        alert(`${newName} is already added to phonebook.`)
        persons.pop();
      };
    setPersons(persons.concat(nameObject));
    setNewName('');
    })
  };

  console.log(persons);
const handleNameChange = (event) => {
  console.log(event.target.value);
  setNewName(event.target.value);
}

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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        (<div key={person.name}>
        <p>
          {person.name}
          </p>
          </div>)
      )}
    </div>
  )
}

export default App