import React, { useState } from 'react'

const NewBook = (props) => {
const [title, setTitle] = useState('')
const [author, setAuthor] = useState('')
const [published, setPublished] = useState('')
const [genre, setGenre] = useState('')
const [genres, setGenres] = useState([])

if (!props.show) {
    return null
}

const submit = (event) => {
    event.preventDefault()

    console.log('add book...')

    setTitle('')
    setAuthor('')
    setPublished('')
    setGenre('')
    setGenres([])
}

const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
}


    return (
        <div>
            <h2>Add Book</h2>
           <form onSubmit={submit}>
               <div>
                   title 
                   <input value={title}
                   onChange={({target}) => setTitle(target.value)}
                   />
               </div>
               <div>
                   author 
                   <input value={author}
                   onChange={({target}) => setAuthor(target.value)}
                   />
               </div>
               <div>
                   published
                   <input value={published}
                   onChange={({target}) => setPublished(target.value)}
                   />
               </div>
               <div>
                   <input value={genre}
                   onChange={({target}) => setGenre(target.value)}
                   />
                   <button onClick={addGenre} type='button'>add genre</button>
               </div>
               <div>
                  genres: {genres.join(' ')}
               </div>
               <button type='submit'>create book</button>
               </form> 
        </div>
    )
}

export default NewBook