import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      console.log(user)
      setUsername("");
      setPassword("");
    } catch (e) {
      setErrorMessage(e);
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

  return (
    <div>
      <h1>blogs</h1>
      <div>{errorMessage}</div>

{ user === null ?
loginForm() : 
<div>
  <p>{user.name} logged in</p>
{blogs.map((blog) => (
  <Blog key={blog.id} blog={blog} />
))}
</div>
}
     
    </div>
  );
};

export default App;
