import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipientList.css';
import './CommonStyles.css';
import icon1 from './images/icon1.png';
import icon2 from './images/icon2.png';
import icon3 from './images/icon3.png';
import icon4 from './images/icon4.png';

function RecipientList() {
  const navigate = useNavigate();
  const [recipients, setRecipients] = useState([]);

  const get_recip = async () => {
    // 4から9までのランダムな整数を取得
    const id1 = 4;
    const id2 = 6;
    const id3 = 8;
    const id4 = 3;

    const id_data = { id1, id2, id3, id4 };

    try {
      const response = await fetch('http://localhost:5000/recip', {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id_data),
      });

      const recip_Data = await response.json();

      const tmp = [
        { id: recip_Data[0][0], name: recip_Data[0][2], icon: icon1 },
        { id: recip_Data[1][0], name: recip_Data[1][2], icon: icon2 },
        { id: recip_Data[2][0], name: recip_Data[2][2], icon: icon3 },
        { id: recip_Data[3][0], name: recip_Data[3][2], icon: icon4 },
      ];

      setRecipients(tmp);
    } catch (error) {
      console.error('Error fetching recipients:', error.message);
    }
  };

  useEffect(() => {
    get_recip();
  }, []);

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
          {recipients.map((recipient) => (
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