import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'


const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

    if (!token) {
      return (
        <div>
          <Notify errorMessage={errorMessage} />
          <h2>Login</h2>
          <LoginForm
          setToken={setToken}
          setError={notify}
          />
        </div>
      )
    }

    const logout = () => {
      setToken(null)
      localStorage.clear()
      client.resetStore()
    }

  return (
    <div>
     <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout}>logout</button>
      </div>
      <div>
        <Notify errorMessage={errorMessage} />
      </div>
      <Authors
        show={page === 'authors'}
        setError={notify}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

    </div>
  );
}

export default App;
