import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import group from '../assets/images/Group 6928.png'
import hack from '../assets/images/hack.svg'
import monitor from '../assets/images/monitor.svg'
import manage from '../assets/images/manage.svg'
import operation from '../assets/images/operation.png'
import one from '../assets/images/1.png'
import two from '../assets/images/2.png'
import three from '../assets/images/3.png'
import connect from '../assets/images/connect.png'
import quote from '../assets/images/quote.png'
import track from '../assets/images/track.png'
import mail from '../assets/images/mail.svg'
import card from '../assets/images/card.svg'
import cancel from '../assets/images/cancel.svg'
import deliver from '../assets/images/deliver.svg'
import refund from '../assets/images/refund.svg'
import coupon from '../assets/images/coupon.svg'
import menu from '../assets/images/menu.svg'
import close from '../assets/images/close.svg'

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='land'>
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
            <li><Link to="">About Us</Link></li>
        </ul>
      </div>

      <div className="buttons">
        <Link><button className="btn-hire"><a href="https://t.me/blackmarketalley">Hire Investigator</a></button></Link>
        <Link to="/main/home"><button className='btn-store'>Head to Store</button></Link>
      </div>

      <button className="btn-menu" onClick={toggleMenu}>
        <img src={menu} alt="" />
      </button>
    </nav>
      <div className="mobile-head">
        <h1>Hire A Hacker & Protect Your <span>Online Assets</span> With Professional Ethical <span>Hackers</span></h1>
        <p>Stay updated with the latest developments through our social media account ethical hacking services.</p>

        <div className="buttons">
            <a href=""><button className="enquire">Make Equiries</button></a>
            <a href=""><button className='touch'>Get in touch</button></a>
        </div>
      </div>
      <div className="banner">
        <h1>Hire A Hacker & Protect<br></br> Your <span>Online Assets</span> With Professional Ethical <span>Hackers</span></h1>
        <div className="buttons">
            <a href=""><button className="enquire">MAKE ENQUIRES</button></a>
            <a href=""><button className='touch'>GET IN TOUCH</button></a>
        </div>
      </div>

      <div className="services">
        <div className="head">
            <h2><span>Services</span> we offer</h2>
            <img src={group} alt="" />
        </div>

        <div className="offers">
            <article>
                <img src={hack} alt="" />
                <h3>Social Media Hacking</h3>
                <p>Our highly skilled personnel excel in ethical hacking services across various platforms, successfully penetrating email providers like Gmail, Yahoo Mail, Microsoft, Hotmail, Zoho, and Rediff using specialized password-breaking techniques. Additionally, we offer social media account hacking services, allowing you to monitor activities on Instagram, Snapchat, Facebook, and Twitter. Our capability to completely ghost individuals from social media platforms has significantly increased the demand for our services.</p>
            </article>

            <article>
                <img src={monitor} alt="" />
                <h3>Mobile monitoring</h3>
                <p>Our highly skilled personnel excel in ethical hacking services across various platforms. We have a proven track record of successfully penetrating email providers like Gmail, Yahoo Mail, Microsoft, Hotmail, Zoho, and Rediff using specialized password-breaking techniques, giving us an edge over our rivals. Additionally, our social media account hacking services allow you to monitor activities on Instagram, Snapchat, Facebook, and Twitter. Our unique ability to completely ghost individuals from social media platforms has significantly increased the demand for our services.</p>
            </article>

            <article>
                <img src={manage} alt="" />
                <h3>Reputation Management</h3>
                <p>Use our cheap hacker services to take charge of your internet reputation. Our ethical hackers for hire may assist you in promoting good messages about yourself or your company while helping you in removing fraudulent information, photographs, articles, or reviews that might be damaging your internet reputation. To properly control your reputation, contract a hacker.</p>
            </article>
        </div>

        <div className="buttons">
            <a href=""><button className="btn-req"><a href="https://t.me/blackmarketalley">Request Quote</a></button></a>
            <button className="btn-shop"><Link to="/main/home">Shop Now</Link></button>
        </div>
      </div>

      <div className="operation-container">
        <div className="head">
            <img src={operation} alt="" />
            <h2><span>Operation</span> Mode</h2>
        </div>

        <div className="operations">
            <div className="operation">
                <div className="text">
                    <div><img src={one} alt="" /> <h1>Connect</h1></div>
                    <p>Reach out to us through our contact form, email, or phone to discuss your specific needs and requirements.</p>
                </div>
                <div className="image-container">
                    <img src={connect} alt="" />
                </div>
            </div>
            <div className="operation quote">
            <div className="text">
                    <div><img src={two} alt="" /> <h1>Get Quote and Make Payment</h1></div>
                    <p>After understanding your requirements, we will provide you with a detailed quote. Once you agree, proceed to make the payment through our secure payment gateway.</p>
                </div>
                <div className="image-container">
                    <img src={quote} alt="" />
                </div>
            </div>
            <div className="operation">
            <div className="text">
                    <div><img src={three} alt="" /> <h1>Track Progress and Receive Results</h1></div>
                    <p>A dedicated specialist will be assigned to your case, providing regular updates on the progress. Upon completion, we will securely and confidentially deliver the results, ensuring your satisfaction with our services.</p>
                </div>
                <div className="image-container">
                    <img src={track} alt="" />
                </div>
            </div>
        </div>
      </div>

      <div className="faqs-container">
        <h1>FAQ</h1>
          <div className="faqs">
            <div className="faq">
              <img src={mail} alt="" />
              <h4>How do I change my account email?</h4>
              <p>You can log in to your account and change it from your Profile - Edit Profile. Then go to the general tab to change your email.</p>
            </div>
            <div className="faq">
              <img src={card} alt="" />
              <h4>What should I do if my payment fails?</h4>
              <p>If your payment fails, you can use the (COD) payment option, if available on that order. If your payment is debited from your account after a payment failure, it will be credited back within 7-10 days.</p>
            </div>
            <div className="faq">
              <img src={cancel} alt="" />
              <h4>What is your cancellation policy?</h4>
              <p>You can now cancel an order when it is in packed/shipped status. Any amount paid will be credited into the same payment mode using which the payment was made</p>
            </div>
            <div className="faq">
              <img src={deliver} alt="" />
              <h4>How do I check order delivery status ?</h4>
              <p>Please tap on “My Orders” section under main menu of App/Website/M-site to check your order status.</p>
            </div>
            <div className="faq">
              <img src={refund} alt="" />
              <h4>What is Instant Refunds?</h4>
              <p>Upon successful pickup of the return product at your doorstep, Myntra will instantly initiate the refund to your source account or chosen method of refund. Instant Refunds is not available in a few select pin codes and for all self ship returns.</p>
            </div>
            <div className="faq">
              <img src={coupon} alt="" />
              <h4>How do I apply a coupon on my order?</h4>
              <p>You can apply a coupon on cart page before order placement. The complete list of your unused and valid coupons will be available under “My Coupons” tab of App/Website/M-site.</p>
            </div>
          </div>
      </div>

      <div className="ques">
        <article>
          <h4>Still have questions?</h4>
          <p>Can’t find the answer you’re looking for? Please chat to our friendly team.</p>
        </article>
        <div className="button">
          <button className="btn-touch"><a href="https://t.me/blackmarketalley">Get in touch</a></button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
