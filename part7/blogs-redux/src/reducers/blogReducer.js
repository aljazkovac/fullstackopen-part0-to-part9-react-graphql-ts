import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: {
        allBlogs: [],
        chosenUserBlogs: [],
        chosenBlogComments: [],
    },
    reducers: {
        appendBlog(state, action) {
            state.allBlogs.push(action.payload)
        },
        appendComment(state, action) {
            state.chosenBlogComments.push(action.payload)
        },
        updateBlogs(state, action) {
            const updatedBlogs = action.payload // An array of blog objects with updated votes
            const updatedBlogsById = {} // Create a dictionary for quick lookup by id

            for (const blog of updatedBlogs) {
                updatedBlogsById[blog.id] = blog
            }

            for (let i = 0; i < state.allBlogs.length; i++) {
                if (updatedBlogsById[state.allBlogs[i].id]) {
                    // If the blog in state is in the updatedBlogs, replace it
                    state.allBlogs[i] = updatedBlogsById[state.allBlogs[i].id]
                }
            }
        },
        removeBlogs(state, action) {
            const blogsToRemove = action.payload
            const blogsToRemoveIds = blogsToRemove.map((blog) => blog.id)
            let filteredBlogs = state.allBlogs.filter(
                (blog) => !blogsToRemoveIds.includes(blog.id)
            )
            state.allBlogs = filteredBlogs
        },
        setBlogs(state, action) {
            state.allBlogs = action.payload
        },
        setChosenUserBlogs(state, action) {
            state.chosenUserBlogs = action.payload
        },
        setChosenBlogComments(state, action) {
            console.log('Chosen blog comments: ', action.payload)
            state.chosenBlogComments = action.payload
        },
    },
})

export const {
    appendBlog,
    appendComment,
    updateBlogs,
    removeBlogs,
    setBlogs,
    setChosenUserBlogs,
    setChosenBlogComments,
} = blogsSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogsService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const getAllUserBlogs = (user) => {
    console.log('User: ', user)
    console.log('All users blogs: ', user.blogs)
    return async (dispatch) => {
        const blogs = await blogsService.getManyBlogs(user.blogs)
        dispatch(setChosenUserBlogs(blogs))
    }
}

export const getAllChosenBlogComments = (blogId) => {
    console.log('BlogId: ', blogId)
    return async (dispatch) => {
        const comments = await blogsService.getComments(blogId)
        dispatch(setChosenBlogComments(comments))
    }
}

export const addCommentToBlog = (blogId, comment) => {
    console.log('Comment: ', comment)
    return async (dispatch) => {
        const newComment = await blogsService.addComment(blogId, comment)
        dispatch(appendComment(newComment))
    }
}

export const createBlog = (content) => {
    return async (dispatch) => {
        const newBlog = await blogsService.create(content)
        dispatch(appendBlog(newBlog))
    }
}

export const voteForBlogs = (blogs) => {
    console.log('voting')
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
