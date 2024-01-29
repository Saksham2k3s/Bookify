import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../style/Register.css'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useFirebase } from "../context/Firebase";

const RegisterPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (firebase.isLoggedIn) {
      // navigate to home
      navigate("/");
    }
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signin up a user...");
    const result = await firebase.signupUserWithEmailAndPassword(
      email,
      password
    );
    console.log("Successfull", result);
  };

  return (
    <div className="container mt-5 register-box">
     <div className="row">
      
      <div className="col-md-6 box-1 pt-5">
          <img src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?size=626&ext=jpg&ga=GA1.2.163069787.1698077815&semt=sph" alt="" />
        </div>
      
      <div className="col-md-6 mt-5 box-2 p-4">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </Form>
      <h4 className="mt-5 mb-5 text-center or" style={{color:'brown'}}>OR</h4>
      <div className="text-center" >
      <Button onClick={firebase.signinWithGoogle} variant="danger" className="googlebtn">
        <img src='https://cdn-icons-png.flaticon.com/128/720/720255.png' alt="google-img" />
            Continue with Google
      </Button>
      </div>
      </div>
     </div>
    </div>
  );
};

export default RegisterPage;