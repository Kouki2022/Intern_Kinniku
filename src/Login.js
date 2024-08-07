import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Login.css';

function Login() {
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const account_data = { accountNumber, password };
    
    //dbに接続してログイン情報があるか確認

    try {
      const response = await fetch('http://localhost:5000/account', {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin':'*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(account_data),
      });

      if (!response.ok) {
        alert('ログインに失敗しました。正しい口座番号とパスワードを入力してください。');
      } else {
        console.log(response)
        const userData = await response.json();
        console.log(userData)

        // localStorageにユーザ情報を保存
        localStorage.setItem('user', JSON.stringify(userData));

        console.log(userData)
        login();
        navigate('/');
      }
    } catch (error) {
      console.error('Error creating transaction:', error.message);
      // エラー時の処理
    }};

  return (
    <div className="login-container">
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="account-number">口座番号</label>
        <input
          type="text"
          id="account-number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="口座番号を入力"
          required
        />
        <label htmlFor="password">パスワード</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワードを入力"
          required
        />
        <button type="submit" className="login-button">ログイン</button>
      </form>
    </div>
  );
}

export default Login;