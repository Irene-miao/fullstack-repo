import React from 'react'

const AnecdoteForm = ({onSubmit}) => {
    return (
        <div>
           <h2>create new anecdote</h2>
      <form onSubmit={onSubmit}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form> 
        </div>
    )
}

export default AnecdoteForm
