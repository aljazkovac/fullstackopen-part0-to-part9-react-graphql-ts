import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdoteReducer from './reducers/anecdoteReducer'

const reducer = {
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notifications: notificationReducer
}

const store = configureStore({ reducer: reducer })

export default store