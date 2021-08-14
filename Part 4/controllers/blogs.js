// Event handlers of routes are called controllers

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

// Get all blogs
blogsRouter.get('/', async (request, response) => {
   const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1 })
  response.json(blogs.map(blog => blog.toJSON()))  
})



// Create new blog
blogsRouter.post('/', async (request, response) => {
    const body = request.body
/*if (!body.title || !body.author || !body.url) {
  response.status(400).json({ error: 'field missing' })
}*/

const decodedToken = jwt.verify(request.token, process.env.SECRET)
if (!request.token || !decodedToken) {
  return response.status(401).json({ error: 'token missing or invalid' })
}

const user = await User.findById(decodedToken.id)

    
const blog = new Blog({
  title: body.title,
  author: body.author,
  url: body.url,
  likes: body.likes,
  user: user._id
})

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

   response.json(savedBlog)
})


// Delete a blog
blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  
 
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  
  if (!request.token || !decodedToken) {
    return response.status(401).json({ error: 'Unable to delete blog due to missing token' })
  }
  const user = await User.findById(decodedToken.id)
  
  if ( blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(blog._id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'Unable to delete blog due to wrong user'})
  }
  
})


// Update a blog
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const addBlog = {
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, addBlog, { new: true})
  response.json(updatedBlog)
})

module.exports = blogsRouter