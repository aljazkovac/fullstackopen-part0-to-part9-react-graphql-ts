import { useSelector } from 'react-redux'
import { removeUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const LogOutForm = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    const handleLogout = () => {
        dispatch(removeUser(user))
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
