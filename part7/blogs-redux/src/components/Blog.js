import { React } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from '../reducers/userReducer'
import { getAllChosenBlogComments } from '../reducers/blogReducer'
import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@mui/material'
import StarBorder from '@mui/icons-material/StarBorder'

const Blog = () => {
    const { userId, blogId } = useParams() // Extract id from route parameters
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUser(userId))
        dispatch(getAllChosenBlogComments(blogId))
    }, [dispatch, userId, blogId])
    const user = useSelector((state) => state.user.specificUser) // Access users from Redux store
    const userBlogs = useSelector((state) => state.blogs.chosenUserBlogs)
    const blog = userBlogs.find((blog) => blog.id === blogId)
    const comments = useSelector((state) => state.blogs.chosenBlogComments)

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
                <Typography variant="body2">
                    Comments:
                    <List
                        style={{ listStyleType: 'disc', paddingLeft: '20px' }}
                    >
                        {comments.map((c) => (
                            <ListItem key={c.id} disablePadding>
                                <ListItemIcon>
                                    <StarBorder />
                                    <ListItemText
                                        primary={c.content}
                                        primaryTypographyProps={{
                                            variant: 'body2',
                                        }}
                                    ></ListItemText>
                                </ListItemIcon>
                            </ListItem>
                        ))}
                    </List>
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Blog
