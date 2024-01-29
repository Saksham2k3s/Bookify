import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../style/Login.css";
import { useFirebase } from "../context/Firebase";
import AlertPage from "../components/Alert";
const LoginPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");

  useEffect(() => {
    if (firebase.isLoggedIn) {
      // navigate to home
      navigate("/");
    }
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("login in a user...");
    const result = await firebase.singinUserWithEmailAndPass(email, password);
    if (result) {
      setAlertMessage("User Logged Successfully");
      setAlertColor("success");
    } else {
      setAlertMessage("Some Error, Please try after some time!");
      setAlertColor("error");
    }
  };

  return (
    <>
      <div className="container login-box">
        {alertMessage && (
          <AlertPage message={alertMessage} color={alertColor} />
        )}
        <div className="row">
          <div className="com-md-6 box-1 pt-5">
            <img
              src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?size=626&ext=jpg&ga=GA1.2.163069787.1698077815&semt=sph"
              alt=""
            />
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

              <div className="text-center">
                <Button variant="primary" type="submit" className="btn">
                  Login
                </Button>
              </div>
            </Form>
            <h4 className="mt-5 mb-5 text-center or" style={{ color: "brown" }}>
              OR
            </h4>
            <div className="text-center">
              <Button
                onClick={firebase.signinWithGoogle}
                variant="danger"
                className="googlebtn"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/720/720255.png"
                  alt="google-img"
                />
                Continue with Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
