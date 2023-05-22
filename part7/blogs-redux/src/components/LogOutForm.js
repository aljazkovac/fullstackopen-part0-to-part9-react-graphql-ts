import { removeUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const LogOutForm = () => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(removeUser())
    }
    return (
        <form onSubmit={handleLogout}>
            <button id="logout-button" type="submit">
                Log out
            </button>
        </form>
    )
}

export default LogOutForm
