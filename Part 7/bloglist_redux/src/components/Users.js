import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'



const Users = () => {
  const blogs = useSelector(state => state.blogs)
  console.log(blogs)
  const users = Array.from(new Set(blogs.map((blog) => blog.data?.user[0]?.username)))
  console.log(users)
  const returnLength = (name, object) => {
    const blogs = object.filter((item) => item.data?.user[0]?.username === name)
    console.log(blogs)
    return blogs.length
  }
  return (
    <div>
      <h2>Users</h2>
      <Table size="sm">
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{users[0]}</td>
            <td>{returnLength(users[0], blogs)}</td>
          </tr>
          <tr>
            <td> {users[1]}</td>
            <td>{returnLength(users[1], blogs)}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default Users
