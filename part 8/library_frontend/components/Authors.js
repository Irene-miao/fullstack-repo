import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'


const Authors = (props) => {
    const result = useQuery(ALL_AUTHORS)
    console.log(result)
    
    if (result.loading) {
        return <div>loading...</div>
    }

    if (!props.show) {
        return null
    }
    
    

    return (
        <div>
            <h2>Authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {result.data.allAuthors.map(a=>
                        <tr key={a.id}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                            </tr>
                            )}
                </tbody>
            </table>
        </div>
    )
}

export default Authors
