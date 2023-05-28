import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from '../reducers/userReducer'

const User = () => {
    const { id } = useParams() // Extract id from route parameters
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUser(id))
    }, [])
    const user = useSelector((state) => state.user.specificUser) // Access users from Redux store

    if (!user) {
        return null
    }

    return (
        <div>
            <h2>{user.username}</h2>
            {/* Other user details here */}
        </div>
    )
}

export default User
