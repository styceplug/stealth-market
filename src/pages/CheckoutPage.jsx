import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import your Firebase configuration
import Spinner from '../components/Spinner';
import visa from '../assets/images/Visa.png';
import discover from '../assets/images/Discover.png';
import maestro from '../assets/images/Maestro.png';
import mastercard from '../assets/images/Mastercard.png';
import btcIcon from '../assets/images/btc.png';
import usdtIcon from '../assets/images/usdt.png';
import ethIcon from '../assets/images/eth.png';
import uspsFirstClassIcon from '../assets/images/usps_first_class.png';
import uspsPriorityIcon from '../assets/images/usps_priority.png';
import btcQr from '../assets/images/btc_qr.png';
import usdtQr from '../assets/images/usdt_qr.png';
import ethQr from '../assets/images/eth_qr.png';
import copy from '../assets/images/copy-icon.svg';
import xmrIcon from '../assets/images/xmr.png';
import xmrQr from '../assets/images/xmr_qr.png';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useContext(CartContext);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    streetAddress: '',
    state: '',
    city: '',
    zip: '',
    phoneNumber: '',
    isBillingSame: false,
    paymentMethod: 'crypto',
    crypto: 'bitcoin',
    shippingMethod: 'usps_first_class',
    orderComment: '',
    agreeToTerms: false,
  });

  const [subtotal, setSubtotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(2.99);
  const [warrantyFee, setWarrantyFee] = useState(9.80);
  const [taxFee, setTaxFee] = useState(9.80);
  const [grandTotal, setGrandTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [cryptoPrices, setCryptoPrices] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isPaymentSubmitted, setIsPaymentSubmitted] = useState(false);
  const [cryptoDetails, setCryptoDetails] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  const btcAddress = "bc1qm9qgfj8fzcp2u9tfyew683e07h36tnjvjrehy0";
  const usdtAddress = "0x5420B4B623733BCE5344c7cDf5aa01fa6db0A0cD";
  const ethAddress = "bnb1qmfc5lsgk4tjklz3h0kf9lv2yjkls550h5sr8d";
  const xmrAddress = "46HUYekyuixMsDtMpMkSsJHV7miEgLA2GLqU1WSHULjH5Qjr8zLtx9whMFD8sRqqBg1xnxDRNjXawMskHJAPFkoGTh4NEVS";

  const SHIPPING_FEES = {
    usps_first_class: {
      bitcoin: 0.00005227,
      usdt: 2.99,
      ethereum: 0.00123,
      xmr: 0.0194,
    },
    fedex: {
      bitcoin: 0.00015732,
      usdt: 9.00,
      ethereum: 0.00369,
      xmr: 0.0584,
    }
  };
  
  const WARRANTY_FEES = {
    bitcoin: 0.00017134,
    usdt: 9.80,
    ethereum: 0.00402,
    xmr: 0.0636,
  };
  
  const TAX_FEES = {
    bitcoin: 0.00017134,
    usdt: 9.80,
    ethereum:0.00402,
    xmr: 0.0636,
  };
  
  

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch('/products.json');
        const data = await response.json();
        setCryptoPrices(data.cryptoPrices);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, []);

  useEffect(() => {
    const calcSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setSubtotal(calcSubtotal);
    const calcShippingFee = form.shippingMethod === 'usps_first_class' ? 2.99 : 9.00;
    setShippingFee(calcShippingFee);

    const discountAmount = location.state?.discount || 0;
    setDiscount(discountAmount);

    setGrandTotal(calcSubtotal + calcShippingFee + warrantyFee + taxFee - discountAmount);
  }, [cartItems, form.shippingMethod, warrantyFee, taxFee, location.state?.discount]);

  useEffect(() => {
    let timer;
    if (cryptoDetails) {
      // Countdown timer
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            navigate('/cart'); // Redirect to cart page when time is up
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000); // Update every second

      // Clear timer if the component unmounts or cryptoDetails changes
      return () => clearInterval(timer);
    }
  }, [cryptoDetails, navigate]);
  

  // Format time in MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleCheckboxChange = () => {
    setForm(prevForm => ({ ...prevForm, isBillingSame: !prevForm.isBillingSame }));
  };

  const handlePaymentMethodChange = (e) => {
    setForm(prevForm => ({ ...prevForm, paymentMethod: e.target.value }));
  };

  const handleCryptoChange = (e) => {
    setForm(prevForm => ({ ...prevForm, crypto: e.target.value }));
  };

  const handleShippingMethodChange = (e) => {
    setForm(prevForm => ({ ...prevForm, shippingMethod: e.target.value }));
  };

  const handleBillingSubmit = (e) => {
    e.preventDefault();
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
  
    if (form.paymentMethod === 'card') {
      alert("Credit card payments are not available at this time. Please select a cryptocurrency option.");
      return;
    }
  
    if (!form.agreeToTerms) {
      alert("You must agree to the privacy policy and terms.");
      return;
    }
  
    if (form.paymentMethod !== 'crypto') {
      alert("Please select Cryptocurrency as your payment method.");
      return;
    }
  
    // Calculate total crypto price for all items
    let totalCryptoPrice = 0;
    cartItems.forEach(item => {
      const itemPrice = item.cryptoPrices[form.crypto] || 0;
      const itemTotalPrice = itemPrice * item.quantity;
      totalCryptoPrice += itemTotalPrice;
    });
  
    // Apply discount in cryptocurrency
    const discountAmountInCrypto = (discount / subtotal) * totalCryptoPrice;
    totalCryptoPrice -= discountAmountInCrypto;
  
    // Get fees based on selected cryptocurrency and shipping method
    const shippingFee = (SHIPPING_FEES[form.shippingMethod] && SHIPPING_FEES[form.shippingMethod][form.crypto]) || 0;
    const warrantyFee = WARRANTY_FEES[form.crypto] || 0;
    const taxFee = TAX_FEES[form.crypto] || 0;
  
    // Calculate grand total in cryptocurrency and round to 5 decimal places
    const cryptoGrandTotal = (totalCryptoPrice + shippingFee + warrantyFee + taxFee).toFixed(5);
  
    // Set payment QR code and address based on cryptocurrency
    let qrCode, address, icon;
    switch (form.crypto) {
      case 'bitcoin':
        qrCode = btcQr;
        address = btcAddress;
        icon = btcIcon;
        break;
      case 'usdt':
        qrCode = usdtQr;
        address = usdtAddress;
        icon = usdtIcon;
        break;
      case 'ethereum':
        qrCode = ethQr;
        address = ethAddress;
        icon = ethIcon;
        break;
        case 'xmr':
          qrCode = xmrQr; // Assuming you have an XML QR code image
          address = xmrAddress;
          icon = xmrIcon; // Assuming you have an XML icon image
          break;
      default:
        qrCode = btcQr;
        address = btcAddress;
        icon = btcIcon;
    }
  
    const cryptoDetailsData = {
      icon,
      qrCode,
      address,
      crypto: form.crypto.toUpperCase(),
      cryptoGrandTotal,
    };
  
    setCryptoDetails(cryptoDetailsData);
    setIsPaymentSubmitted(true);
  
  
    // Save billing address to Firestore
    try {
      await setDoc(doc(collection(db, "billingAddresses")), {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        streetAddress: form.streetAddress,
        state: form.state,
        city: form.city,
        zip: form.zip,
        phoneNumber: form.phoneNumber,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error saving billing address:", error);
    }
  };
  
  const handleTermsChange = () => {
    setForm(prevForm => ({ ...prevForm, agreeToTerms: !prevForm.agreeToTerms }));
  };

  const handlePaymentMade = () => {
  
    // Show alert instead of navigating
    alert("Payment complete, wait for verification");
    navigate('/main/home');
  };
  

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="checkout-page">
      {!isPaymentSubmitted && (
        <div className="checkout">
          <h4>Checkout</h4>
          <p>Proceed to fill in required details <Link to="/main/home">Return Home</Link></p>
        </div>
      )}

      <div className="container">
        {!isPaymentSubmitted && (
          <div className="details">
            <form onSubmit={handleBillingSubmit}>
              <h5>Billing Address</h5>
              <div className="form-groups">
                <div className="group">
                  <label>First Name</label>
                  <input type="text" name="firstName" value={form.firstName} onChange={handleInputChange} required />
                </div>
                <div className="group">
                  <label>Last Name</label>
                  <input type="text" name="lastName" value={form.lastName} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={form.email} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Street Address</label>
                <input type="text" name="streetAddress" value={form.streetAddress} onChange={handleInputChange} required />
              </div>
              <div className="form-groups">
                <div className="group">
                  <label>State</label>
                  <input type="text" name="state" value={form.state} onChange={handleInputChange} required />
                </div>
                <div className="group">
                  <label>City</label>
                  <input type="text" name="city" value={form.city} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="form-groups">
                <div className="group">
                  <label>Zip / Postal Code</label>
                  <input type="text" name="zip" value={form.zip} onChange={handleInputChange} required />
                </div>
                <div className="group">
                  <label>Phone Number</label>
                  <input type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="grouped ship-two">
                <input type="checkbox" checked={form.isBillingSame} onChange={handleCheckboxChange} />
                <label>Shipping address is the same as billing address</label>
              </div>
            </form>

            <form onSubmit={handlePaymentSubmit} className="method">
              <h5>Shipping Method</h5>
              <div className="shipping-methods">
                <label className="shipping-option">
                  <input type="radio" value="usps_first_class" checked={form.shippingMethod === 'usps_first_class'} onChange={handleShippingMethodChange} />
                  <div className="shipping-label">
                    <div className="shipping-info">
                      <span className="price">$2.99</span>
                      <span>USPS 1st Class With Tracking</span>
                      <span>(5 - 13 days)</span>
                    </div>
                    <img src={uspsFirstClassIcon} alt="USPS 1st Class" />
                  </div>
                </label>
                <label className="shipping-option">
                  <input type="radio" value="usps_priority" checked={form.shippingMethod === 'usps_priority'} onChange={handleShippingMethodChange} />
                  <div className="shipping-label">
                    <div className="shipping-info">
                      <span className="price">$9.00</span>
                      <span>USPS PRIORITY With Tracking</span>
                      <span>(5 - 10 days)</span>
                    </div>
                    <img src={uspsPriorityIcon} alt="USPS Priority" />
                  </div>
                </label>
              </div>
              <h5>Payment Method</h5>
              <div className="payment-methods">
                <label className="payment-option">
                  <input type="radio" value="crypto" checked={form.paymentMethod === 'crypto'} onChange={handlePaymentMethodChange} />
                  <div className="payment-label">
                    <span>Cryptocurrency</span>
                    <span>You'd be given an automated wallet, make payment and confirm transaction</span>
                  </div>
                </label>
                
                {form.paymentMethod === 'crypto' && (
                  <div className="crypto-options">
                    <label className="crypto-option">
                      <input type="radio" value="bitcoin" checked={form.crypto === 'bitcoin'} onChange={handleCryptoChange} />
                      <div className="crypto-label">
                        <span>BTC</span>
                        <span>Faster Option</span>
                        <img src={btcIcon} alt="Bitcoin" />
                      </div>
                    </label>
                    <label className="crypto-option">
                      <input type="radio" value="usdt" checked={form.crypto === 'usdt'} onChange={handleCryptoChange} />
                      <div className="crypto-label">
                        <span>USDT</span>
                        <img src={usdtIcon} alt="Tether" />
                      </div>
                    </label>
                    <label className="crypto-option">
                      <input type="radio" value="ethereum" checked={form.crypto === 'ethereum'} onChange={handleCryptoChange} />
                      <div className="crypto-label">
                        <span>ETH</span>
                        <img src={ethIcon} alt="Ethereum" />
                      </div>
                    </label>
                    <label className="crypto-option">
                     <input type="radio" value="xmr" checked={form.crypto === 'xmr'} onChange={handleCryptoChange} />
                    <div className="crypto-label">
                    <span>XMR</span>
                   <img src={xmrIcon} alt="XMR" /> {/* Add XMR  icon */}
                    </div>
                      </label>
                  </div>
                )}

                <label className="payment-option move">
                  <input type="radio" value="card" checked={form.paymentMethod === 'card'} onChange={handlePaymentMethodChange} />
                  <div className="payment-label">
                    <span>Pay with Credit Card</span>
                    <div className="card-icons">
                      <img src={visa} alt="Visa" />
                      <img src={discover} alt="Discover" />
                      <img src={maestro} alt="Maestro" />
                      <img src={mastercard} alt="MasterCard" />
                    </div>
                    <div className="coming-soon">Coming Soon...</div>
                  </div>
                </label>
              </div>
              <div className="privacy">
                <input type="checkbox" checked={form.agreeToTerms} onChange={handleTermsChange} />
                <label>I agree to the <Link to="/main/privacy">Privacy Policy</Link> and <Link to="/main/terms">Terms and Conditions</Link></label>
              </div>
            </form>
          </div>
        )}

        <div className="summary">
          <h5>Billing Summary</h5>
          <div className="info">
            <div className="form-group">
              <label>Subtotal</label>
              <span>{`$${subtotal.toFixed(2)}`}</span>
            </div>
            <div className="form-group">
              <label>Warranty (platinum)</label>
              <span>${warrantyFee.toFixed(2)}</span>
            </div>
            <div className="form-group">
              <label>Shipping Fee</label>
              <span>{`$${shippingFee.toFixed(2)}`}</span>
            </div>
            <div className="form-group">
              <label>Tax</label>
              <span>${taxFee.toFixed(2)}</span>
            </div>
            <div className="form-group">
              <label>Discount</label>
              <span>-${discount.toFixed(2)}</span>
            </div>
          </div>
          <div className="total">
            <label>Grand Total</label>
            <span>{`$${grandTotal.toFixed(2)}`}</span>
          </div>
          <div className="comment">
            <label>Order Comment</label>
            <textarea name="orderComment" value={form.orderComment} onChange={handleInputChange} placeholder='Type here...'></textarea>
          </div>

          {/* Hide Pay Button if payment is submitted */}
          {!cryptoDetails && (
            <button type="submit" className="pay-button" onClick={handlePaymentSubmit}>
              Pay {`$${grandTotal.toFixed(2)}`}
            </button>
          )}
        </div>

        {cryptoDetails && (
        <div className="crypto-details">
          <div className="head">
            <img src={cryptoDetails.icon} alt={`${cryptoDetails.crypto} Icon`} />
            <h5>Pay with {cryptoDetails.crypto}</h5>
          </div>
          <div className="qr-container">
            <img src={cryptoDetails.qrCode} alt={`${cryptoDetails.crypto} QR Code`} className="qr-img" />
          </div>
          <div className="crypto-payment-details">
            <h5>Payment Details</h5>
            <article>
              <h6>Payment Unique Address</h6>
              <div className="copy">
                <p className='add'>{cryptoDetails.address}</p>
                <button onClick={() => navigator.clipboard.writeText(cryptoDetails.address)}>
                  <img src={copy} alt="Copy Icon" />
                </button>
              </div>
            </article>
            <article>
              <h6>Amount to Pay</h6>
              <div className="copy">
                <p>{cryptoDetails.cryptoGrandTotal} {cryptoDetails.crypto}</p>
                <button onClick={() => navigator.clipboard.writeText(cryptoDetails.cryptoGrandTotal)}>
                  <img src={copy} alt="Copy Icon" />
                </button>
              </div>
            </article>
             <div className="timer">
            <h5>Time Left</h5>
            <span>{formatTime(timeLeft)}</span>
          </div>
          </div>
          <button className="btn-made" onClick={handlePaymentMade}>
          Payment Made
        </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default CheckoutPage;
































