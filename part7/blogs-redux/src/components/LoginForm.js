import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import PropTypes from 'prop-types'
import {
    TextField,
    Button,
    FormControl,
    FormGroup,
    FormLabel,
} from '@mui/material'

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
        <FormControl component="form" onSubmit={handleLogin}>
            <FormLabel>Login</FormLabel>
            <FormGroup>
                <TextField
                    id="username-input"
                    label="Username"
                    type="text"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                    variant="outlined"
                />
                <TextField
                    id="password-input"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    variant="outlined"
                />
                <Button variant="outlined" id="login-button" type="submit">
                    login
                </Button>
            </FormGroup>
        </FormControl>
    )
}

LoginForm.propTypes = {
    cancel: PropTypes.bool.isRequired,
}

export default LoginForm
