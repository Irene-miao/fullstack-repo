import React from 'react';

const Statistic = (props) => {
    return (
        <div>
             <p>{props.text} &nbsp; {props.value}</p>
        </div>
    )
}

export default Statistic;
