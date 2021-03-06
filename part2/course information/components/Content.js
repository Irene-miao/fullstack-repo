import React from "react";
import Part from "./Part";
import Total from "./Total";

const Content = ({ data }) => {
  const part = data.parts;
const exercises = part.map((item) => item.exercises);
console.log(exercises);

  return (
    <div>
      <Part part={part[0]} />
      <Part part={part[1]} />
      <Part part={part[2]} />
      <Part part={part[3]} />
      <Total total={exercises} />
    </div>
  );
};

export default Content;
