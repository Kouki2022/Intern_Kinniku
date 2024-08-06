import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Request.css';
import './CommonStyles.css';

const Request = () => {
  const navigate = useNavigate();
  const amountRef = useRef(null);
  const messageRef = useRef(null);
  const [amountError, setAmountError] = useState('');

  const validateAmount = (value) => {
    if (value === '') return '';
    if (!Number.isInteger(Number(value)) || Number(value) <= 0) {
      return '1円以上の整数を入力してください';
    }
    if (Number(value) >= 1000000) {
      return '100万円未満の金額を入力してください';
    }
    return '';
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmountError(validateAmount(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = amountRef.current.value;
    const message = messageRef.current.value;

    const error = validateAmount(amount);
    if (error) {
      setAmountError(error);
      return;
    }

    console.log('請求金額:', amount, '円');
    console.log('メッセージ:', message);

    navigate('/request-link', { state: { amount, message } });
    // ここで請求リンク作成のロジックを実装し、成功したら完了画面に遷移する
    // 例: navigate('/request-complete', { state: { amount, message } });
  }

  return (
    <div className="request-container">
      <div className="common-header">
        <button className="common-back-button" onClick={() => navigate('/')}>
          戻る
        </button>
        <h1>請求リンクの作成</h1>
      </div>
      <form onSubmit={handleSubmit} className="request-form">
        <div className='request-money1'>
          <label htmlFor="amount">請求金額</label>
          <div className="input-wrapper">
            <input 
              type="number" 
              id="amount" 
              placeholder="3000" 
              ref={amountRef}
              onChange={handleAmountChange}
              className={amountError ? 'error' : ''}
            />
            <span className="currency">円</span>
          </div>
          {amountError && <div className="error-message">{amountError}</div>}
        </div>
        <div className='request-message-container'>
          <label htmlFor="message">メッセージ（任意）</label>
          <textarea id="message" placeholder="飲み会代お願いします！" ref={messageRef}></textarea>
        </div>
        <div className='request-submit-button'>
          <button type="submit">リンクを作成</button>
        </div>
      </form>
    </div>
  );
}

export default Request;