import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogAddForm from './BlogAddForm'

describe('<BlogAddForm />', () => {
  let container
  const addBlog = jest.fn()
  function handleAuthorChange() {
    return null
  }
  function handleTitleChange() {
    return null
  }
  function handleUrlChange() {
    return null
  }
  function handleLikesChange() {
    return null
  }
  const newAuthor = ''
  const newTitle = ''
  const newLikes = ''
  const newUrl = ''

  beforeEach(() => {
    container = render(
      <BlogAddForm addBlog={addBlog} newAuthor={newAuthor} handleAuthorChange={handleAuthorChange}
        newTitle={newTitle} handleTitleChange={handleTitleChange} newUrl={newUrl} handleUrlChange={handleUrlChange}
        newLikes={newLikes} handleLikesChange={handleLikesChange}>
        <div className="testDiv" >
            BlogAddForm
        </div>
      </BlogAddForm>
    ).container
  })
  test('add blog', async () => {
    addBlog.mockImplementation(event => {
      event.preventDefault()
    })
    const user = userEvent.setup()
    const button = screen.getByText('Save')
    await user.click(button)
    expect(addBlog).toHaveBeenCalled()
  })
})