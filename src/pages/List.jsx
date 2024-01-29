import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useFirebase } from "../context/Firebase";
import AlertPage from "../components/Alert";

const ListingPage = () => {
  const firebase = useFirebase();

  const [name, setName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await firebase.handleCreateNewListing(
      name,
      isbnNumber,
      price,
      coverPic
    );
    if (!result) {
      setAlertMessage("Book Added Successfully");
      setAlertColor("success");
    } else {
      setAlertMessage("Some Error in Adding Book Please try after some time!");
      setAlertColor("error");
    }
  };

  return (
    <div className="container mt-5 pt-5">
      {alertMessage && <AlertPage message={alertMessage} color={alertColor} />}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter Book Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Book name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            onChange={(e) => setIsbnNumber(e.target.value)}
            value={isbnNumber}
            type="text"
            placeholder="ISBN Number"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="text"
            placeholder="Enter Price"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Cover Pic</Form.Label>
          <Form.Control
            onChange={(e) => setCoverPic(e.target.files[0])}
            type="file"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default ListingPage;
