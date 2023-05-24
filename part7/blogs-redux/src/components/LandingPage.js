import { useState } from 'react'
import BlogTable from './BlogTable'
import Notification from './Notification'
import Togglable from './Togglable'
import LoginForm from './LoginForm'
import LoggedInView from './LoggedInView'

const LandingPage = ({ user }) => {
    const [cancel, setCancel] = useState(false)
    return (
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
    )
}

export default LandingPage
