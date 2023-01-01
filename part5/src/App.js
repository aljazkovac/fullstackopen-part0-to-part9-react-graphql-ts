import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import login from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState(0)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null) 

  useEffect(() => {
    blogService.getAll().then(initialBlogs =>
      setBlogs( initialBlogs )
    )  
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
      event.preventDefault()
      console.log('Logging in with', username, password)
      try {
          const user = await login.login({
          username, password,
          })
          window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
          )
          blogService.setToken(user.token)
          setUser(user)
          setUsername('')
          setPassword('')
      } catch (exception) {
          setErrorMessage('Wrong credentials')
          setTimeout(() => {
          setErrorMessage(null)
          }, 5000)
      }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      author: newAuthor,
      title: newTitle,
      url: newUrl,
      likes: newLikes,
    }
    blogService
      .create(blogObject)
      .then(returnedObject => {
        setBlogs(blogs.concat(returnedObject))
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
        setNewLikes(0)
      })
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }
  const handleLikesChange = (event) => {
    setNewLikes(event.target.value)
  }
  const blogForm = () => (
    <form onSubmit={addBlog}>
      <p>Author:</p>
      <input
        value={newAuthor}
        onChange={handleAuthorChange}
      />
      <p>Title:</p>
      <input
        value={newTitle}
        onChange={handleTitleChange}
      />
      <p>Url:</p>
      <input
        value={newUrl}
        onChange={handleUrlChange}
      />
      <p>Likes:</p>
      <input
        value={newLikes}
        onChange={handleLikesChange}
      />
      <button type='submit'>Save</button>
    </form>
  )
  return (
    <div>
      <h2>The Blogosphere</h2>
      <Notification message={errorMessage} />
      {user === null ?
        loginForm() : 
        <div>
          <p>{user.name} logged in</p>
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>}
    </div>
    )
}

export default App
