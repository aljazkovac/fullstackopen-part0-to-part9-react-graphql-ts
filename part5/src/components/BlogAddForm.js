const BlogAddForm = ({ addBlog, newAuthor, handleAuthorChange,
  newTitle, handleTitleChange, newUrl, handleUrlChange,
  newLikes, handleLikesChange }) => {

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