import React from 'react'
import "./authentication.css";

const Reset = () => {
  return (
    <div className="login__card">
        <h2 className="login__title">Reset Password</h2>
        <label className="login__label" htmlFor="email">
          Email
        </label>
        <input
          type="password"
          id="password"
          className="login__input"
          placeholder="Enter your password"
        />
        <button className="login__button">Send password link</button>
        <p className="login__lorem">
          By connecting with the services above you agree to our Terms of
          Services and acknowledge our Privacy Policy describing how we handle
          your personal data.
        </p>
      </div>
  )
}

export default Reset