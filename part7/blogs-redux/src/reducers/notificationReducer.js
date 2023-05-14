import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setMessage(state, action) {
            const msg = action.payload
            return msg
        },
        clearMessage() {
            return ''
        },
    },
})

export const { setMessage, clearMessage } = notificationSlice.actions

export const votedForMessage = (content, delay) => {
    return async (dispatch) => {
        const fullMessage =
            content.length === 0 ? '' : 'You voted for ' + content
        dispatch(setMessage(fullMessage))
        setTimeout(() => {
            dispatch(clearMessage())
        }, delay * 1000)
    }
}

export const createdMessage = (content, delay) => {
    return async (dispatch) => {
        const fullMessage = content.length === 0 ? '' : 'You created ' + content
        dispatch(setMessage(fullMessage))
        setTimeout(() => {
            dispatch(clearMessage())
        }, delay * 1000)
    }
}

export default notificationSlice.reducer
