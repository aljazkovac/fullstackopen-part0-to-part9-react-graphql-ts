import React, { useEffect } from 'react'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { getLoggedInUser } from './reducers/userReducer'
import Menu from './components/Menu'
import { Box } from '@mui/material'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(getLoggedInUser())
    }, [dispatch])

    const user = useSelector((state) => state.user.loggedInUser)
    console.log(user)

    return (
        <Box p={2} display="flex" flexDirection="column">
            <Menu user={user} />
        </Box>
    )
}

export default App
