import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'

const LoginForm = ({ cancel }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        setUsername('')
        setPassword('')
    }, [cancel])

    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        dispatch(loginUser(username, password))
        setUsername('')
        setPassword('')
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
            <Button variant="outlined" id="login-button" type="submit">
                login
            </Button>
        </form>
    )
}

LoginForm.propTypes = {
    cancel: PropTypes.bool.isRequired,
}

export default LoginForm
