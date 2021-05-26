import React from "react";
import Part from "./Part";

const Content = ({ course }) => {
  console.log(course);
const second = course.parts;
console.log(second);




  return (
    <ul>
     {second.map((item) => {
return <Part part={item.name} exercise={item.exercises} />
     })} 
    </ul>
  );
};

export default Content;
