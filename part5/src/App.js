import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LoggedInView from './components/LoggedInView'
import blogService from './services/blogs'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null) 

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
      <Notification message={errorMessage} />
      {user === null ?
         <LoginForm setUser={setUser}
                    setErrorMessage={setErrorMessage} />
                    :
        <LoggedInView user={user}/>
      }
    </div>
    )
}

export default App
