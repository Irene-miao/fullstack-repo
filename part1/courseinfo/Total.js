import React from 'react';

const Total = ({course}) => {
    console.log(course);
    const second = course.parts;
    console.log(second);
const total = second.map((item) => {
    return item.exercises
});
let initialValue = 0;

let sum = total.reduce((totalValue, currentValue) => {
    return totalValue + currentValue
}, initialValue);

    return (
        <div>
         <p>There are a total of {sum} exercises.</p>
        </div>
    )
}

export default Total;
