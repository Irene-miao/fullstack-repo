import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, updateBlog  } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const user = useSelector(state => state.user)
  console.log(blog)
  console.log(user)
  const [show, setShow] = useState(false)

  const hideWhenShow = { display: show ? 'none' : '' }
  const showWhenShow = { display: show ? '' : 'none' }
  const dispatch = useDispatch()

  const toggleShow = () => {
    setShow(!show)
  }

  const addLikes = (event) => {
    event.preventDefault()
    try {
      const blogToChange = {
        id: blog.data?.id,
        user: blog.data?.user,
        title: blog.data?.title,
        author: blog.data?.author,
        url: blog.data?.url,
        likes: blog.data?.likes,
      }
      dispatch(updateBlog(blogToChange))
      dispatch(notify( `Updated the blog ${blog.data?.title} by ${blog.data?.author} added`, 5))
    } catch (error) {
      dispatch(notify(`${error} `, 'error', 5))
    }
  }

  const handleDelete = (event) => {
    event.preventDefault()
    try {
      const ok = window.confirm(`Remove blog ${blog.data?.title} by ${blog.data?.author} `)
      if (ok) {
        dispatch(deleteBlog(blog.data?.id))
        dispatch(notify(`Deleted blog ${blog.data?.title} by ${blog.data?.author}`, 5))
      }
    } catch (error) {
      console.log(error)
      dispatch(notify(`${error.response.data.error} `, 'error', 5))
    }
  }


  return (
    <div className='contact'>
      <div style={hideWhenShow} className='blog'>
        {blog.data?.title} {blog.data?.author}
        <button id='view' onClick={toggleShow}>view</button>
      </div>
      <div style={showWhenShow} data-testid='hidden'>
        <p>
          {blog.data?.title} {blog.data?.author} <button onClick={toggleShow}>hide</button>
        </p>
        <p>{blog.data?.url}</p>
        <p className='likes'>
          {blog.data?.likes} <button id='like' onClick={addLikes}>like</button>
        </p>
        <p>{blog.data?.user[0]?.username}</p>
      </div>
      { blog.data?.user[0]?.username === user.username ? <button onClick={handleDelete}>delete</button> : null }

    </div>
  )
}

export default Blog