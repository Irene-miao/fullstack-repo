import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'



const Books = (props) => {
    const result = useQuery(ALL_BOOKS)
    console.log(result)

    if (result.loading) {
        return <div>loading...</div>
    }

    if (!props.show) {
        return null
    }

    
    return (
        <div>
            <h2>Books</h2>
            <table>
                <tbody>
                    <tr style={{ textAlign: "left" }}>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Published</th>
                    </tr>
                    {result.data?.allBooks.map(b =>
                        <tr key={b.id}>
                            <td>{b.title}</td>
                            <td>{b.author?.name}</td>
                            <td>{b.published}</td>
                        </tr>
                        )}
                </tbody>
            </table>
        </div>
    )
}

export default Books
