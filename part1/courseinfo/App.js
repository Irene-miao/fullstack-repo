import React from 'react';
import Header from './Header';
import Content from './Content';
import Total from './Total';

function App() {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header name={course} />
     <Content 
     partOne={part1.name} exerciseOne={part1.exercises}
     partTwo={part2.name} exerciseTwo={part2.exercises}
     partThree={part3.name} exerciseThree={part3.exercises}
     />
     <Total number={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

export default App;
