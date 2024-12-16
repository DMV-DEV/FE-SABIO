import React, { useState } from "react";
import "./authentication.css";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../redux/userSlice";
import { useRegisterMutation } from "../../../redux/authApi";
import { message } from "antd";

const Signup = ({ setActiveComponent }) => {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2:"",
    fecha_nacimiento: "",
    sexo: "",
    tipo_usuario:""
  });

  const [register] = useRegisterMutation();


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      register({...formData, tipo_usuario: "student"});
      message.success("User register successfully!");
    } catch (error) {
      message.error("Error register!"); 
    }
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
          <label className="login__label" htmlFor="fecha_nacimiento">
            Date of Birth
          </label>
          <input
            type="date"
            id="fecha_nacimiento"
            name="fecha_nacimiento"
            className="login__input"
            value={formData.fecha_nacimiento}
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
          <label className="login__label" htmlFor="password2">
            Confirm password
          </label>
          <input
            type="password"
            name="password2"
            id="password2"
            className="login__input"
            placeholder="Confirm your password"
            value={formData.password2}
            onChange={handleChange}
          />
          <label className="login__label" htmlFor="sexo">
            Gender
          </label>
          <select
            id="sexo"
            name="sexo"
            className="login__input"
            value={formData.sexo}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select your gender
            </option>
            <option value="M">M</option>
            <option value="F">F</option>
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
