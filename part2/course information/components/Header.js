import React from "react";
import Content from "./Content";
import Content2 from "./Content2";


const Header = ({ course }) => {
    const dataOne = course[0];
    console.log(dataOne);
    const dataTwo = course[1];

  return (
    <div>
     <h1>{dataOne.name}</h1>
     <Content data={dataOne}/>
     <h1>{dataTwo.name}</h1>
     <Content2 data2={dataTwo}/>
    </div>
  );
};

export default Header;
