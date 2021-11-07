import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'



const Books = ({ setError, show}) => {
    const [genre, setGenre] = useState('')
    const result = useQuery(ALL_BOOKS, {
        variables: { genre },
        onError: (error) => {
            console.log(error)
            setError(error.message)
        }
    })
    
    console.log(result)

    if (result.loading) {
        return <div>loading...</div>
    }

    if (!show) {
        return null
    }

    
    return (
        <div>
            <h2>Books</h2>
            in genre {genre}
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
<div>
<button onClick={() => {
       setGenre('')}} >all</button>
   <button onClick={() => {
       setGenre('')
       setGenre("refactoring")}} >refactoring</button>
    <button onClick={() => {
       setGenre('')
       setGenre("design")}} >design</button>
    <button onClick={() => {
       setGenre('')
       setGenre("classic")}} >classic</button>
    <button onClick={() => {
       setGenre('')
       setGenre("crime")}} >crime</button>
    <button onClick={() => {
       setGenre('')
       setGenre("patterns")}} >patterns</button>
    <button onClick={() => {
       setGenre('')
       setGenre("baking")}} >baking</button>
    <button onClick={() => {
       setGenre('')
       setGenre("agile")}} >agile</button>
    <button onClick={() => {
       setGenre('')
       setGenre("revolution")}} >revolution</button>
    <button onClick={() => {
       setGenre('')
       setGenre("testing")}} >testing</button>
</div>
        </div>
    )
}

export default Books
