import React from 'react';

const Total = ({course}) => {
    const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises + course.parts[3].exercises
    return (
        <div>
            <p>Total of { sum } exercises</p>
        </div>
    )
}

export default Total;
