import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CommonStyles.css';
import './PaymentDetail.css';

function PaymentDetail() {
  const navigate = useNavigate();

  return (
    <div className="payment-detail-container">
      <div className="header3">
        <button className="back-button" onClick={() => navigate('/')}>
          戻る
        </button>
        <h1>支払い詳細</h1>
      </div>
      <div className="content-wrapper3">
        <div className="payment-detail-card">
          <div className="payment-info">
            <p className="payment-date">2023年3月分</p>
            <p className="payment-date">2023年3月30日</p>
            <p className="payment-amount">5000円</p>
            <p className="payment-message">飲み会代お願いします！</p>
            <p className="payment-status">支払済み （1人）</p>
          </div>
          <div className="avatar-container">
            <img 
              src="https://via.placeholder.com/80"
              alt="avatar" 
              className="avatar-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentDetail;