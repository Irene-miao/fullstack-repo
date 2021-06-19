import React from "react";

const Total = ({total}) => {
console.log(total);
const all = total.reduce((sum, number) => sum + number);

  return (
    <div>
      <h4>Total of {all} exercises</h4>
    </div>
  );
};

export default Total;
