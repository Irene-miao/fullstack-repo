import React from 'react';
import Content from './Content';

const Header = ({course}) => {
    return (
        <div>
            <h1>{course.name}</h1>
           <Content course={course}/> 
        </div>
    )
}

export default Header;
