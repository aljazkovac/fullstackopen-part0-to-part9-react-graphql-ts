import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogsService from '../services/blogs'
import { userLoginErrorOrNot } from './notificationReducer'
import userService from '../services/users'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedInUser: null,
        allUsers: [],
    },
    reducers: {
        setUser(state, action) {
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(action.payload)
            )
            state.loggedInUser = action.payload
        },
        removeUser(state) {
            window.localStorage.removeItem('loggedBlogappUser')
            state.loggedInUser = null
        },
        setAllUsers(state, action) {
            state.allUsers = action.payload
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

export const getLoggedInUser = () => {
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
export const getAllUsers = () => {
    return async (dispatch) => {
        const allUsers = await userService.getAll()
        dispatch(setAllUsers(allUsers))
        console.log('All users: ', allUsers)
    }
}

export const { setUser, removeUser, setAllUsers } = userSlice.actions
export default userSlice.reducer
