import { Routes, Route, Link } from 'react-router-dom'
import BlogTable from './BlogTable'
import Notification from './Notification'
import Togglable from './Togglable'
import LoginForm from './LoginForm'
import LoggedInView from './LoggedInView'
import { useState } from 'react'

const Menu = ({ user }) => {
    const [cancel, setCancel] = useState(false)
    const padding = {
        paddingRight: 5,
    }
    return (
        <div>
            <div>
                <Link style={padding} to="/">
                    blogs
                </Link>
            </div>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div>
                            <Notification />
                            <h2>The Blogosphere</h2>
                            {user === null ? (
                                <Togglable
                                    buttonLabel="login"
                                    cancel={cancel}
                                    setCancel={setCancel}
                                >
                                    <LoginForm cancel={cancel} />
                                </Togglable>
                            ) : (
                                <>
                                    <LoggedInView
                                        cancel={cancel}
                                        setCancel={setCancel}
                                        user={user}
                                    />
                                </>
                            )}
                            <BlogTable user={user} />
                        </div>
                    }
                />
            </Routes>
        </div>
    )
}

export default Menu
