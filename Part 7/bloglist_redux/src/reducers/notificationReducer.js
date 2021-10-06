const notificationReducer = (state = null, action) => {
  console.log('STATE NOW:', state)
  console.log('ACTION:', action)
  switch (action.type) {
  case 'NEW_MESSAGE':
    return action.data
  case 'REMOVE_MESSAGE':
    return state = null
  default:
    return state
  }
}

export const notify = (message) => {
  return {
    type: 'NEW_MESSAGE',
    data: {
      message,
    },
  }
}

export default notificationReducer
