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
    case "VOTE": {
      const id = action.data?.id;
      const anecdoteToChange = state.find((a) => a.data?.id === id);
      console.log(anecdoteToChange)
      const changedAnecdote = {
        ...anecdoteToChange, data: {
          content: anecdoteToChange.data?.content,
          id: anecdoteToChange.data?.id,
          votes: anecdoteToChange.data?.votes + 1
        }
      };
      return state.map((anecdote) =>
        anecdote.data?.id !== id ? anecdote : changedAnecdote
      );
    }
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


export const voteOf = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default reducer;
