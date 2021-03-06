import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url ,
      likes: likes,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')
  }

  return (
    <div>
      <h3>Create New Blog</h3>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input id='title' value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author:
          <input id='author' value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url:
          <input id='url' value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <div>
          likes:
          <input id='likes' value={likes} onChange={({ target }) => setLikes(target.value)} />
        </div>
        <br></br>
        <div>
          <button id='create-button' type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
