import React from 'react';
import { useLocation } from 'react-router-dom';
import btcQrCode from '../assets/images/btc.png'; // Replace with actual QR code images
import usdtQrCode from '../assets/images/usdt.png';
import ethQrCode from '../assets/images/eth.png';

const PaymentPage = () => {
    const { crypto } = useParams();
    const location = useLocation();
    const amount = location.state?.amount || 0;
  
  
    const qrCodeMap = {
      bitcoin: btcQrCode,
      usdt: usdtQrCode,
      ethereum: ethQrCode,
    };
  
    const qrCodeSrc = qrCodeMap[crypto] || btcQrCode; // Default to Bitcoin if not found
  
    return (
      <div className="payment-page">
        <h4>Payment</h4>
        <p>Scan the QR code below to complete your payment.</p>
        <div className="qr-code">
          <img src={qrCodeSrc} alt={`${crypto} QR Code`} />
        </div>
        <div className="payment-details">
          <p><strong>Amount:</strong> {`${amount.toFixed(2)} ${crypto.toUpperCase()}`}</p>
        </div>
      </div>
    );
  }
  
  export default PaymentPage;



