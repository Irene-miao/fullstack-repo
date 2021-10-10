import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
//import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import { initBlogs, create } from './reducers/blogReducer'
import { notify } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import User from './components/User'



const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)


  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      await blogService.setToken(user.token)
      dispatch(setUser(user))
      console.log(user)
      setUsername('')
      setPassword('')
      dispatch(notify(`${user.name} successfully logged in`, 5))
    } catch (error) {
      dispatch(notify(`${error.response.data.error}`, 'error', 5))
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel="login to application">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const removeUser = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }

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
    <Router>
      <div>
        <h1>Blogs</h1>
        <div>
          <Notification  />
        </div>

        {user === null ? (
          loginForm()
        ) : (
          <div>
            <p>{user.name} logged in</p>
            <button id='logout' onClick={() => removeUser()}>logout</button>
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
              <BlogForm createBlog={addBlog} />
            </Togglable>
          </div>
        )}
      </div>
      <br></br>
      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
      </Switch>
    </Router>
  )
}

export default App