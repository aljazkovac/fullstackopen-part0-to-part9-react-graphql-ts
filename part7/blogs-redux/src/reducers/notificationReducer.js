import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setMessage(state, action) {
            return action.payload
        },
        clearMessage() {
            return ''
        },
    },
})

export const { setMessage, clearMessage } = notificationSlice.actions

export const votedForBlog = (content, delay) => {
    return async (dispatch) => {
        const fullMessage =
            content.length === 0 ? '' : 'You voted for ' + content
        dispatch(setMessage(fullMessage))
        setTimeout(() => {
            dispatch(clearMessage())
        }, delay * 1000)
    }
}

export const createdBlog = (content, delay) => {
    return async (dispatch) => {
        console.log(content)
        const fullMessage =
            content.length === 0
                ? ''
                : `You created "${content.title}" by ${content.author}.`
        dispatch(setMessage(fullMessage))
        setTimeout(() => {
            dispatch(clearMessage())
        }, delay * 1000)
    }
}

export const userLoginSuccess = (content, delay) => {
    return async (dispatch) => {
        console.log(content)
        const fullMessage = `User "${content}" logged in.`
        dispatch(setMessage(fullMessage))
        setTimeout(() => {
            dispatch(clearMessage())
        }, delay * 1000)
    }
}

export const userLoginError = (delay) => {
    return async (dispatch) => {
        const fullMessage = 'Wrong credentials'
        dispatch(setMessage(fullMessage))
        setTimeout(() => {
            dispatch(clearMessage())
        }, delay * 1000)
    }
}

export default notificationSlice.reducer
