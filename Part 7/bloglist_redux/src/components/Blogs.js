import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import { create } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

const Blogs = () => {
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const blogsSort = blogs.sort((a,b) => b.likes - a.likes)
  console.log(user)
  console.log(blogs)
  console.log(blogsSort)
  const userBlogs = blogsSort.filter((blog) => blog.data?.user[0]?.username === user.username)
  console.log(userBlogs)
  const dispatch = useDispatch()
  const addBlog = async (blogObject) => {

    try {
      blogFormRef.current.toggleVisibility()
      dispatch(create(blogObject))
      dispatch(notify( `a new blog ${blogObject.title} by ${blogObject.author} added`, 5))
    } catch (error) {
      dispatch(notify(`${error} `, 'error', 5))
    }
  }


  const blogFormRef = useRef()

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {userBlogs.map((blog) =>
        <div key={blog.data?.id} className='contact'>
          <p><Link to={`/blogs/${blog.data?.id}`}>{blog.data?.title}</Link></p>
        </div>
      )}
    </div>
  )
}

export default Blogs

