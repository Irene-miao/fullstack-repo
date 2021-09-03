import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        updateBlog={mockHandleUpdate}
        deleteBlog={mockHandleDelete}
        user={user}
      />
    )
  })

  const blog = {
    author: 'Testing',
    title: 'Test 1',
    url: 'www.testing.com',
    likes: '2',
  }

  const user = {
    name: 'Tester',
    username: 'tester',
  }

  const mockHandleUpdate = jest.fn()
  const mockHandleDelete = jest.fn()

  test('renders blog title and author but not url and likes by default',  () => {
    const defaultBlogContent = component.container.querySelector('.blog')
    const defaultHiddenContent = component.getByTestId('hidden')

    expect(component.container).toHaveTextContent(blog.title)
    expect(defaultBlogContent).not.toHaveStyle('display:none')
    expect(defaultBlogContent).toBeVisible()
    console.log(defaultHiddenContent)
    expect(defaultHiddenContent).toHaveStyle('display:none')
  })


})


