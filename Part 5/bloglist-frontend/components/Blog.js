import React, {useState} from 'react'


const blogStyle = {
  padding: 10,
  border: 'solid',
  borderWidth: 1,
  
}


const Blog = ({blog}) => {
  console.log(blog)
  const [show, setShow] = useState(false)

  const hideWhenShow = { display: show ? 'none' : ''}
  const showWhenShow = { display: show ? '' : 'none'}

  const toggleShow = () => {
setShow(!show)
  }


return (
  <div style={blogStyle}>
<div style={hideWhenShow}>
    {blog.title} {blog.author}
    <button onClick={toggleShow}>view</button>
  </div> 
  <div style={showWhenShow}>
<p>{blog.title} {blog.author} <button onClick={toggleShow}>hide</button></p> 
<p>{blog.url}</p>
<p>{blog.likes} <button>like</button></p>
<p>{blog.user[0].username}</p>
  </div>
  </div>
)
 
}
   
 


export default Blog