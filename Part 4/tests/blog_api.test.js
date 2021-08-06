const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

describe("blog posts", () => {
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

  test.only('return status code 400 for missing title and url properties', async () => {
    const newBlog = {
        url: "https://en.wikipedia.org/wiki/black_pepper",
        likes: 2,
      };

await api
.post('/api/blogs')
.send(newBlog)
.expect(400)

  })

});

afterAll(() => {
  mongoose.connection.close();
});
