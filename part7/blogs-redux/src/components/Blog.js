import { React } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from '../reducers/userReducer'
import MyTabPanel from './TabsPanel'

const Blog = () => {
    const { userId, blogId } = useParams() // Extract id from route parameters
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUser(userId))
    }, [dispatch, userId])
    const user = useSelector((state) => state.user.specificUser) // Access users from Redux store
    const userBlogs = useSelector((state) => state.blogs.chosenUserBlogs)
    const blog = userBlogs.find((blog) => blog.id === blogId)

    if (!user || !blog) {
        return null
    }

    return (
        <div>
            <MyTabPanel labels={['Title and Author', 'Url', 'Likes']}>
                <div>
                    {blog.title} by {blog.author}
                </div>
                <div>{blog.url}</div>
                <div>{blog.likes}</div>
            </MyTabPanel>
        </div>
    )
}

export default Blog
