import { useSelector } from 'react-redux'

const Notification = () => {
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        color: 'green',
    }
    const errorStyle = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        color: 'red',
    }

    const message = useSelector((state) => {
        return state.notifications.message
    })
    const error = useSelector((state) => {
        return state.notifications.error
    })

    return <div style={error ? errorStyle : style}>{message}</div>
}

export default Notification
