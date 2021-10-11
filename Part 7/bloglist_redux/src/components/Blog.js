import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog  } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Blog = () => {
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const blogsSort = blogs.sort((a,b) => b.likes - a.likes)
  const id = useParams().id
  const dispatch = useDispatch()
  const blog = blogsSort.find(b => b.data?.id === id)
  console.log(id)
  console.log(blogs)
  console.log(blogsSort)
  console.log(user)
  console.log(blog)
  if (!blogs || !user || !id ) {
    return null
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



  return (
    <div>
      <h2>
        {blog.data?.title} {blog.data?.author}
      </h2>
      <p><a href={`${blog.data.url}`}>{blog.data?.url}</a></p>
      <p className='likes'>
        {blog.data?.likes} <Button size='sm' id='like' onClick={addLikes}>like</Button>
      </p>
      <p>added by {blog.data?.user[0]?.username}</p>
    </div>
  )
}

export default Blog