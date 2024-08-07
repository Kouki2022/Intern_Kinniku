import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CommonStyles.css';
import './PaymentCompletion.css';
import approval from './images/approval.png';

function PaymentCompletionScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount, recipient, message } = location.state || {};

  const handleBackToHome = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="Paymentcom-container">
      <div className="Paymentcom-header3">
        <h1 className="Paymentcom-text">支払い完了</h1>
      </div>
      <div className="Paymentcom-wrapper3">
        <div className="Paymentcom-content">
            <img src={approval} alt="Approval Icon" />
          <h2>請求書の支払いが完了しました</h2>
          {amount && recipient && (
            <p>{recipient}様へ{amount}円を支払いました。</p>
          )}
          {message && (
            <p>メッセージ: {message}</p>
          )}
        </div>
        <button 
          onClick={handleBackToHome}
          className="back-to-home-button"
        >
          トップ画面に戻る
        </button>
      </div>
    </div>
  );
}

export default PaymentCompletionScreen;

