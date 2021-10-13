import commentService from '../services/comments'


const commentReducer = (state = [], action) => {
  console.log('ACTION:', action)
  console.log('STATE NOW:', state)
  switch (action.type) {
  case 'NEW_COMMENT':
    console.log(action)
    return [...state.data?.comments, {
      content: action.data?.content,
      id: action.data?.id
    }]
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

export const create = (blog, content) => {
  return async dispatch => {
    console.log(blog)
    const newComment = await commentService.create(blog.data?.id, content)
    console.log(newComment)
    dispatch({
      type: 'NEW_COMMENT',
      data: newComment,
    })
  }
}

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