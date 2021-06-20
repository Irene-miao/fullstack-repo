import React from 'react';

const Persons = (props) => {
    return (
        <div>
           {props.personsToShow.map(person => 
        (<div key={person.name}>
        <p>
          {person.name} &nbsp; {person.number}
          </p>
          </div>)
      )} 
        </div>
    )
}

export default Persons;
