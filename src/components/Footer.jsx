import React from 'react'
import { Link } from 'react-router-dom'
import facebook from '../assets/images/facebook.svg'
import instagram from '../assets/images/ig.svg'
import twitter from '../assets/images/tw.svg'

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <h4 className="logo">The Stealth Market</h4>

        <article>
                <h4>Get your products Today</h4>
                <p>Check our catalogue of products and select your choice</p>
         </article>
      </div>

      <div className="about">
            <ul>
                <li><Link to="/main/about-us">About us</Link></li>
                <li><Link to='/main/privacy'>Privacy</Link></li>
                <li><Link to="/main/terms">Terms of use</Link></li>
            </ul>

            <div className="socials">
                <img src={facebook} alt="" className='facebook' />
                <img src={instagram} alt="" />
                <img src={twitter} alt="" />
            </div>
      </div>
    </footer>
  )
}

export default Footer
