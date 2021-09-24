import React, { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList"
import FilterAnecdote from "./components/FilterAnecdote";
import Notification from "./components/Notification"
import anecdoteService from './services/anecdotes'
import  { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => 
    dispatch(initializeAnecdotes(anecdotes)))
  }, [dispatch])
  
  return (
    <div>
      <Notification />
      <div>
      <h2>Anecdotes</h2>
      <div>
        <FilterAnecdote />
        </div>
        <AnecdoteList />
      </div>
      <div>
        <AnecdoteForm />
      </div>
    </div>
  );
};

export default App;
