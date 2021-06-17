import React from 'react';
import Header from './Header';
import Total from './Total';

const Course = ({course}) => {
    return (
        <div>
          <Header course={course} />  
          <Total course={course}/>
        </div>
    )
}

export default Course;

