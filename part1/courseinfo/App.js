import React from 'react';
import Header from './Header';
import Content from './Content';
import Total from './Total';

function App() {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course} />
     <Content 
     partOne={part1} exerciseOne={exercises1}
     partTwo={part2} exerciseTwo={exercises2}
     partThree={part3} exerciseThree={exercises3}
     />
     <Total number={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App;
