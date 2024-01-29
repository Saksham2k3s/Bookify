import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
const ViewOrderDetails = () => {
  const params = useParams();
  const firebase = useFirebase();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    firebase.getOrders(params.bookId).then((orders) => {
      setOrders(orders.docs)
      console.log("this is my orders", orders.docs[0].data());
    });
  }, []);

  return (
    <div className="container mt-5 pt-5">
      <h1>Orders</h1>
      {orders.map((order) => {
        const data = order.data();
        return (
          <div
            key={order.id}
            className="mt-5"
            style={{ border: "1px solid", padding: "10px" }}
          >
            <h5>Order By: {data.userName}</h5>
            <h6>Qty: {data.qty}</h6>
            <p>Email: {data.email}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ViewOrderDetails;