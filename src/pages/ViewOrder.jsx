import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/Card";


const OrdersPage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (firebase.isLoggedIn)
      firebase
        .fetchMyBooks(firebase.user.uid)
        ?.then((books) => setBooks(books.docs));
  }, [firebase]);

 

  if (!firebase.isLoggedIn) return <>
  <div  className="container mt-5" >
    Please login
  </div>
  </>
  
  return (
    <div className="container mt-5 pt-5" >
      <div className="row">
      {books.map((book) => (
        <div className="col-md-4">
        <BookCard
          link={`/books/orders/${book.id}`}
          key={book.id}
          id={book.id}
          {...book.data()}
        />
        </div>
      ))}
      </div>
    </div>
  );
};

export default OrdersPage;