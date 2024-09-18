import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import cart from '../assets/images/cart.svg';
import { useCart } from '../context/CartContext';
import menu from '../assets/images/menu.svg'
import close from '../assets/images/close.svg'

const Navbar = () => {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav>
      <div className="logo">
        <h5>LOGO</h5>
      </div>

      <div className={`menu ${menuOpen ? 'open' : ''}`}>
      <button className="btn-close" onClick={toggleMenu}>
          <img src={close} alt="" />
          </button>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="https://t.me/blackmarketalley">Hire Investigator</a></li>
            <li><Link to="/main/home">Products</Link></li>
            <li><Link to="/main/about-us">About Us</Link></li>
        </ul>
      </div>

     <div className='icons'>
     <div className="icon-cart">
        <Link to="/main/cart"><img src={cart} alt="" /></Link>
        <span>{cartCount}</span>
      </div>

      <button className="btn-menu" onClick={toggleMenu}>
        <img src={menu} alt="" />
      </button>
     </div>
    </nav>
  );
}

export default Navbar;




