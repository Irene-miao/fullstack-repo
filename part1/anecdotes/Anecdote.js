import React from 'react';

const Anecdote = (props) => {
    return (
        <div>
           <h1>{props.title}</h1> 
           <p>{props.phrase}</p>
           <p>has {props.vote} votes</p>
        </div>
    )
}

export default Anecdote;
