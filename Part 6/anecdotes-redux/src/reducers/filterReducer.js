

const reducer = (state = '', action) => {
    
    console.log("state now: ", state);
    console.log("action", action);
    switch (action.type) {
        case "FILTER": {
            return action.data.value
        }
        default:
            return state;
    }
    
}


export const filter = (value) => {
    return {
      type: 'FILTER',
      data: { value },
    }
  }


export default reducer;