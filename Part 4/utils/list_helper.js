const find = require('lodash/fp/find')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
      return sum + item
  }

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(item => item.likes)
    console.log(likes)
    const maxLikes = Math.max(...likes)
    console.log(maxLikes)
    const mostLikes = blogs.filter(item => item.likes === maxLikes)
    const objLikes = Object.assign({}, ...mostLikes)
    console.log(objLikes)
    return objLikes
}

const mostBlogs = (blogs) => {
   const convert = (blogs) => {
       const res = {}
       blogs.forEach((item) => {
           const key = item.author
           if (!res[key]) {
               res[key] = {author: key, blogs: 0}
           }
           res[key].blogs += 1
       })
       return Object.values(res)
   }
    console.log(convert(blogs))
    return convert(blogs)
}

const mostLikes = (blogs) => {
 const maxLikes = Math.max(...blogs.map(item => item.likes))
 console.log(maxLikes)
 const findLikes = blogs.filter(item => item.likes === maxLikes)
 console.log(findLikes)
 const match = Object.assign({}, ...findLikes)
console.log(match.author)
const author = blogs.filter(item => item.author === match.author)
 console.log(author)

    const totals = author.reduce((prevValue, currentValue) => {
return {
author: prevValue.author,
likes: prevValue.likes + currentValue.likes
}
    })
    console.log(totals)
    return totals
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs, 
    mostLikes
}