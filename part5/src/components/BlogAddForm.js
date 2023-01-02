import { useState } from "react"
import blogService from "../services/blogs"

const BlogAddForm = ({blogs, setBlogs, setMessage}) => {
    const [newAuthor, setNewAuthor] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [newLikes, setNewLikes] = useState(0)
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
        const blogObject = {
          author: newAuthor,
          title: newTitle,
          url: newUrl,
          likes: newLikes,
        }
        blogService
          .create(blogObject)
          .then(returnedObject => {
            setBlogs(blogs.concat(returnedObject))
            setNewAuthor('')
            setNewTitle('')
            setNewUrl('')
            setNewLikes(0)
            setMessage(`A new blog, ${blogObject.title} by ${blogObject.author}, added!`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            })
      }
return(
<form onSubmit={addBlog}>
    <p>Author:</p>
    <input
    value={newAuthor}
    onChange={handleAuthorChange}
    />
    <p>Title:</p>
    <input
    value={newTitle}
    onChange={handleTitleChange}
    />
    <p>Url:</p>
    <input
    value={newUrl}
    onChange={handleUrlChange}
    />
    <p>Likes:</p>
    <input
    value={newLikes}
    onChange={handleLikesChange}
    />
    <p>
      <button type='submit'>Save</button>
    </p>
</form>
)
} 
export default BlogAddForm