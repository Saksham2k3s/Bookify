import React, { useState } from "react";
import "../style/Navbar.css";
import { Link } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import Button from "react-bootstrap/Button";
function Navbar() {
  const  firebase  = useFirebase();
 
  const [profileModal, setProfileModal] = useState(false)
  
  if(firebase.user)  return (
    <>
  
    <div className={`${profileModal ? 'profileModal' : ''} p-4 `} style={{display : `${profileModal ? 'block' : 'none'}`}} >
      <h4>Account Details</h4>
     <h6>{firebase.user.displayName}</h6>
     <h6  className="h6">{firebase.user.email}</h6>
    <Button variant="success" onClick={() => firebase.logout()} >Logout</Button>
    </div>

      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 fixed-top">
        <Link className="navbar-brand nav-link " href="#">
          Bookify
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {
          firebase.isLoggedIn === true ? ( <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item active">
              <Link className="nav-link" to='/'>
                Home
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/book/list">
                Add Listing
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/book/orders">
                Orders
              </Link>
            </li>
          </ul>
          <div className="profile-img" onClick={() => setProfileModal(!profileModal)} >
            <img src={firebase.user.photoURL} className="w-50 h-50" alt="" />
          </div>
        </div> ) : (<div className="collapse navbar-collapse" >
          <ul className="navbar-nav mx-auto">
            <li className="nav-item active">
              <Link className="nav-link" to='/login'>
                Login
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
            
          </ul>
        </div>)
        }
        
      </nav>
    </>
  );
}

export default Navbar;
