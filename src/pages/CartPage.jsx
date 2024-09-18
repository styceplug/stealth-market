import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const calculateDiscount = () => {
    return couponCode === 'Firsttimeruser' ? totalPrice * 0.10 : 0;
  };

  const handleCheckout = () => {
    const discountAmount = calculateDiscount();
    navigate('/main/checkout', { state: { discount: discountAmount } });
  };

  return (
    <div className="cart-container">
      <div className='cart'>
        <article>
          <h1>Your Cart</h1>
          <p>Not ready to checkout? Continue Shopping</p>
        </article>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="image-container">
                  {item.images.length > 0 && (
                    <img 
                      src={item.images[0]} 
                      alt={item.name} 
                      onError={(e) => {
                        console.error(`Failed to load image: ${item.images[0]}`);
                        e.target.style.display = 'none';
                      }} 
                    />
                  )}
                </div>
                <div className="product-info">
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Category: {item.category}</p>  
                  <div className="proceed">
                    <h4>${item.price}</h4>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <form action="">
        <div className="order">
          <h2>Order Summary</h2>
          <input 
            type="text" 
            placeholder='Enter coupon code here' 
            value={couponCode} 
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <div className="sub-total">
            <p>Sub total</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
          <div className="ship">
            <p>Shipping</p>
            <p>Calculated at the next step</p>
          </div>
          <div className="total-price">
            <p>Total</p>
            <p>${(totalPrice - calculateDiscount()).toFixed(2)}</p>
          </div>
          <button className="btn-continue" type="button" onClick={handleCheckout}>Continue to checkout</button>
        </div>
      </form>
    </div>
  );
}

export default CartPage;











