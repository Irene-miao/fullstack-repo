import React, { useState } from 'react'


const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  console.log(blog)
  console.log(user?.username)
  const [show, setShow] = useState(false)

  const hideWhenShow = { display: show ? 'none' : '' }
  const showWhenShow = { display: show ? '' : 'none' }

  const toggleShow = () => {
    setShow(!show)
  }

  const addLikes = (event) => {
    event.preventDefault()
    updateBlog({
      id: blog.id,
      user: blog.user?.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    })
  }

  const handleDelete = (event) => {
    event.preventDefault()
    deleteBlog({
      id: blog.id,
      title: blog.title,
      author: blog.author,
    })
  }

  return (
    <div className='contact'>
      <div style={hideWhenShow} className='blog'>
        {blog.title} {blog.author}
        <button id='view' onClick={toggleShow}>view</button>
      </div>
      <div style={showWhenShow} data-testid='hidden'>
        <p>
          {blog.title} {blog.author} <button onClick={toggleShow}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p className='likes'>
          {blog.likes} <button id='like' onClick={addLikes}>like</button>
        </p>
        <p>{blog.user?.username}</p>
      </div>
      { blog.user?.username === user.username ? <button onClick={handleDelete}>delete</button> : null }

    </div>
  )
}

export default Blog
