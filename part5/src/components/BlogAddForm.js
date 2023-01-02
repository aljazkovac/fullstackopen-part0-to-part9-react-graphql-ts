import { useState } from "react"

const BlogAddForm = () => {
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
    <button type='submit'>Save</button>
</form>
)
} 
export default BlogAddForm