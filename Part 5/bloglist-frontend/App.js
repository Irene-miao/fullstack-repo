import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const notifyWith = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      console.log(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error.response.data.error);
      notifyWith(`${error.response.data.error}`, "error");
    }
  };

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  );

  const removeUser = () => {
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      await blogService.create(blogObject);
      blogService.setToken(user.token).then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        notifyWith(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
        );
      });
    } catch (error) {
      console.log(error.response.data.error);
      notifyWith(`${error.response.data.error} `, "error");
    }
  };

  const updateBlog = async (blogObject) => {
    console.log(blogObject.id);
    try {
      const updatedBlog = await blogService.update(blogObject.id, {
        user: blogObject.user,
        likes: blogObject.likes,
        author: blogObject.author,
        title: blogObject.title,
        url: blogObject.url,
      });
      blogService.setToken(user.token);
      setBlogs(blogs.concat(updatedBlog));
    } catch (error) {
      console.log(error);
      notifyWith(`${error.response.data.error} `, "error");
    }
  };

  const deleteBlog =  async (blogObject) => {
    console.log(blogObject);

    try {
      await blogService
      .remove(blogObject.id)
      blogService.setToken(user.token)

        const ok = window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author} `)
        if (ok) {
        notifyWith(`Deleted blog ${blogObject.title} by ${blogObject.author}`)
          setBlogs(blogs.filter((blog) => blog.id !== blogObject.id));
        } 
      } catch (error) {
        console.log(error);
        notifyWith(`${error.response.data.error} `, "error");
      }
    }
  
     
    
  const blogsSort = blogs.sort((first, second) => second.likes - first.likes);

  console.log(blogsSort);

  const blogFormRef = useRef();

  return (
    <div>
      <h1>blogs</h1>
      <div>
        <Notification notification={notification} />
      </div>

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={() => removeUser()}>logout</button>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>

          <br></br>
          <div>
            {blogsSort.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
