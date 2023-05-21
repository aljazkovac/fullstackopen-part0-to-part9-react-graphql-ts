import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const reducer = {
    notifications: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
}

const store = configureStore({ reducer: reducer })

export default store
