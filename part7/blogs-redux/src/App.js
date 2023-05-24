import React, { useEffect } from 'react'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { getLoggedInUser } from './reducers/userReducer'
import Menu from './components/Menu'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(getLoggedInUser())
    }, [dispatch])

    const user = useSelector((state) => state.user.loggedInUser)

    return (
        <div>
            <Menu user={user} />
        </div>
    )
}

export default App
