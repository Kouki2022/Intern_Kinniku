import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './Request.css';
import './CommonStyles.css';

const Request = () => {
  const navigate = useNavigate();
  const amountRef = useRef(null);
  const messageRef = useRef(null);
  const [amountError, setAmountError] = useState('');
  const [template, setTemplate] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const validateAmount = (value) => {
    if (value === '') return '請求金額を入力してください';
    if (value.startsWith('0')) return '0から始まる数字は入力できません';
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

  const handleTemplateChange = (e) => {
    const selectedTemplate = e.target.value;
    setTemplate(selectedTemplate);
    messageRef.current.value = selectedTemplate;
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

    navigate('/requestlink', { state: { amount, message } });
  }

  useEffect(() => {
    const amount = amountRef.current?.value;
    setIsButtonDisabled(validateAmount(amount) !== '');
  }, [amountError]);

  const buttonStyle = {
    backgroundColor: isButtonDisabled ? '#ccc' : '#e91e63',
    color: 'white',
    cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
  };

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
          <div className="template-selector">
            <select id="template" value={template} onChange={handleTemplateChange}>
              <option value="">テンプレートを選択</option>
              <option value="ありがとうございます。">ありがとうございます。</option>
              <option value="お世話になっております。">お世話になっております。</option>
              <option value="よろしくお願いします。">よろしくお願いします。</option>
            </select>
          </div>
          <textarea 
            id="message"
            placeholder="飲み会代お願いします！"
            ref={messageRef}
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
          ></textarea>
        </div>
        <div className='request-submit-button'>
          <button 
            type="submit" 
            disabled={isButtonDisabled}
            style={buttonStyle}
          >
            請求先を指定する
          </button>
        </div>
      </form>
    </div>
  );
}

export default Request;