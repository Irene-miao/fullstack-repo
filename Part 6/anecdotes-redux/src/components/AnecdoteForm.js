import React from 'react'
import { createAnecdote } from "../reducers/anecdoteReducer";
import { notifyWith } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux";

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const create = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        console.log(content);
        event.target.anecdote.value = "";
        dispatch(createAnecdote(content));
        dispatch(notifyWith(content))
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

export default AnecdoteForm
