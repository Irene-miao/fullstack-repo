// Event handlers of routes are called controllers

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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

const users = await User.find({})
const user = users[1]
console.log(user._id)
    
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
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
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