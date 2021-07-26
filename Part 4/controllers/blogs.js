// Event handlers of routes are called controllers

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
    .find({})
    .then(blogs => {
      if (blogs) {
        response.json(blogs)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
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