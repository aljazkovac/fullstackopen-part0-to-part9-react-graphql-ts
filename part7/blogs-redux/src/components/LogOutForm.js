import { removeUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button'

const LogOutForm = () => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(removeUser())
    }
    return (
        <form onSubmit={handleLogout}>
            <Button variant="outlined" id="logout-button" type="submit">
                logout
            </Button>
        </form>
    )
}

export default LogOutForm
