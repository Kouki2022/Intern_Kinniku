import React from 'react';
import { useNavigate} from 'react-router-dom';
import Person from './Person';
import './TopPage.css';
import './CommonStyles.css'
import SendIcon from '@mui/icons-material/Send';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import HistoryIcon from '@mui/icons-material/History';

const TopPage = () => {
  const navigate = useNavigate();
  
  //ローカルストレージからユーザ情報を取得
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user)


  return (
    <div className="toppage-container1">
      <header className="app-header1">
        <h1>Quick Transfer</h1>
      </header>
      <main className="content-wrapper1">
        <Person user={user} />
        <div className="action-buttons1">
          <button className="action-button1 send-money" onClick={() => navigate('/recipients')}>
            <SendIcon className="icon1" /> 送金する
          </button>
          <button className="action-button1 request-money" onClick={() => navigate('/request')}>
            <RequestPageIcon className="icon1" /> 請求する
          </button>
          <button className="action-button1 read-history" onClick={() => navigate('/payment-screen')}>
            <HistoryIcon className="icon1" /> 履歴を見る
          </button>
        </div>
      </main>
    </div>
  );
}

export default TopPage;