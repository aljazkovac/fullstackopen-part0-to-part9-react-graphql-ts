import React, { useState, useEffect } from 'react'
import './index.css'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LoggedInView from './components/LoggedInView'
import blogService from './services/blogs'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'

const App = () => {
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null) 
  const [error, setError] = useState(true)
  const [blogs, setBlogs] = useState([])
  const [cancel, setCancel] = useState(false)

  useEffect(() => {
    blogService.getAll().then(initialBlogs =>
    setBlogs( initialBlogs )
    )  
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log('User', user)
    }
  }, [])

  return (
    <div>
      <h2>The Blogosphere</h2>
      <Notification message={message} error={error} />
      {user === null ?
        <Togglable buttonLabel='login' cancel={cancel} setCancel={setCancel} >
          <LoginForm cancel={cancel} setUser={setUser} setMessage={setMessage} setError={setError} />
        </Togglable>
        :
        <LoggedInView cancel={cancel} setCancel={setCancel} user={user} blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} setError={setError}/>
      }
      <h3>All blogs(title, author, likes)</h3>
      <BlogList blogs={blogs} />
      </div>
    )
}

export default App
