// Event handlers of routes are called controllers

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
   const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))  
})

blogsRouter.post('/', (request, response, next) => {
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

    blog
    .save()
    .then(savedBlog => {
return savedBlog.toJSON()
    })
    .then(savedAndFormattedBlog => {
      response.json(savedAndFormattedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter