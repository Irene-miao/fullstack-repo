import React from 'react'
import { voteOf } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer"
import { useSelector, useDispatch } from "react-redux";


const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
      if ( state.filter === '') {
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
        dispatch(voteOf(data?.id));
        dispatch(notify(data?.content))
      };

    /*const anecdoteSort = anecdotes.sort(
        (first, second) => second.data?.votes - first.data?.votes
      );*/

    return (
        <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.data?.id}>
          <div>
            {anecdote.data?.content}
          </div>
          <div>
            has {anecdote.data?.votes}
            <button onClick={() => vote(anecdote?.data)}>vote</button>
          </div> 
        </div>
    )}
    </div>
    )}

export default AnecdoteList
