import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipientList.css';
import './CommonStyles.css';
import icon1 from './images/icon1.png';
import icon2 from './images/icon2.png';
import icon3 from './images/icon3.png';
import icon4 from './images/icon4.png';
import icon5 from './images/icon5.png';


// 4から9までのランダムな整数を生成する関数
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



function RecipientList() {
  const navigate = useNavigate();

  const get_recip = () => {

    //べた書き

    // 4から9までのランダムな整数を取得
    const id1= getRandomInt(4, 5);
    const id2 = getRandomInt(6, 7);
    const id3 = getRandomInt(8, 9);
    const id4 = getRandomInt(3,3)

    
    const id_data = { id1, id2, id3, id4 };
    
    //dbに接続してログイン情報があるか確認

    try {
      const response = fetch('http://localhost:5000/recip', {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin':'*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id_data),
      });
      console.log(response)
      const recip_Data = response.json();
      

      } catch (error) {
      console.error('Error creating transaction:', error.message);
      // エラー時の処理
    }};

  const recipients = [
    { id: 1, name: '山田 太郎', icon: icon1 },
    { id: 2, name: '鈴木 一郎', icon: icon2 },
    { id: 3, name: '佐藤 花子', icon: icon3 },
    { id: 4, name: '田中 真理', icon: icon4 },
    { id: 5, name: '伊藤 美咲', icon: icon5 },

  ];

  get_recip()

  const handleRecipientSelect = (recipient) => {
    navigate('/send', { state: { recipient } });
  };

  return (
    <div className="recipient-list-container">
      <div className="common-header">
        <button className="common-back-button" onClick={() => navigate('/')}>
          戻る
        </button>
        <h1>送金相手を選択</h1>
      </div>
      <div className="content-wrapper3">
        <div className="action-buttons">
          {recipients.map(recipient => (
            <button
              key={recipient.id}
              className="action-button recipient-button"
              onClick={() => handleRecipientSelect(recipient)}
            >
              <img src={recipient.icon} alt={recipient.name} className="recipient-icon" />
              {recipient.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecipientList;