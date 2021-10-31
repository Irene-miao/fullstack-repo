import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { SET_BIRTH, ALL_AUTHORS } from '../queries'


const Authors = (props) => {
    const result = useQuery(ALL_AUTHORS)
    console.log(result)
    const [ name, setName ] = useState('')
    const [ born, setBorn ] = useState('')

    const [ editAuthor ] = useMutation(SET_BIRTH, {
            refetchQueries: [{ query: ALL_AUTHORS}],
            onError: (error) => {
                console.log(error)
                props.setError(error.message)
            }
        })

    const submit = (event) => {
            event.preventDefault()

            editAuthor({ variables: { name, born }})

            setName('')
            setBorn('')
        }

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
                    {result.data?.allAuthors.map(a=>
                        <tr key={a.id}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                            </tr>
                            )}
                </tbody>
            </table>
           <div>
            <h2>Set Birth Year</h2>
            <form onSubmit={submit}>
        <div>
            name
            <input value={name}
            onChange={({target}) => setName(target.value)}
            />
        </div>
        <div>
            born
            <input value={born}
            onChange={({target}) => setBorn(parseInt(target.value))}
            />
        </div>
        <button type='submit'>update author</button>
            </form>
        </div>
        </div>
    )
}

export default Authors
