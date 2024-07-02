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
      dispatch(
        addUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      );
      console.log('Form data submitted:', {name, email, password});
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
          id="name"
          name= 'name'
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
          name='email'
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
          name='password'
          id="password"
          className="login__input"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />
        <div className="login__options">
          <div className="login__checkbox-container">
          </div>
          <button  className="button__underlined login__forgot-password button__underlined">
            Sign Up
          </button>
        </div>
        
        <button type="submit" className="login__button">Sign in</button>
        
        <p className="login__lorem">
          By connecting with the services above you agree to our Terms of
          Services and acknowledge our Privacy Policy describing how we handle
          your personal data.
        </p>
        </form>
      </div>
  )
}

export default Login