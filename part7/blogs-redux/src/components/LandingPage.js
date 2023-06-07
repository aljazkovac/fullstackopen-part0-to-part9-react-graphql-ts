import { useState } from 'react'
import BlogTable from './BlogTable'
import Notification from './Notification'
import Togglable from './Togglable'
import LoginForm from './LoginForm'
import LoggedInView from './LoggedInView'
import { Box, Typography } from '@mui/material'

const LandingPage = ({ user }) => {
    const [cancel, setCancel] = useState(false)
    return (
        <Box display="flex" flexDirection="column">
            <Notification />
            <Typography variant="h2" align="center">
                The Blogosphere
            </Typography>
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
        </Box>
    )
}

export default LandingPage
