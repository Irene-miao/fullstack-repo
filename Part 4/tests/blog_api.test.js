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

test('unique identifier property of blog posts is named id', async () => {
    const blogs = await api.get('/api/blogs')
    const firstBlog = blogs.body[0]
    console.log(firstBlog)

    expect(firstBlog.id).toBeDefined()
})

test.only('a valid blog can be created', async () => {
const newBlog = {
    title: 'Friday',
    author: 'Cotton',
    url: 'https://en.wikipedia.org/wiki/cotton',
    likes: 2,
}

await api
.post('/api/blogs')
.send(newBlog)
.expect(200)
.expect('Content-Type', /application\/json/)

const blogsAtEnd = await helper.blogsInDb()
expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
console.log(blogsAtEnd)
const latestBlog = blogsAtEnd.slice(-1)
const blog = Object.assign({}, ...latestBlog)
delete blog.id
console.log(blog)
expect(blog).toEqual(newBlog)

})

afterAll(() => {
    mongoose.connection.close()
})