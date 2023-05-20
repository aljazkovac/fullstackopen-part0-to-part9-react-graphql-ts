import loginService from '../services/login'
import blogService from '../services/blogs'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
    userLoginSuccess,
    userLoginError,
} from '../reducers/notificationReducer'
import PropTypes from 'prop-types'

const LoginForm = ({ cancel, setUser, setError }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        setUsername('')
        setPassword('')
    }, [cancel])

    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('Logging in with', username, password)
        try {
            const user = await loginService.login({
                username,
                password,
            })
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            dispatch(userLoginSuccess(user.username, 5))
            setError(false)
        } catch (exception) {
            dispatch(userLoginError(5))
            setError(true)
        }
    }
    return (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                    id="username-input"
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                    id="password-input"
                />
            </div>
            <button id="login-button" type="submit">
                login
            </button>
        </form>
    )
}

LoginForm.propTypes = {
    cancel: PropTypes.bool.isRequired,
    setUser: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
}

export default LoginForm
