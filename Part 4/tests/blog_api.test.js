const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach( async () => {
await Blog.deleteMany({})

let blogObject = new Blog(helper.initialBlogs[0])
await blogObject.save()

blogObject = new Blog(helper.initialBlogs[1])
await blogObject.save()
})


test('return correct number of blog posts as json', async () => {
 await api
 .get('/api/blogs')
 .expect(200)
 .expect('Content-Type', /application\/json/)

 const response = await api.get('/api/blogs')

 expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test.only('unique identifier property of blog posts is named id', async () => {
    const blogs = await api.get('/api/blogs')
    const firstBlog = blogs.body[0]
    console.log(firstBlog)

    expect(firstBlog.id).toBeDefined()
})

afterAll(() => {
    mongoose.connection.close()
})