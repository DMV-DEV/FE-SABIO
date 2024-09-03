import React, { useState } from "react";
import "./authentication.css";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/userSlice";

const Signup = ({ setActiveComponent }) => {
  const dispatch = useDispatch();
  const { name, email, password } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    username: "",
    email: email,
    password: password,
    confirmPassword: "",
    birthdate: "",
    gender: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      addUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        birthdate: formData.birthdate,
        gender: formData.gender,
      })
    );
  };

  return (
    <div className="login__card">
      <h2 className="login__title">Sign Up</h2>
      <form onSubmit={handleSubmit} className="login__form">
        <div className="login__form-column">
          <label className="login__label" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="login__input"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
          />
          <label className="login__label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="login__input"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          <label className="login__label" htmlFor="birthdate">
            Date of Birth
          </label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            className="login__input"
            value={formData.birthdate}
            onChange={handleChange}
          />
        </div>
        <div className="login__form-column">
          <label className="login__label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="login__input"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          <label className="login__label" htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="login__input"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <label className="login__label" htmlFor="gender">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            className="login__input"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select your gender
            </option>
            <option value="male">M</option>
            <option value="female">F</option>
          </select>
        </div>
        <button type="submit" className="login__button">
          Sign Up
        </button>
        <div className="account__container">
          <h4>
            Already have an account?{" "}
            <button
              className="button__underlined login__forgot-password button__underlined"
              onClick={() => setActiveComponent("Log")}
            >
              Login
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

export default Signup;
