import { useSelector } from 'react-redux'
import { Snackbar, Alert } from '@mui/material'

const Notification = () => {
    const message = useSelector((state) => state.notifications.message)
    const error = useSelector((state) => state.notifications.error)

    return (
        <Snackbar
            open={message !== null}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert severity={error ? 'error' : 'success'}>{message}</Alert>
        </Snackbar>
    )
}

export default Notification
