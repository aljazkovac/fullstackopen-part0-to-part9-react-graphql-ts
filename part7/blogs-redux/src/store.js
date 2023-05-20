import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

const reducer = {
    notifications: notificationReducer,
    blogs: blogReducer,
}

const store = configureStore({ reducer: reducer })

export default store
