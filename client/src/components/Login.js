import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, message } from "antd"; // Import the message component
import setAuthToken from "../utils/setAuthToken";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: " ",
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/chat"); // Redirect to the Chat page if already logged in
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginUser = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      if (response.data.success) {
        localStorage.setItem("user", response.data.accessToken);
      }
      return response.data;
    } catch (error) {
      console.log(error);
      throw error; // Rethrow the error so it can be caught in the handleSubmit method
    }
  };

  const handleSubmit = async (e) => {
    try {
      // Assuming loginUser returns an object with accessToken upon successful login
      const resData = await loginUser(formData);

      // Check if accessToken is present in the response
      if (resData.accessToken) {
        setAuthToken(resData.accessToken);
        navigate("/chat");
      } else {
        // Handle the case where accessToken is not present in the response
        console.error("Access token not found in response");
      }
    } catch (error) {
      // Handle login errors
      console.error("Login error:", error);

      // Display an error message using Ant Design's message component
      message.error("Invalid username or password");
    }
  };

  return (
    <Form
      name="login"
      onFinish={handleSubmit}
      style={{ width: "500px", margin: "auto", marginTop: "250px" }}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          { required: true, message: "Please input your username!" },
          { min: 4, message: "Username must be at least 4 characters" },
        ]}
      >
        <Input onChange={handleInputChange} name="username" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          { min: 6, message: "Password must be at least 6 characters" },
        ]}
      >
        <Input.Password onChange={handleInputChange} name="password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>

      <Form.Item>
        Don't have an account? <Link to="/register">Register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default Login;
