import React from "react";
import Part from "./Part";
import Total from "./Total";

const Content2 = ({ data2 }) => {
  const part = data2.parts;
  const exercises = part.map((item) => item.exercises);
  console.log(exercises);

  return (
    <div>
      <Part part={part[0]} />
      <Part part={part[1]} />
      <Total total={exercises} />
    </div>
  );
};

export default Content2;
