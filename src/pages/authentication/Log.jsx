import React, { useState } from "react";
import "./authentication.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/authApi";
import { addUser } from "../../redux/userSlice";

const Log = ({ setActiveComponent }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { username, password } = formData;
      const response = await login({ username: username, password }).unwrap();
      console.log(response);
      const { access, refresh, id, email, first_name, last_name, profesion, fecha_nacimiento, sexo, tipo_usuario, has_temporary_password, foto } = response;
      if (access) { 
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        dispatch(addUser({
          username, // or any other field you prefer
          email,
          id,
          accessToken: access,
          refreshToken: refresh,
          first_name,
          last_name,
          profesion,
          fecha_nacimiento,
          sexo,
          tipo_usuario,
          has_temporary_password,
          foto
        }));
        if (tipo_usuario === 'alumno') {
          navigate('/student', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      } else {
        console.error('Authentication failed:', response.error || 'Unknown error');
      }
    } catch (err) {
      console.error('Failed to login:', err);
    }
  };

  return (
    <div className="login__card">
      <h2 className="login__title">Log In</h2>
      <form onSubmit={handleSubmit}>
        <label className="login__label" htmlFor="name">
          Username
        </label>
        <input
          type="name"
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
        <button className="login__button" type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Sign In'}
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
