import React, { useState } from 'react';
import "./authentication.css";
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../redux/userSlice';
// import { postUser } from '../../services/PostUser';

const Login = () => {
  const dispatch = useDispatch();
  const { name, email, password } =
    useSelector((state) => state.user);

    const [formData, setFormData] = useState({
      name: name,
      email: email,
      password: password
    });

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('Form data submitted:', formData);
      // Aquí puedes enviar los datos a un servidor o hacer algo con ellos
    };



  return (
    
    <div className="login__card">
        <h2 className="login__title">Sign In</h2>
        <form onSubmit={handleSubmit}>
        <label className="login__label" htmlFor="email">
          Name
        </label>
        <input
          type="text"
          id="username"
          className="login__input"
          placeholder="Enter your name"
          value={formData.name}
              onChange={handleChange}
        />
        <label className="login__label" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="login__input"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        <label className="login__label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="login__input"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />
        <div className="login__options">
          <div className="login__checkbox-container">
          </div>
          <button type="submit" className="button__underlined login__forgot-password button__underlined">
            Login
          </button>
        </div>
        </form>
        <button className="login__button">Sign Up</button>
        
        <p className="login__lorem">
          By connecting with the services above you agree to our Terms of
          Services and acknowledge our Privacy Policy describing how we handle
          your personal data.
        </p>
      </div>
  )
}

export default Login