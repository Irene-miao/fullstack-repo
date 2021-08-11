const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);
const bcrypt = require('bcrypt')
const Blog = require("../models/blog");
const User = require("../models/user");



describe("blog posts", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
  
    let blogObject = new Blog(helper.initialBlogs[0]);
    await blogObject.save();
  
    blogObject = new Blog(helper.initialBlogs[1]);
    await blogObject.save();
  });

  test("return correct number of blog posts as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("unique identifier property of blog posts is named id", async () => {
    const blogs = await api.get("/api/blogs");
    const firstBlog = blogs.body[0];
    console.log(firstBlog);

    expect(firstBlog.id).toBeDefined();
  });
});

describe("a blog post", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
  
    let blogObject = new Blog(helper.initialBlogs[0]);
    await blogObject.save();
  
    blogObject = new Blog(helper.initialBlogs[1]);
    await blogObject.save();
  });

  test("a valid blog post can be created", async () => {
    const newBlog = {
      title: "Friday",
      author: "Cotton",
      url: "https://en.wikipedia.org/wiki/cotton",
      likes: 2,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    console.log(blogsAtEnd);
    const latestBlog = blogsAtEnd.slice(-1);
    const blog = Object.assign({}, ...latestBlog);
    delete blog.id;
    console.log(blog);
    expect(blog).toEqual(newBlog);
  });

  test("missing likes property value becomes 0", async () => {
    const newBlog = {
      title: "Thursday",
      author: "Peanut",
      url: "https://en.wikipedia.org/wiki/peanut",
    }

    await api
    .post("/api/blogs")
    .send(newBlog)

    const response = await api.get("/api/blogs");
    const body = response.body;
    const latestBlog = body.slice(-1)
    const blog = Object.assign({}, ...latestBlog)
    console.log(blog);
    const likes = blog.likes;
    console.log(likes);
    expect(likes).toBe(0);
  });

  test('return status code 400 for missing title and url properties', async () => {
    const newBlog = {
        url: "https://en.wikipedia.org/wiki/black_pepper",
        likes: 2,
      };

await api
.post('/api/blogs')
.send(newBlog)
.expect(400)

  })

  test('blog post can be deleted with valid id', async () => {
const blogsAtStart = await helper.blogsInDb()
const blogToDelete = blogsAtStart[0]

await api
.delete(`/api/blogs/${blogToDelete.id}`)
.expect(204)

const blogsAtEnd = await helper.blogsInDb()

expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

const title = blogsAtEnd.map(r => r.title)

expect(title).not.toContain(blogToDelete.title)

  })

  test('blog post can be updated with valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const addBlog = {
      url: 'https://en.wikipedia.org/wiki/garlic',
      likes: 3
    }

    await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(addBlog)
    .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    console.log(blogsAtEnd)
    const url = blogsAtEnd.map(r => r.url)
    console.log(url)
    expect(url).toContain(addBlog.url)
  })

  describe('when there is initially one user in database' , () => {
    beforeEach(async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('secret', 10)
      const user = new User({ username: 'root', passwordHash })

      await user.save()
    })

    test('create user success with fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'newUser',
        name: 'New User',
        password: 'itzsecret',
      }

      await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test.only('create user fail with proper statuscode and message if username is taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Duplicate',
        password: 'itzsecret',
      }

      const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` to be unique')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })

});

afterAll(() => {
  mongoose.connection.close();
});
