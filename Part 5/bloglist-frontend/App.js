import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, type='success') => {
    setNotification({message, type})
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user);
      console.log(user)
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error.response.data.error)
      notifyWith(`${error.response.data.error}`, 'error');
    }
  };

  const loginForm = () => (
    <div>
      <h3>Log in to application</h3>
<form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
    </div>
  );

  const removeUser = () => {
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addBlog = async (event) => {
event.preventDefault()
try {
   const blog = await blogService.create({
    title,
    author,
    url,
    likes,
  });
  blogService.setToken(user.token)
  notifyWith(`a new blog ${blog.title} by ${blog.author} added`)
  setTitle("");
  setAuthor("");
  setUrl("");
  setLikes("");
} catch (error) {
  console.log(error.response.data.error)
  notifyWith(`${error.response.data.error} `, 'error');
}

  }

  return (
    <div>
      <h1>blogs</h1>
      <div>
        <Notification notification={notification} />
      </div>

{ user === null ?
loginForm() : 
<div>
  <p>{user.name} logged in</p> 
  <button onClick={() => removeUser()}>logout</button>
  <BlogForm
  onSubmit={addBlog}
  value={title}
  onChange={({ target }) => setTitle(target.value)}
  valueA={author}
  onChangeA={({ target }) => setAuthor(target.value)}
  valueU={url}
  onChangeU={({ target }) => setUrl(target.value)}
  valueL={likes}
  onChangeL={({ target }) => setLikes(target.value)}
  />
  <br></br>
  <div>
{blogs.map((blog) => (
  <Blog key={blog.id} blog={blog} />
))}
</div>
</div>
}
     
    </div>
  );
};

export default App;
