import { useState, useEffect } from 'react'
import './index.css'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LoggedInView from './components/LoggedInView'
import blogService from './services/blogs'

const App = () => {
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null) 
  const [error, setError] = useState(true)

  useEffect(() => {
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
         <LoginForm setUser={setUser}
                    setMessage={setMessage} 
                    setError={setError}
                    />
                    :
        <LoggedInView user={user} setMessage={setMessage}/>
      }
    </div>
    )
}

export default App
