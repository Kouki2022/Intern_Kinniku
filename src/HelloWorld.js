import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './HelloWorld.css';
import './CommonStyles.css';
import icon1 from './images/icon1.png';

function HelloWorld() {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [template, setTemplate] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const recipient = location.state?.recipient || { name: 'サンプル氏名', icon: icon1 };

    
    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleTemplateChange = (event) => {
        const selectedTemplate = event.target.value;
        setTemplate(selectedTemplate);
        setMessage(selectedTemplate); // テンプレートを選択するとメッセージフィールドに反映
    };

    const handleSend = () => {
        if (amount > 0 && amount <= 50000) {
            // 送金処理が成功したと仮定
            navigate('/completion', { 
                state: { 
                    amount: amount,
                    recipient: recipient.name,
                    message: message
                }
            });
        }
    };

    return (
        <div className="hello-world-container">
            <div className="common-header">
                <button className="common-back-button" onClick={() => navigate('/recipients')}>
                    戻る
                </button>
                <h1>送金</h1>
            </div>
            <div className="content-wrapper3">
                <h2>送金先</h2>
                <div className="recipient">
                    <img src={recipient.icon} alt={recipient.name} className="recipient-icon" />
                    <h3>{recipient.name}</h3>
                </div>
                <div className="limit-info">送金上限額: 50,000円</div>
                <div className="amount-input">
                    <label htmlFor="amount">送金金額:</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={handleAmountChange}
                        placeholder="円"
                        min="1"
                    />
                </div>
                <div className="message-input">
                    <label htmlFor="message">メッセージ:</label>
                    <select id="template" value={template} onChange={handleTemplateChange}>
                        <option value="">テンプレートを選択</option>
                        <option value="ありがとうございます。">ありがとうございます。</option>
                        <option value="お世話になっております。">お世話になっております。</option>
                        <option value="よろしくお願いします。">よろしくお願いします。</option>
                    </select>
                    <input
                        type="text"
                        id="message"
                        value={message}
                        onChange={handleMessageChange}
                        placeholder="任意"
                    />
                </div>
                <button
                    className="send-button"
                    onClick={handleSend}
                    disabled={!amount || amount <= 0 || amount > 50000}
                >
                    送金
                </button>
            </div>
        </div>
    );
}

export default HelloWorld;