import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { useParams, Link } from 'react-router-dom'

const UserBlogsList = ({ userBlogs }) => {
    console.log('User blogs: ', userBlogs)
    const { userId } = useParams()
    if (userBlogs) {
        return (
            <div>
                <List>
                    {userBlogs.map((item, index) => {
                        console.log('Item: ', item) // Log the blog item
                        console.log(`/users/${userId}/${item.id}`) // Log the link path
                        return (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={
                                        <Link
                                            to={`/users/${userId}/${item.id}`}
                                        >
                                            {item.title}
                                        </Link>
                                    }
                                />
                            </ListItem>
                        )
                    })}
                </List>
            </div>
        )
    }
    return <div>This user has no blogs yet!</div>
}

export default UserBlogsList
