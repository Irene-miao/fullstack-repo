import React from "react";

const Statistics = (props) => {
  return (
    <div>
      <p>good &nbsp;  {props.good}</p>
      <p>neutral  &nbsp;  {props.neutral}</p>
      <p>bad &nbsp;   {props.bad}</p>
      <p>all &nbsp;  {props.all}</p>
      <p>average &nbsp;  {props.average}</p>
      <p>{props.percentage}</p>
    </div>
  );
};

export default Statistics;
