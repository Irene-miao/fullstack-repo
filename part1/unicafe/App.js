import "./App.css";
import React, { useState } from "react";
import ButtonGrp from "./ButtonGrp";
import Display from './Display';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
   setBad( bad + 1);
  };
  

  return (
    <div className='App'>
     <Display title='give feedback'/>
     <div>
     <ButtonGrp
      onGoodClick={handleGoodClick}
      good='good'
      onNeutralClick={handleNeutralClick}
      neutral='neutral'
      onBadClick={handleBadClick}
      bad='bad'
      />
     </div>
      <Display title='statistics' />
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  );
}

export default App;
