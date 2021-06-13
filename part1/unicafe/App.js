import "./App.css";
import React, { useState } from "react";
import ButtonGrp from "./ButtonGrp";
import Display from './Display';
import Statistics from "./Statistics";


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
    percentage = <p>positive &nbsp;  {(good/all)*100} %</p>
   } else {
     percentage = <p>positive   0 %</p>
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
      <Statistics 
      good={good}
      neutral={neutral}
      all={all}
      bad={bad}
      average={average}
      percentage={percentage}
      />
    </div>
  );
}

export default App;
