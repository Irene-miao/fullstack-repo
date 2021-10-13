import commentService from '../services/comments'


const commentReducer = (state = [], action) => {
  console.log('ACTION:', action)
  console.log('STATE NOW:', state)
  switch (action.type) {
  case 'NEW_COMMENT':
    console.log(action)
    return [...state, action]
  case 'INIT_COMMENTS':
  {
    const comments =  action
    console.log(comments)
    return comments
  }
  default:
    return state
  }
}

/*export const create = (content) => {
  return async dispatch => {
    console.log(content)
    const newComment = await commentService.create(content)
    console.log(newComment)
    dispatch({
      type: 'NEW_COMMENT',
      data: newComment,
    })
  }
}*/

export const initComments = (id) => {
  return async dispatch => {
    const comment = await commentService.getAll(id)
    console.log(comment)
    dispatch({
      type: 'INIT_COMMENTS',
      data: {
        id: comment.id,
        title: comment.title,
        author: comment.author,
        url: comment.url,
        likes: comment.likes,
        user: comment.user,
        comments: comment.comments
      },
    })
  }
}

export default commentReducer