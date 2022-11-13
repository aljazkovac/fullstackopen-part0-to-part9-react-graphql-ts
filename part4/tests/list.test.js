const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }]

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the like of that', () => {
    const blogsSlice = blogs.slice(0, 1)
    const result = listHelper.totalLikes(blogsSlice)
    expect(result).toBe(7)
  })
  test('two blogs, sum their likes', () => {
    const blogsSlice = blogs.slice(0, 2)
    const result = listHelper.totalLikes(blogsSlice)
    expect(result).toBe(12)
  })
  test('three blogs, sum their likes', () => {
    const blogsSlice = blogs.slice(0, 3)
    const result = listHelper.totalLikes(blogsSlice)
    expect(result).toBe(24)
  })
  test('four blogs, sum their likes', () => {
    const blogsSlice = blogs.slice(0, 4)
    const result = listHelper.totalLikes(blogsSlice)
    expect(result).toBe(34)
  })
  test('five blogs, sum their likes', () => {
    const blogsSlice = blogs.slice(0, 5)
    const result = listHelper.totalLikes(blogsSlice)
    expect(result).toBe(34)
  })
  test('six blogs, sum their likes', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})
describe('favorite blog', () => {
  test('when list has only one blog, equals that blog', () => {
    const blogsSlice = blogs.slice(0, 1)
    const result = listHelper.favoriteBlog(blogsSlice)
    expect(result).toEqual(blogs[0])
  })
  test('two blogs, return the one with most likes', () => {
    const blogsSlice = blogs.slice(0, 2)
    const result = listHelper.favoriteBlog(blogsSlice)
    expect(result).toEqual(blogs[0])
  })
  test('three blogs, return the one with most likes', () => {
    const blogsSlice = blogs.slice(0, 3)
    const result = listHelper.favoriteBlog(blogsSlice)
    expect(result).toEqual(blogs[2])
  })
  test('four blogs, return the one with most likes', () => {
    const blogsSlice = blogs.slice(0, 4)
    const result = listHelper.favoriteBlog(blogsSlice)
    expect(result).toEqual(blogs[2])
  })
  test('five blogs, return the one with most likes', () => {
    const blogsSlice = blogs.slice(0, 5)
    const result = listHelper.favoriteBlog(blogsSlice)
    expect(result).toEqual(blogs[2])
  })
  test('six blogs, return the one with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })
})
describe('most blogs', () => {
  test('when list has only one blog, equals that author', () => {
    const blogsSlice = blogs.slice(0, 1)
    const result = listHelper.mostBlogs(blogsSlice)
    expect(result).toEqual({ author: 'Michael Chan', blogs: 1 })
  })
  test('two blogs, return the author with most blogs', () => {
    const blogsSlice = blogs.slice(0, 2)
    const result = listHelper.mostBlogs(blogsSlice)
    const possibleResults = [ { author: 'Michael Chan', blogs: 1 }, { author: 'Edsger W. Dijkstra', blogs: 1 } ]
    expect(possibleResults).toContainEqual(result)
  })
  test('three blogs, return the author with most blogs', () => {
    const blogsSlice = blogs.slice(0, 3)
    const result = listHelper.mostBlogs(blogsSlice)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 2 })
  })
  test('four blogs, return the author with most blogs', () => {
    const blogsSlice = blogs.slice(0, 4)
    const result = listHelper.mostBlogs(blogsSlice)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 2 })
  })
  test('five blogs, return the author with most blogs', () => {
    const blogsSlice = blogs.slice(0, 5)
    const result = listHelper.mostBlogs(blogsSlice)
    const possibleResults = [ { author: 'Edsger W. Dijkstra', blogs: 2 }, { author: 'Robert C. Martin', blogs: 2 } ]
    expect(possibleResults).toContainEqual(result)
  })
  test('six blogs, return the author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('most likes', () => {
  test('when list has only one blog, equals that author', () => {
    const blogsSlice = blogs.slice(0, 1)
    const result = listHelper.mostLikes(blogsSlice)
    expect(result).toEqual({ author: 'Michael Chan', likes: 7 })
  })
  test('two blogs, return the author with most likes', () => {
    const blogsSlice = blogs.slice(0, 2)
    const result = listHelper.mostLikes(blogsSlice)
    expect(result).toEqual({ author: 'Michael Chan', likes: 7 })
  })
  test('three blogs, return the author with most likes', () => {
    const blogsSlice = blogs.slice(0, 3)
    const result = listHelper.mostLikes(blogsSlice)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
  test('four blogs, return the author with most likes', () => {
    const blogsSlice = blogs.slice(0, 4)
    const result = listHelper.mostLikes(blogsSlice)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
  test('five blogs, return the author with most likes', () => {
    const blogsSlice = blogs.slice(0, 5)
    const result = listHelper.mostLikes(blogsSlice)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
  test('six blogs, return the author with most likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
})