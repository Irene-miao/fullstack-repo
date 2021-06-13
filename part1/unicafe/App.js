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

  const all = good+bad+neutral;
  
  
  const average = all/3;

  let percentage;

   if (good !== 0) {
    percentage = <p>positive {(good/all)*100} %</p>
   } else {
     percentage = <p>positive 0 %</p>
   }


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
      <p>all {all}</p>
      <p>average {average}</p>
      <p>{percentage}</p>
    </div>
  );
}

export default App;
