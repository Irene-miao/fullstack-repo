import React from 'react';

const Total = ({parts}) => {
    const a = parts[0].exercises;
    const b = parts[1].exercises;
    const c= parts[2].exercises;

    return (
        <div>
         <p>There are a total of { a+ b + c } exercises.</p>
        </div>
    )
}

export default Total;
