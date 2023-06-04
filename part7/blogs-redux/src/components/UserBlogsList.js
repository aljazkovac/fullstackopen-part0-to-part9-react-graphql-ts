import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

const UserBlogsList = ({ userBlogs }) => {
    console.log('User blogs: ', userBlogs)
    if (userBlogs) {
        return (
            <div>
                <List>
                    {userBlogs.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={item.title} />
                        </ListItem>
                    ))}
                </List>
            </div>
        )
    }
    return <div>This user has no blogs yet!</div>
}

export default UserBlogsList
