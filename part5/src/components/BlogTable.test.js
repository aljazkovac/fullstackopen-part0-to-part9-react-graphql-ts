import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import BlogTable from './BlogTable'

describe('<BlogTable />', () => {
  let container

  const setBlogs = jest.fn()

  const user =
  {
    username: 'azi',
    name: 'bazi',
    blogs: [
      {
        title: 'Azi blog',
        author: 'Azi',
        url: 'azi url',
        likes: 82,
        id: '63cb971fa3e26c66e93d9caf'
      }
    ],
    id: '63834734432ab04978ab9f6f'
  }
  const blogs = [
    {
      title: 'Azi blog',
      author: 'Azi',
      url: 'azi url',
      likes: 82,
      id: '63cb971fa3e26c66e93d9caf'
    }
  ]

  beforeEach(() => {
    container = render(
      <BlogTable user={user} blogs={blogs} setBlogs={setBlogs}>
        <div className="testDiv" >
            BlogTable
        </div>
      </BlogTable>
    ).container
  })
  test('all object fields are rendered by default', async () => {
    const title = screen.queryByText('test blog')
    const author = screen.queryByText('Azi blog')
    const url = screen.queryByText('test url')
    const likes = screen.queryByText('10')
    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })
  test('the blog is not rendered if all checkbox is unchecked', async () => {
    const selectAll = container.querySelectorAll('input[type=\'checkbox\']')[0]
    fireEvent.click(selectAll)
    // Read about this here:
    // https://stackoverflow.com/questions/52783144/how-do-you-test-for-the-non-existence-of-an-element-using-jest-and-react-testing
    const title = screen.queryByText('test blog')
    const author = screen.queryByText('Azi blog')
    const url = screen.queryByText('test url')
    const likes = screen.queryByText('10')
    expect(title).toBeNull()
    expect(author).toBeNull()
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })
})