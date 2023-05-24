import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../reducers/userReducer'
import { useEffect } from 'react'

const Users = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllUsers())
    }, [])

    const allUsers = useSelector((state) => state.user.allUsers)
    return (
        <div>
            {allUsers.map((user) => (
                <p key={user.id}>{user.username}</p>
            ))}
        </div>
    )
}

export default Users
