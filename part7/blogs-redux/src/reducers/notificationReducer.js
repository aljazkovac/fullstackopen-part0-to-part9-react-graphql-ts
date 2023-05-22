import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: '',
    error: false,
}
const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setMessage(state, action) {
            state.message = action.payload
        },
        clearMessage(state) {
            state.message = ''
        },
        setError(state, action) {
            state.error = action.payload
        },
    },
})

export const { setMessage, clearMessage, setError } = notificationSlice.actions

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

export const userLoginErrorOrNot = (errorOrNot, delay) => {
    return async (dispatch) => {
        dispatch(setError(errorOrNot))
        const fullMessage = 'Wrong credentials'
        dispatch(setMessage(fullMessage))
        setTimeout(() => {
            dispatch(clearMessage())
        }, delay * 1000)
    }
}

export default notificationSlice.reducer
