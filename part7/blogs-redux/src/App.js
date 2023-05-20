import React, { useState, useEffect } from 'react'
import './index.css'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LoggedInView from './components/LoggedInView'
import blogsService from './services/blogs'
import BlogTable from './components/BlogTable'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(true)
    const [cancel, setCancel] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogsService.setToken(user.token)
            console.log('User', user)
        }
    }, [])

    return (
        <div>
            <h2>The Blogosphere</h2>
            <Notification error={error} />
            {user === null ? (
                <Togglable
                    buttonLabel="login"
                    cancel={cancel}
                    setCancel={setCancel}
                >
                    <LoginForm
                        cancel={cancel}
                        setUser={setUser}
                        setError={setError}
                    />
                </Togglable>
            ) : (
                <LoggedInView
                    cancel={cancel}
                    setCancel={setCancel}
                    user={user}
                    setError={setError}
                />
            )}
            <h3>All blogs(title, author, likes)</h3>
            <BlogTable user={user} />
        </div>
    )
}

export default App
