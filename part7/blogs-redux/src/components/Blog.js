import { React } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from '../reducers/userReducer'
import { Card, CardContent, Typography } from '@mui/material'

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
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {blog.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    by {blog.author}
                </Typography>
                <Typography variant="body2">
                    URL: <a href={blog.url}>{blog.url}</a>
                </Typography>
                <Typography variant="body2">Likes: {blog.likes}</Typography>
            </CardContent>
        </Card>
    )
}

export default Blog
