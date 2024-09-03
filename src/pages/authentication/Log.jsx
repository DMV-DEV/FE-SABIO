import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/authApi";
import { addUser } from "../../redux/userSlice";
import { addClasses } from '../../redux/classesSlice';

const Log = ({ setActiveComponent }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const validateUsername = (username) => {
    const usernameRegex = /^[A-Za-z0-9@./+/-/_]+$/;
    if (!usernameRegex.test(username)) {
      return "Please input your username!";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (password.length === 0) {
      return "Please input your password!";
    }
    if (password.length < 8) {
      return "Your password must contain at least 8 characters.";
    }
    if (/^\d+$/.test(password)) {
      return "Your password can’t be entirely numeric.";
    }
    const commonPasswords = ["12345678", "password", "123456789"];
    if (commonPasswords.includes(password)) {
      return "Your password can’t be a commonly used password.";
    }
    return "";
  };

  const onFinish = async (values) => {
    try {
      const response = await login(values).unwrap();
      const { access, refresh, id, email, first_name, last_name, profesion, fecha_nacimiento, sexo, tipo_usuario, has_temporary_password, foto } = response;
      
      if (access) {
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        dispatch(addUser({
          username: values.username,
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
        dispatch(addClasses({ nombre: '', id: '' }));

        navigate(tipo_usuario === 'alumno' ? '/student' : '/', { replace: true });
      } else {
        message.error('Authentication failed:', response.error || 'Unknown error');
      }
    } catch (err) {
      message.error('Failed to login:', err);
    }
  };

  return (
    <div className="login__card">
      <h2 className="login__title">Log In</h2>
      <Form
        name="login"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Username"
          className="login__label"
          name="username"
          rules={[
            {
              message: "Please input your username!",
            },
            {
              validator: (rule, value) => {
                const error = validateUsername(value);
                if (error) {
                  return Promise.reject(error);
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input className="login__input" placeholder="Enter your username" />
        </Form.Item>
        <Form.Item
          className="login__label"
          label="Password"
          name="password"
          rules={[
            {
              message: "Please input your password!",
            },
            {
              validator: (rule, value) => {
                const error = validatePassword(value);
                if (error) {
                  return Promise.reject(error);
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password className="login__input" placeholder="Enter your password" />
        </Form.Item>
        
        <Form.Item>
        <button className="login__button" type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Sign In'}
        </button>
        </Form.Item>
        <p className="login__lorem">
          By connecting with the services above you agree to our Terms of
          Services and acknowledge our Privacy Policy describing how we handle
          your personal data.
        </p>
      </Form>
    </div>
  );
};

export default Log;