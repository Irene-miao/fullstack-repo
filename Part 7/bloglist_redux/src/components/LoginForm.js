import React from 'react'
import { Button } from 'react-bootstrap'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <h3>Log in to application</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <div>username
            <input id='username' value={username} onChange={handleUsernameChange} />
          </div>
          <div>
          password
            <input
              id='password'
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
        </div>
        <Button id='login-button' type="submit">Submit</Button>
      </form>
    </div>
  )
}

export default LoginForm