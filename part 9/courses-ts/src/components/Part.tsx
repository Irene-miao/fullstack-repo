import React from 'react'
import {CoursePart} from '../types';

interface Parts {
    parts: CoursePart;
}



const Part = (props: Parts) => {
console.log(props);
const part = props.parts;
console.log(part);
 if (part.name === "Fundamentals") {
return (
    <div>
        <h4>{part.name} {part.exerciseCount}</h4>
        <p><em>{part.description}</em></p>
    </div>
)
 } else if (part.name === "Advanced") {
     return (
         <div>
             <h4>{part.name} {part.exerciseCount}</h4>
        <p><em>{part.description}</em></p>
         </div>
     )
 } else if (part.name === "Using props to pass data") {
     return (
         <div>
             <h4>{part.name}</h4>
        <p>project exercises {part.groupProjectCount}</p>
         </div>
     )
 } else if (part.name === "Deeper type usage") {
    return (
        <div>
            <h4>{part.name}</h4>
       <p><em>{part.description}</em></p>
       <p>{part.exerciseSubmissionLink}</p>
        </div>
    )
 } else if (part.name === "Backend development") {
    return (
        <div>
            <h4>{part.name}</h4>
       <p><em>{part.description}</em></p>
       <p>required skills: {part.requirements.join(", ")}</p>
        </div>
    )
 } else {
     throw new Error('Invalid value')
 }




}

  


export default Part
