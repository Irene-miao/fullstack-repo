

const reducer = (state = '', action) => {
    
    console.log("state now: ", state);
    console.log("action", action);
    switch (action.type) {
        case "NOTIFY": {
            const content = action.data.content
            const message =  `you voted '${content}'`
            return [...state, message]
        }
        case "NOTIFYWITH": {
            const content = action.data.content;
            const message = `you create a anecdote '${content}'`
            return [...state, message]
        }
        default:
            return state = '';
    }
        
}

export const notify = (content) => {
    return {
      type: 'NOTIFY',
      data: { content }
    }
  }

  export const notifyWith = (content) => {
    return {
      type: 'NOTIFYWITH',
      data: { content }
    }
  }

export default reducer;