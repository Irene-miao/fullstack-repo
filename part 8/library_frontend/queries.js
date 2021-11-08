import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
query {
    allAuthors {
        name
        id
        born
        bookCount
    }
}
`

export const ALL_BOOKS = gql`
query findBooks($author: String, $genre: String){
    allBooks(author: $author, genre: $genre) {
        title
        published
        genres
        author{
            name
            id
            born
            bookCount
        }
        id
    }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!], $born: Int) {
    addBook(
        title: $title
        author: $author
        published: $published
        born: $born
        genres: $genres
    ) {
        title
        author{
            name
            id
            born
            bookCount
        }
        id
        published
        genres
    }
}
`

export const SET_BIRTH = gql`
mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
        name
        born
        bookCount
    }
}
`
export const LOGIN = gql`
mutation login($username: String!, $password: String!){
    login(username: $username, password: $password){
        value
    }
}
`
export const ME = gql`
query {
    me{
        id
        username
        favouriteGenre
    }
}
`