import "./App.css";
import React, { useState } from "react";


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber] = useState('');
  const [ showAll, setShowAll] = useState(true);
  const [ searchName, setSearchName] = useState('');

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

const handleSearchNameChange = (event) => {
  console.log(event.target.value);
  setShowAll(!showAll);
  setSearchName(event.target.value);
  
};

const handleNumberChange = (event) => {
  console.log(event.target.value);
  setNewNumber(event.target.value);
};

const personsToShow = showAll ? persons :
persons.filter(person => person.name.toLowerCase().includes(searchName));

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
      <div>
          filter shown with 
          <input 
          value={searchName}
         onChange={handleSearchNameChange} 
         />
        </div>
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
      {personsToShow.map(person => 
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