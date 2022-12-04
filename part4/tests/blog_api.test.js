const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
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
    const user = {
      username: 'root',
      password: 'superpassword'
    }
    const response = await api
      .post('/api/login')
      .send(user)
      .expect(200)
    const token = response.body.token
    const newBlog = {
      title: 'The greatest blog ever',
      author: 'The greatest blogger',
      url: 'https://greatestblogtest.com',
      likes: 1000000,
      userId: user.id
    }
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
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
    const user = {
      username: 'root',
      password: 'superpassword'
    }
    const response = await api
      .post('/api/login')
      .send(user)
      .expect(200)
    const token = response.body.token
    const newBlog = {
      title: 'A blog without the likes property',
      author: 'An author without a name',
      url: 'https://blogwithoutlikes.com',
      userId: (await helper.usersInDb()).at(0).id
    }
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(newBlog)
      .expect(201)
    const blogsAtEnd = await helper.blogsInDb()
    const blogToView = blogsAtEnd[blogsAtEnd.length - 1]
    expect(blogToView.likes).toBe(0)}, 100000)
})

describe('when there is initially only one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('superpassword', 10)
    const user = new User({ username: 'root', name: 'superuser', passwordHash })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'azi',
      name: 'Aljaz Kovac',
      password: 'topsecret',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'root',
      name: 'Superuser',
      passwordHash: 'salainen',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails if password too short', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'testUser',
      name: 'testUserPassword',
      password: 'ps',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be at least 3 characters long')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(() => {
  mongoose.connection.close()
}, 100000)