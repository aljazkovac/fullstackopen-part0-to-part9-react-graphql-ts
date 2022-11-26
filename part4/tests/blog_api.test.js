const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  // const blogObjects = helper.initialBlogs
  // .map(blog => new Blog(blog))
  // const promiseArray = blogObjects.map(blog => blog.save())
  // await Promise.all(promiseArray)
})

describe('general checks', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 100000)
})

describe('viewing a specific blog', () => {
  test('the first blog is about React patterns', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].title).toBe('React patterns')
  }, 100000)

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
      'Go To Statement Considered Harmful'
    )}, 100000)

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
    expect(resultBlog.body).toEqual(processedBlogToView)}, 100000)
})

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'The greatest blog ever',
      author: 'The greatest blogger',
      url: 'https://greatestblogtest.com',
      likes: 1000000
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain(
      'The greatest blog ever'
    )}, 100000)

  test('blog without a title is not added', async () => {
    const newBlog = {
      author: 'The greatest blogger',
      url: 'https://greatestblogtest.com',
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(500)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)}, 100000)

  test('blog without a url is not added', async () => {
    const newBlog = {
      author: 'The greatest blogger',
      title: 'The greatest blog ever',
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(500)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)}, 100000)
})

describe('delete and update a blog', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )
    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)}, 100000)
})

test('a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  blogToUpdate.likes = 999
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  console.log(blogsAtEnd)
  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length
  )
  expect(blogsAtEnd[0].likes).toBe(999)}, 100000)

describe('validating a blog', () => {
  test('a blog has the unique identifier id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]
    expect(blogToView.id).toBeDefined()}, 100000)

  test('a blog without the likes property defaults to 0 likes', async () => {
    const newBlog = {
      title: 'A blog without the likes property',
      author: 'An author without a name',
      url: 'https://blogwithoutlikes.com'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
    const blogsAtEnd = await helper.blogsInDb()
    const blogToView = blogsAtEnd[blogsAtEnd.length - 1]
    expect(blogToView.likes).toBe(0)}, 100000)
})

afterAll(() => {
  mongoose.connection.close()
}, 100000)