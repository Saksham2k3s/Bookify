import React, { useEffect, useState } from "react";
import CardGroup from "react-bootstrap/CardGroup";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { useFirebase } from "../context/Firebase";
import Loader from "../components/Loader";

const Home = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!firebase.user) navigate("/login");
    firebase.listAllBooks().then((books) => setBooks(books.docs));
  }, []);

  if (!books)
    return (
      <>
        {" "}
        <Loader />{" "}
      </>
    );

  return (
    <div className="container mt-5">
      <div className="row">
        <CardGroup>
          {books.map((book) => (
            <div className="col-md-4" key={book.id} >
              <Card
                link={`/book/view/${book.id}`}
                key={book.id}
                id={book.id}
                {...book.data()}
              />
            </div>
          ))}
        </CardGroup>
      </div>
    </div>
  );
};

export default Home;
