import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import "../style/Detail.css";
import Loader from "../components/Loader";
import AlertPage from "../components/Alert";
const BookDetailPage = () => {
  const params = useParams();
  const firebase = useFirebase();

  const [qty, setQty] = useState(1);

  const [data, setData] = useState(null);
  const [url, setURL] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");



  useEffect(() => {
    firebase.getBookById(params.bookId).then((value) => setData(value.data()));
  }, []);

  useEffect(() => {
    if (data) {
      const imageURL = data.imageURL;
      firebase.getImageURL(imageURL).then((url) => setURL(url));
    }
  }, [data]);

  const placeOrder = async () => {
    const result = await firebase.placeOrder(params.bookId, qty);
    if (result) {
      setAlertMessage("Order Placed Successfully");
      setAlertColor("success");
    } else {
      setAlertMessage("Some Error, Please try after some time!");
      setAlertColor("error");
    }
  };

  if (data == null)
    return (
      <>
        <Loader />
      </>
    );

  return (
    <>
      <div className="container mt-5 pt-5">
        {alertMessage && (
          <AlertPage message={alertMessage} color={alertColor} />
        )}
        <div className="row">
          <div className="col-md-6 mt-5">
            <h1>{data.name}</h1>
            <img
              src={url}
              alt="img"
              width="100%"
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div className="col-md-6 mt-5 px-3">
            <h1>Details</h1>
            <p>Price: Rs. {data.price}</p>
            <p>ISBN Number. {data.isbnNumber}</p>
            <h1>Owner Details</h1>
            <p>Name: {data.displayName}</p>
            <p>Email: {data.userEmail}</p>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Qty</Form.Label>
              <Form.Control
                onChange={(e) => setQty(e.target.value)}
                value={qty}
                type="Number"
                placeholder="Enter Qty"
              />
            </Form.Group>
            <Button onClick={placeOrder} variant="success">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetailPage;
