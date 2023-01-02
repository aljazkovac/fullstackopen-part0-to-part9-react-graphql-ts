import loginService from '../services/login'
import blogService from '../services/blogs'
import { useState } from 'react'

const LoginForm = ({setUser, setErrorMessage}) => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

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
  return(
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
}

export default LoginForm