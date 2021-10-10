import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import { initBlogs } from './reducers/blogReducer'
import { notify } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import User from './components/User'
import Blogs from './components/Blogs'


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



  return (
    <Router>
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
        </div>
      )}
      <br></br>
      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route path="/blogs">
          <Blogs />
        </Route>
      </Switch>
    </Router>
  )
}

export default App