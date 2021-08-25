import React from "react";

const BlogForm = ({
    onSubmit,
    title,
    changeTitle,
    author,
    changeAuthor,
    url,
    changeUrl,
    likes,
    changeLikes
 }) => {
  return (
    <div>
      <h3>Create New Blog</h3>
      <form onSubmit={onSubmit}>
        <div>
          title:
          <input value={title} onChange={changeTitle} />
        </div>
        <div>
          author:
          <input value={author} onChange={changeAuthor} />
        </div>
        <div>
          url:
          <input value={url} onChange={changeUrl} />
        </div>
        <div>
          likes:
          <input value={likes} onChange={changeLikes} />
        </div>
        <br></br>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
