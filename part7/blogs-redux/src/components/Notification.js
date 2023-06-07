import { useSelector } from 'react-redux'
import { Snackbar, Alert } from '@mui/material'

const Notification = () => {
    const message = useSelector((state) => state.notifications.message)
    const error = useSelector((state) => state.notifications.error)
    console.log('Message = ', message)

    return (
        <Snackbar
            open={message !== null && message !== ''}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert severity={error ? 'error' : 'success'}>{message}</Alert>
        </Snackbar>
    )
}

export default Notification
