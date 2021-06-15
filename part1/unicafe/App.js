import "./App.css";
import React, { useState } from "react";
import ButtonGrp from "./ButtonGrp";
import Display from './Display';
import StatisticList from "./StatisticList";


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
  
  const average = (all/3).toFixed(2);


    let percent;

    if (good !== 0) {
     percent = <p>&nbsp; {((good/all)*100).toFixed(2)} %</p>
    } else {
      percent = <p>&nbsp; 0 %</p>
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
      <StatisticList 
     bad={bad}
     percent={percent}
     good={good}
     neutral={neutral}
     average={average}
     all={all}
      />
    </div>
  );
}

export default App;