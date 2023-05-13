const BlogAddForm = ({ addBlog, newAuthor, handleAuthorChange,
  newTitle, handleTitleChange, newUrl, handleUrlChange,
  newLikes, handleLikesChange }) => {

  return(
    <form onSubmit={addBlog}>
      <p>Author:</p>
      <input
        value={newAuthor}
        onChange={handleAuthorChange}
        id='newAuthorInput'
      />
      <p>Title:</p>
      <input
        value={newTitle}
        onChange={handleTitleChange}
        id='newTitleInput'
      />
      <p>Url:</p>
      <input
        value={newUrl}
        onChange={handleUrlChange}
        id='newUrlInput'
      />
      <p>Likes:</p>
      <input
        value={newLikes}
        onChange={handleLikesChange}
        id='newLikesInput'
      />
      <p>
        <button type='submit'>Save</button>
      </p>
    </form>
  )
}

export default BlogAddForm