import React, { useState, useEffect } from 'react'
import './index.css'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LoggedInView from './components/LoggedInView'
import BlogTable from './components/BlogTable'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { getUser } from './reducers/userReducer'

const App = () => {
    const [cancel, setCancel] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(getUser())
    }, [dispatch])

    const user = useSelector((state) => state.user)

    return (
        <div>
            <h2>The Blogosphere</h2>
            <Notification />
            {user === null ? (
                <Togglable
                    buttonLabel="login"
                    cancel={cancel}
                    setCancel={setCancel}
                >
                    <LoginForm cancel={cancel} />
                </Togglable>
            ) : (
                <LoggedInView
                    cancel={cancel}
                    setCancel={setCancel}
                    user={user}
                />
            )}
            <h3>All blogs(title, author, likes)</h3>
            <BlogTable user={user} />
        </div>
    )
}

export default App
