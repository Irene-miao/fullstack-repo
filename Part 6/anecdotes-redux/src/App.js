import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, voteOf } from './reducers/anecdoteReducer'



const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const create = (event) => {
event.preventDefault()
const content = event.target.anecdote.value
console.log(content)
event.target.anecdote.value = ''
dispatch(createAnecdote(content))
  }

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteOf(id))
  }

 const anecdoteSort = anecdotes.sort((first, second) => second.data.votes - first.data.votes)

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
      <h2>create new anecdote</h2>
      <form onSubmit={create}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App