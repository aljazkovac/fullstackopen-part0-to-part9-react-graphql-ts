import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('<Togglable />', () => {
    let container

    // We do not intend to test the setCancel functionality,
    // so we simply return null here.
    function setCancel() {
        return null
    }

    beforeEach(() => {
        container = render(
            <Togglable
                buttonLabel="show..."
                cancel={false}
                setCancel={setCancel}
            >
                <div className="testDiv">togglable content</div>
            </Togglable>
        ).container
    })

    test('renders its children', async () => {
        await screen.findAllByText('togglable content')
    })

    test('at start the children are not displayed', () => {
        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })

    test('after clicking the button, children are displayed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('show...')
        await user.click(button)

        const div = container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })

    test('toggled content can be closed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('show...')
        await user.click(button)

        const closeButton = screen.getByText('cancel')
        await user.click(closeButton)

        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })
})
