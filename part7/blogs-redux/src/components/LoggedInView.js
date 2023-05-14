import { useEffect, useState, useRef } from 'react'
import BlogAddForm from './BlogAddForm'
import LogOutForm from './LogOutForm'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const LoggedInView = ({
    cancel,
    setCancel,
    user,
    blogs,
    setBlogs,
    setMessage,
    setError,
}) => {
    const [newAuthor, setNewAuthor] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [newLikes, setNewLikes] = useState(0)
    const addBlogFormRef = useRef()

    useEffect(() => {
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
        setNewLikes(0)
    }, [cancel])

    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }
    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }
    const handleUrlChange = (event) => {
        setNewUrl(event.target.value)
    }
    const handleLikesChange = (event) => {
        setNewLikes(event.target.value)
    }
    const addBlog = (event) => {
        event.preventDefault()
        addBlogFormRef.current.toggleVisibility()
        const blogObject = {
            author: newAuthor,
            title: newTitle,
            url: newUrl,
            likes: newLikes,
        }
        blogService.create(blogObject).then((returnedObject) => {
            setBlogs(blogs.concat(returnedObject))
            setNewAuthor('')
            setNewTitle('')
            setNewUrl('')
            setNewLikes(0)
            setMessage(
                `A new blog, ${blogObject.title} by ${blogObject.author}, added!`
            )
            setError(false)
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        })
    }
    return (
        <div>
            <p>{user.name} logged in</p>
            <LogOutForm />
            <Togglable
                buttonLabel="Add a blog"
                cancel={cancel}
                setCancel={setCancel}
                ref={addBlogFormRef}
            >
                <BlogAddForm
                    addBlog={addBlog}
                    newAuthor={newAuthor}
                    handleAuthorChange={handleAuthorChange}
                    newTitle={newTitle}
                    handleTitleChange={handleTitleChange}
                    newUrl={newUrl}
                    handleUrlChange={handleUrlChange}
                    newLikes={newLikes}
                    handleLikesChange={handleLikesChange}
                />
            </Togglable>
        </div>
    )
}

export default LoggedInView
