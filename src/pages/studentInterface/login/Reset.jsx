import React from "react";
import "./authentication.css";

const Reset = ({ setActiveComponent }) => {
  return (
    <div className="login__card">
      <h2 className="login__title">Reset Password</h2>
      <label className="login__label" htmlFor="email">
        Email
      </label>
      <input
        type="email"
        id="email"
        className="login__input"
        placeholder="Enter your email"
      />
      <button className="login__button">Send password link</button>
      <div className="account__container">
        <button
          className="button__underlined login__forgot-password"
          onClick={() => setActiveComponent("Log")}
        >
          Back to Login
        </button>
      </div>

      <p className="login__lorem">
        By connecting with the services above you agree to our Terms of Services
        and acknowledge our Privacy Policy describing how we handle your
        personal data.
      </p>
    </div>
  );
};

export default Reset;
