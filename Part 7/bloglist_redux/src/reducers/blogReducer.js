import blogService from '../services/blogs'

const Object = (blog) => {
  return {
    type: 'INIT_BLOGS',
    data: {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: blog.user,
    }
  }
}

const blogReducer = (state = [], action) => {
  console.log('ACTION:', action)
  console.log('STATE NOW:', state)
  switch (action.type) {
  case 'NEW_BLOG':
    console.log(action)
    return [...state, action]
  case 'INIT_BLOGS':
  {
    const blogs =  action.data
    console.log(blogs)
    const newBlogs = blogs.map(Object)
    return newBlogs
  }
  case 'UPDATE_BLOG':
  {
    const id = action.data
    console.log(id)
    const blog = state.find((blog) => blog.data?.id === id)
    console.log(blog)
    const changedBlog = {
      ...blog,  data:{
        id: blog.data?.id,
        likes: blog.data?.likes + 1,
        title: blog.data?.title,
        author: blog.data?.author,
        url: blog.data?.author,
        user: blog.data?.user
      }
    }
    return state.map((blog) => blog.data?.id === id ? changedBlog : blog)
  }
  case 'REMOVE_BLOG':
  {
    const id = action.data
    return state.filter((blog) => blog.data?.id !== id)
  }
  default:
    return state
  }
}

export const create = (blog) => {
  return async dispatch => {
    console.log(blog)
    const newBlog = await blogService.create(blog)
    console.log(newBlog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data:  blogs ,
    })
  }
}

export const updateBlog = (blog) => {
  return async (dispatch) => {
    console.log(blog)
    const data = {
      id: blog.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const updatedBlog = await blogService.update(blog.id, data)
    console.log(updatedBlog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: blog.id,
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id,
    })
  }
}


export default blogReducer