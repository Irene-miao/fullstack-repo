import React from 'react'
import { voteOf } from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => state);

    const dispatch = useDispatch();
    
    const vote = (id) => {
        console.log("vote", id);
        dispatch(voteOf(id));
      };

    const anecdoteSort = anecdotes.sort(
        (first, second) => second.data.votes - first.data.votes
      );

    return (
        <div>
           <h2>Anecdotes</h2>
      {anecdoteSort.map(anecdote =>
        <div key={anecdote.data?.id}>
          <div>
            {anecdote.data?.content}
          </div>
          <div>
            has {anecdote.data?.votes}
            <button onClick={() => vote(anecdote.data?.id)}>vote</button>
          </div> 
        </div>
    )}
    </div>
    )}

export default AnecdoteList
