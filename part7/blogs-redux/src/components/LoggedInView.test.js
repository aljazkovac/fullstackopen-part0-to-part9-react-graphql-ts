import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from '@testing-library/react'
import LoggedInView from './LoggedInView'

describe('<LoggedInView />', () => {
    let container
    const cancel = false
    const setCancel = jest.fn()
    const user = {
        username: 'azi',
        name: 'bazi',
        blogs: [
            {
                title: 'Azi blog',
                author: 'Azi',
                url: 'azi url',
                likes: 82,
                id: '63cb971fa3e26c66e93d9caf',
            },
        ],
        id: '63834734432ab04978ab9f6f',
    }
    const blogs = [
        {
            title: 'Azi blog',
            author: 'Azi',
            url: 'azi url',
            likes: 82,
            id: '63cb971fa3e26c66e93d9caf',
        },
    ]
    const setBlogs = jest.fn()
    const setMessage = jest.fn()
    const setError = jest.fn()

    beforeEach(() => {
        container = render(
            <LoggedInView
                cancel={cancel}
                setCancel={setCancel}
                user={user}
                blogs={blogs}
                setBlogs={setBlogs}
                setMessage={setMessage}
                setError={setError}
            >
                <div className="testDiv">LoggedInView</div>
            </LoggedInView>
        ).container
    })
    test('add blog', async () => {
        const button = screen.getByText('Save')
        const author = container.querySelector('#newAuthorInput')
        const title = container.querySelector('#newTitleInput')
        const url = container.querySelector('#newUrlInput')
        const likes = container.querySelector('#newLikesInput')
        fireEvent.change(author, { target: { value: 'Author Test' } })
        fireEvent.change(title, { target: { value: 'Title Test' } })
        fireEvent.change(url, { target: { value: 'Url Test' } })
        fireEvent.change(likes, { target: { value: '10' } })
        fireEvent.click(button)
        expect(author.value).toBe('Author Test')
        expect(title.value).toBe('Title Test')
        expect(url.value).toBe('Url Test')
        expect(likes.value).toBe('10')
    })
})
