import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogsService from '../services/blogs'
import { userLoginErrorOrNot } from './notificationReducer'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(action.payload)
            )
            return action.payload
        },
        removeUser() {
            window.localStorage.removeItem('loggedBlogappUser')
            return null
        },
    },
})

export const loginUser = (username, password) => {
    return async (dispatch) => {
        try {
            const user = await loginService.login({
                username,
                password,
            })
            blogsService.setToken(user.token)
            dispatch(setUser(user))
            dispatch(userLoginErrorOrNot(false, 0))
        } catch (exception) {
            dispatch(userLoginErrorOrNot(true, 5))
        }
    }
}

export const getUser = () => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogsService.setToken(user.token)
            dispatch(setUser(user))
            console.log('User', user)
        }
    }
}

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer
