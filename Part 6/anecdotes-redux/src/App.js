import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
 console.log(anecdotes)
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
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
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App