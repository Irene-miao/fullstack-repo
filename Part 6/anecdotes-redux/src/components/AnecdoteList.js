import React from 'react'
import { voteOf } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer"
import { useSelector, useDispatch } from "react-redux";


const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
      if ( state.filter === '') {
        console.log(state.anecdotes)
        return state.anecdotes
      } else {
        console.log(state.filter)
        const value = state.filter
       const all = state.anecdotes
       return all.filter((a) => a.data?.content.toLowerCase().includes(value.toLowerCase()))
      
    }});

    const dispatch = useDispatch();
    
    const vote = (data) => {
        console.log("vote", data?.id);
        dispatch(voteOf(data));
        dispatch(notify(`you voted '${data?.content}'`, 5000))
      };

    const anecdoteSort = anecdotes.sort(
        (first, second) => second.data?.votes - first.data?.votes
      );

    return (
        <div>
      {anecdoteSort.map(anecdote =>
        <div key={anecdote.data?.id}>
          <div>
            {anecdote.data?.content}
          </div>
          <div>
            has {anecdote.data?.votes}
            <button onClick={() => vote(anecdote.data)}>vote</button>
          </div> 
        </div>
    )}
    </div>
    )}

export default AnecdoteList
