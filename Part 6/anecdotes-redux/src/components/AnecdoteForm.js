import React from 'react'
import { createAnecdote } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux";



const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const create = async (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        console.log(content);
        event.target.anecdote.value = "";
        dispatch(createAnecdote(content));
        dispatch(notify(`new anecdote '${content}'`, 5000))
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
