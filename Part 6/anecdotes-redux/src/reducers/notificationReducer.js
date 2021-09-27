const reducer = (state = '', action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "NOTIFY": {
      const content = action.data.content;
      const time = action.data.time;
     if (!state) {
      clearTimeout(action.data.timer)
      return [...state, content]
     }
     return action.data 
    
      
      
    }
    default:
      return state = ''
  }
};

export const notify = (content, time) => {
  return async (dispatch) => {
    dispatch({
      type: "NOTIFY",
      data: { 
        content, 
        timer: setTimeout((state) => {
          state = ''
        }, time )},
})
  }
}


export default reducer;
