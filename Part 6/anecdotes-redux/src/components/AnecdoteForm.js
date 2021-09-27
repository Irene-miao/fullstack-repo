import React from 'react'
import { createAnecdote } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer"
import { connect } from "react-redux";



const AnecdoteForm = (props) => {
    

    const create = async (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        console.log(content);
        event.target.anecdote.value = "";
        props.createAnecdote(content);
        props.notify(`new anecdote '${content}'`, 5000)
      };

    return (
        <div>
           <h2>create new anecdote</h2>
      <form onSubmit={create}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form> 
        </div>
    )
}

export default connect(
  null,
  {createAnecdote, notify},
  )(AnecdoteForm)
