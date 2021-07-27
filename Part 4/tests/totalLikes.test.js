const listHelper = require("../utils/list_helper")

describe('totalLikes', () => {
  test("of empty list is zero", () => {
      const blogs = []

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0);
  });

  

  test("when list has only one blog equals the likes of that", () => {
    const listWithOneBlog = [
        {
          title: "Monday",
          author: "Bob",
          url: "https://www.wildlife.state.nh.us/fishing/where-fish.html",
          likes: 3,
          _id: "60fc17c702105019e089ca01",
          _v: 0
        },
      ];

      const likes = listWithOneBlog.map(item => item.likes)
      console.log(likes)
    const result = listHelper.totalLikes(likes)
    expect(result).toBe(3);
  });

  
  test("of a bigger list is calculated right", () => {
    const manyBlogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0
        }  
      ]
      const likes = manyBlogs.map(item => item.likes)
      console.log(likes)
    const result = listHelper.totalLikes(likes)
    expect(result).toBe(36)
  });
});
