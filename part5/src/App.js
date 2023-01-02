import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LoggedInView from './components/LoggedInView'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null) 
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log('User', user)
    }
  }, [])

  const handleLogin = async (event) => {
      event.preventDefault()
      console.log('Logging in with', username, password)
      try {
          const user = await loginService.login({
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
  return (
    <div>
      <h2>The Blogosphere</h2>
      <Notification message={errorMessage} />
      {user === null ?
         <LoginForm username={username} 
                    password={password}
                    onSubmit={handleLogin}
                    setUsername={setUsername}
                    setPassword={setPassword} />
                    :
        <LoggedInView user={user}/>
      }
    </div>
    )
}

export default App
