import React, { useState } from "react";
import "./authentication.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Log = ({ setActiveComponent }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // const { email, password } =
  //   useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevformData) => ({
      ...prevformData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form data submitted:", formData);
    // Aquí puedes enviar los datos a un servidor o hacer algo con ellos
    // navigate('/myclasses');
  };

  return (
    <div className="login__card">
      <h2 className="login__title">Log In</h2>
      <form onSubmit={handleSubmit}>
        <label className="login__label" htmlFor="email">
          Username
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="login__input"
          placeholder="Enter your username"
          value={formData.email}
          onChange={handleChange}
        />
        <label className="login__label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="login__input"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
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
          <button
            className="button__underlined login__forgot-password"
            onClick={() => setActiveComponent("Reset")}
          >
            Forgot Password
          </button>
        </div>
        <button className="login__button" type="submit" onClick={handleSubmit}>
          Sign In
        </button>
        <div className="account__container">
          <h4>
            Don't have an account?
            <button
              className="button__underlined login__forgot-password button__underlined"
              onClick={() => setActiveComponent("Signup")}
            >
              Sign Up Now
            </button>
          </h4>
        </div>
        <p className="login__lorem">
          By connecting with the services above you agree to our Terms of
          Services and acknowledge our Privacy Policy describing how we handle
          your personal data.
        </p>
      </form>
    </div>
  );
};

export default Log;
