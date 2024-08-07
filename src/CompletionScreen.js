import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CommonStyles.css';
import './CompletionScreen.css';
import approval from './images/approval.png';

function CompletionScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount, recipient, message } = location.state || {};

  const handleBackToHome = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="completion-container">
      <div className="header3">
        <h1 className="centered-text">送金完了</h1>
      </div>
      <div className="content-wrapper3">
        <div className="completion-content">
            <img src={approval} alt="Approval Icon" />
          <h2>送金処理が完了しました</h2>
          {amount && recipient && (
            <p>{recipient}様へ{amount}円を送金しました。</p>
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

export default CompletionScreen;
