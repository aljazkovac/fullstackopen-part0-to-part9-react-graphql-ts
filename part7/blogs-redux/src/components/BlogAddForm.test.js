import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogAddForm from './BlogAddForm'

describe('<BlogAddForm />', () => {
    let container
    const addBlog = jest.fn()
    const handleAuthorChange = jest.fn()
    const handleTitleChange = jest.fn()
    const handleUrlChange = jest.fn()
    const handleLikesChange = jest.fn()
    const newAuthor = ''
    const newTitle = ''
    const newLikes = ''
    const newUrl = ''

    beforeEach(() => {
        container = render(
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
            >
                <div className="testDiv">BlogAddForm</div>
            </BlogAddForm>
        ).container
    })
    test('add blog', async () => {
        addBlog.mockImplementation((event) => {
            event.preventDefault()
        })
        const user = userEvent.setup()
        const button = screen.getByText('Save')
        const author = container.querySelector('#newAuthorInput')
        const title = container.querySelector('#newTitleInput')
        const url = container.querySelector('#newUrlInput')
        const likes = container.querySelector('#newLikesInput')
        fireEvent.change(author, { target: { value: 'Author Test' } })
        fireEvent.change(title, { target: { value: 'Title Test' } })
        fireEvent.change(url, { target: { value: 'Url Test' } })
        fireEvent.change(likes, { target: { value: 'Likes Test' } })
        await user.click(button)
        expect(addBlog).toHaveBeenCalled()
    })
})
