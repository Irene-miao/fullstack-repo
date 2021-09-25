import anecdoteService from '../services/anecdotes'

const asObject = (anecdote) => {
  return {
    type: "INIT_ANECDOTES",
    data: {
      content: anecdote.content,
      id: anecdote.id,
      votes: anecdote.votes,
    }
  }
}

const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "NEW_ANECDOTE":
      return [...state, action];
    case "INIT_ANECDOTES":
      const anecdotes = action.data
      console.log(anecdotes)
return anecdotes.map(asObject)
    case "VOTE": 
      const updateAnecdote = action
      console.log(updateAnecdote)
      return state.map((anecdote) =>
      anecdote.data?.id !== action.data.id ? anecdote : updateAnecdote)
      
    default:
      return state;
  }
};

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}


export const voteOf = (data) => {
  return async dispatch => {
    console.log(data)
    const changedAnecdote = {
      
        content: data?.content,
        id: data?.id,
        votes: data?.votes + 1,
    
    }
    console.log(changedAnecdote)
    const returnAnecdote = await anecdoteService.update(changedAnecdote) 
    dispatch({
      type: 'VOTE',
      data: returnAnecdote,
    })
  }
}

export default reducer;
