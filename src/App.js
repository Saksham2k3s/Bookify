import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


//pages
import RegisterPage from "./pages/Register";

import LoginPage from "./pages/Login";
import ListingPage from "./pages/List";
import Home from "./pages/Home";
import BookDetailPage from "./pages/Detail";

import OrdersPage from "./pages/ViewOrder";
import ViewOrderDetails from "./pages/ViewOrderDetail";


function App() {

  return (
    <div className="main-box mt-5" >
      <Navbar  />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register"  element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/book/list" element={<ListingPage/>} />
        <Route path="/book/view/:bookId" element={<BookDetailPage/>} />
        <Route path="/book/orders" element={<OrdersPage/>} />
        <Route path="/books/orders/:bookId" element={<ViewOrderDetails/>} />
      </Routes>
    </div>
  );
}

export default App;