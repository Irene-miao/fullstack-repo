import React, { useState } from "react";

const blogStyle = {
  padding: 10,
  border: "solid",
  borderWidth: 1,
};

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  console.log(blog);
  const [show, setShow] = useState(false);

  const hideWhenShow = { display: show ? "none" : "" };
  const showWhenShow = { display: show ? "" : "none" };

  const toggleShow = () => {
    setShow(!show);
  };

  const addLikes = (event) => {
    event.preventDefault();
    updateBlog({
      id: blog.id,
      user: blog.user[0].id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    });
    };

    const handleDelete = (event) => {
event.preventDefault()
deleteBlog({
  id: blog.id,
  title: blog.title,
  author: blog.author,
})
    }

  return (
    <div style={blogStyle}>
      <div style={hideWhenShow}>
        {blog.title} {blog.author}
        <button onClick={toggleShow}>view</button>
      </div>
      <div style={showWhenShow}>
        <p>
          {blog.title} {blog.author} <button onClick={toggleShow}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>
          {blog.likes} <button onClick={addLikes}>like</button>
        </p>
        <p>{blog.user[0].username}</p>
      </div>
      <button onClick={handleDelete}>delete</button>
    </div>
  );
};

export default Blog;
