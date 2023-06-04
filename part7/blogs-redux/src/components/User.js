import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from '../reducers/userReducer'
import UserBlogsList from './UserBlogsList'
import { getAllUserBlogs } from '../reducers/blogReducer'

const User = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchUserAndBlogs = async () => {
            const fetchedUser = await dispatch(getUser(id)) // Fetch user first
            console.log('User fetched: ', fetchedUser)
            dispatch(getAllUserBlogs(fetchedUser)) // Then fetch the user's blogs
        }

        fetchUserAndBlogs() // Call the async function
    }, [dispatch, id]) // Add dispatch and id as dependencies to avoid unnecessary re-renders

    const user = useSelector((state) => state.user.specificUser)
    const allUserBlogs = useSelector((state) => state.blogs.chosenUserBlogs)

    if (!user) {
        return null
    }

    return (
        <div>
            <h2>{user.username}</h2>
            <p>added blogs</p>
            <UserBlogsList userBlogs={allUserBlogs} />
        </div>
    )
}

export default User
