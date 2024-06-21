import React from 'react'
import "./authentication.css";

const Signin = () => {
  return (
    <div className="login__card">
        <h2 className="login__title">Sign In</h2>
        <label className="login__label" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="login__input"
          placeholder="Enter your email"
        />
        <label className="login__label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="login__input"
          placeholder="Enter your password"
        />
        <div className="login__options">
          <div className="login__checkbox-container">
            <input
              type="checkbox"
              id="rememberMe"
              className="login__checkbox"
            />
            <label htmlFor="rememberMe" className="login__checkbox-label">
              Remember me
            </label>
          </div>
          <button className="button__underlined login__forgot-password button__underlined">
            Forgot password
          </button>
        </div>
        <button className="login__button">Sign In</button>
        <p className="login__lorem">
          By connecting with the services above you agree to our Terms of
          Services and acknowledge our Privacy Policy describing how we handle
          your personal data.
        </p>
      </div>
  )
}

export default Signin