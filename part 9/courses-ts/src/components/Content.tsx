import * as React from 'react'
import Part from './Part';
import {CoursePart} from '../types'

interface Course {
    course: CoursePart[];
}

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
};

const Content = (props: Course)=> {
  console.log(props)

   const parts = props.course?.map((c) => {
       switch (c.name) {
            case "Fundamentals":
               return <Part key={c.name} parts={c} />;
            case "Advanced":
                return <Part key={c.name} parts={c} />;
            case "Using props to pass data":
                return <Part key={c.name} parts={c} />;
            case "Deeper type usage":
                return <Part key={c.name} parts={c} />;
            case "Backend development":
                return <Part key={c.name} parts={c} />;
            default:
                return assertNever(c);
       }
   });
   return <React.Fragment>{parts}</React.Fragment>;
}

export default Content
