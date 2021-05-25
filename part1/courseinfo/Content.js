import React from 'react';
import Part from './Part';

const Content = (props) => {
    return (
        <div>
           <Part part={props.partOne} exercise={props.exerciseOne}/>
           <Part part={props.partTwo} exercise={props.exerciseTwo}/>
           <Part part={props.partThree} exercise={props.exerciseThree}/>
        </div>
    )
}

export default Content;
