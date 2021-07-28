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


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}