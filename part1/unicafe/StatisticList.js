import React from "react";


const Statistics = (props) => {
 
  if (props.all === 0) {
    return (
      <div>
        <p>No feedback is given</p>
      </div>
    );
  }

  return (
    <div>
      <p>good &nbsp; {props.good}</p>
      <p>neutral &nbsp; {props.neutral}</p>
      <p>bad &nbsp; {props.bad}</p>
      <p>all &nbsp; {props.all}</p>
      <p>average &nbsp; {props.average}</p>
      <p>{props.percent}</p>
    </div>
  );
};

export default Statistics;
