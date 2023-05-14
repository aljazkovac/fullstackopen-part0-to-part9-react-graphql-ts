import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'

const reducer = {
    notifications: notificationReducer,
}

const store = configureStore({ reducer: reducer })

export default store
