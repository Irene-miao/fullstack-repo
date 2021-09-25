const reducer = (state = '', action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "NOTIFY": {
      const content = action.data.content;
      const time = action.data.time;
      if ( state === '') {
        return [...state, content]
      } 
      return setTimeout(() => {
          state = ''
        }, time)
    }
    default:
      return state = ''
  }
};

export const notify = (content, time) => {
  return async (dispatch) => {
    

    dispatch({
      type: "NOTIFY",
      data: { content, time },
})
  }
}


export default reducer;
