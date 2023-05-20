import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload)
        },
        updateBlogs(state, action) {
            const updatedBlogs = action.payload // An array of blog objects with updated votes
            const updatedBlogsById = {} // Create a dictionary for quick lookup by id

            for (const blog of updatedBlogs) {
                updatedBlogsById[blog.id] = blog
            }

            for (let i = 0; i < state.length; i++) {
                if (updatedBlogsById[state[i].id]) {
                    // If the blog in state is in the updatedBlogs, replace it
                    state[i] = updatedBlogsById[state[i].id]
                }
            }
        },
        removeBlogs(state, action) {
            const blogsToRemove = action.payload
            const blogsToRemoveIds = blogsToRemove.map((blog) => blog.id)
            return state.filter((blog) => !blogsToRemoveIds.includes(blog.id))
        },
        setBlogs(state, action) {
            return action.payload
        },
    },
})

export const { appendBlog, updateBlogs, removeBlogs, setBlogs } =
    blogsSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogsService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (content) => {
    return async (dispatch) => {
        const newBlog = await blogsService.create(content)
        dispatch(appendBlog(newBlog))
    }
}

export const voteForBlogs = (blogs) => {
    return async (dispatch) => {
        const votePromises = blogs.map((blog) =>
            blogsService.update(blog.id, blog)
        )
        const updatedBlogs = await Promise.all(votePromises)
        dispatch(updateBlogs(updatedBlogs))
    }
}

export const deleteBlogs = (blogs, user) => {
    return async (dispatch) => {
        const deletePromises = blogs.map((blog) =>
            blogsService.remove(blog.id, user.token)
        )
        await Promise.all(deletePromises)
        dispatch(removeBlogs(blogs))
    }
}

export default blogsSlice.reducer
