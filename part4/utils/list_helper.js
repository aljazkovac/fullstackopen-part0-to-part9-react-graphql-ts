const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0
  blogs.forEach(blog => {
    total += blog.likes
  })
  return total
}

const favoriteBlog = (blogs) => {
  let favorite = blogs[0]
  blogs.forEach(blog => {
    if (blog.likes > favorite.likes) {
      favorite = blog
    }
  })
  return favorite
}

const mostBlogs = (blogs) => {
  let authors = []
  blogs.forEach(blog => {
    let author = authors.find(author => author.author === blog.author)
    if (author) {
      author.blogs += 1
    } else {
      authors.push({ author: blog.author, blogs: 1 })
    }
  })
  let most = authors[0]
  authors.forEach(author => {
    if (author.blogs > most.blogs) {
      most = author
    }
  })
  return most
}

const mostLikes = (blogs) => {
  let authors = []
  blogs.forEach(blog => {
    let author = authors.find(author => author.author === blog.author)
    if (author) {
      author.likes += blog.likes
    } else {
      authors.push({ author: blog.author, likes: blog.likes })
    }
  })
  let most = authors[0]
  authors.forEach(author => {
    if (author.likes > most.likes) {
      most = author
    }
  })
  return most
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}