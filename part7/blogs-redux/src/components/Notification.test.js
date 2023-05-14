import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Notification from './Notification'

test('renders content', () => {
    const message = 'Blog added'
    const error = null

    render(<Notification message={message} error={error} />)

    const element = screen.getByText('Blog added')

    expect(element).toBeDefined()
})
