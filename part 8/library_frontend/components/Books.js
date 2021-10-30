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

    const styleObj = { paddingRight: 20}

    return (
        <div>
            <h2>Books</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {result.data?.allBooks.map(b =>
                        <tr key={b.id}>
                            <td>{b.title}</td>
                            <td>{b.author}</td>
                            <td>{b.published}</td>
                        </tr>
                        )}
                </tbody>
            </table>
        </div>
    )
}

export default Books
