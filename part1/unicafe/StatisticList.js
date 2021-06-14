import React from "react";
import Statistic from "./Statistic";


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
      <Statistic text="good" value={props.good} />
      <Statistic text="neutral" value={props.neutral} />
      <Statistic text="bad" value={props.bad} />
      <Statistic text="all" value={props.all} />
      <Statistic text="average" value={props.average} />
      <p>{props.percent}</p>
    </div>
  );
};

export default Statistics;
