import React from 'react';


const Persons = ({person, handleDelete}) => {

    return (
        <div>
          <li>
          {person.name} &nbsp; {person.number}
          &nbsp;
          <button onClick={handleDelete}>delete</button>
          </li>
          </div>)
}

export default Persons;
