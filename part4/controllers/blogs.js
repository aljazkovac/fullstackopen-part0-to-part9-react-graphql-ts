const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('userId', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    userId: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const requestToken = request.token
  const blog = await Blog.findById(request.params.id)
  const blogCreator = blog.userId

  const decodedToken = jwt.decode(requestToken)
  const userIdFromDecodedToken = decodedToken.id

  if(blogCreator.toHexString() === userIdFromDecodedToken.toString()) {
    await Blog
      .findByIdAndRemove(request.params.id)
    // Remove the blog reference from the user's blogs array
    // Do not forget to await here!
    let user = await User.findById(blogCreator.toHexString())
    let userBlogs = user.blogs
    let blogToRemoveIdx = userBlogs.indexOf(request.params.id)
    userBlogs.splice(blogToRemoveIdx, 1)
    await User.updateOne({ name: user.name }, { blogs: userBlogs })
    response.status(204).end()
  }
  else {
    response.status(401).end()
  }
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogRouter