import { Link } from 'react-router-dom';
import "../App.css";
import "../css/style.css";
import logo from "../images/logo.jpeg";

function Navbar() {
  return (
    <nav id="navbar">
      <div id="logo">
        <img src={logo} alt="Healthcare Management System" />
      </div>
      <ul>
        <li className="item">
          <Link to="/#home">Home</Link>
        </li>
        <li className="item">
          <Link to="/#services">Services</Link>
        </li>
        <li className="item">
          <Link to="/#clients">Our Clients</Link>
        </li>
        <li className="item">
          <Link to="/#contact">Contact</Link>
        </li>
         <li className="item">
          <Link to="/#reviews">Review</Link>
        </li>
        <li className="item">
          <Link to="/#location">Location</Link>
        </li>
        <li className='item'>
          <Link to="/login">
          Login
          </Link>
        </li>
        <li className="item">
          <Link to="/sign">Sign up</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;