// Event handlers of routes are called controllers

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
   const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))  
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
/*if (!body.title || !body.author || !body.url) {
  response.status(400).json({ error: 'field missing' })
}*/
    
const blog = new Blog({
  title: body.title,
  author: body.author,
  url: body.url,
  likes: body.likes,
})

    const savedBlog = await blog.save()
   response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

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