import React from 'react'

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
        <button id='login-button' type="submit">Submit</button>
      </form>
    </div>
  )
}

export default LoginForm
