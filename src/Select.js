import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Select.css';
import './CommonStyles.css';

export const App = () => {
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const recipients = [
    { id: 1, name: '山田 太郎', icon: '🧑' },
    { id: 2, name: '鈴木 一郎', icon: '🧔' },
    { id: 3, name: '佐藤 花子', icon: '👩' },
    { id: 4, name: '田中 太郎', icon: '🧑' },
    { id: 5, name: '小林 次郎', icon: '🧔' },
    { id: 6, name: '高橋 花子', icon: '👩' },
    { id: 7, name: '伊藤 一郎', icon: '🧑' },
    { id: 8, name: '渡辺 次郎', icon: '🧔' },
    { id: 9, name: '加藤 花子', icon: '👩' },
    { id: 10, name: '松本 太郎', icon: '🧑' },
    { id: 11, name: '中村 次郎', icon: '🧔' },
    { id: 12, name: '小島 花子', icon: '👩' },
    { id: 13, name: '森田 太郎', icon: '🧑' },
    { id: 14, name: '横山 次郎', icon: '🧔' },
    { id: 15, name: '吉田 花子', icon: '👩' },
    { id: 16, name: '大島 太郎', icon: '🧑' },
    { id: 17, name: '藤田 次郎', icon: '🧔' },
    { id: 18, name: '西田 花子', icon: '👩' },
    { id: 19, name: '内田 太郎', icon: '🧑' },
    { id: 20, name: '石田 次郎', icon: '🧔' },
    { id: 21, name: '池田 花子', icon: '👩' },
    { id: 22, name: '佐々木 太郎', icon: '🧑' },
    { id: 23, name: '村田 次郎', icon: '🧔' },
    { id: 24, name: '岡田 花子', icon: '👩' },
    { id: 25, name: '清水 太郎', icon: '🧑' },
    { id: 26, name: '山下 次郎', icon: '🧔' },
    { id: 27, name: '松田 花子', icon: '👩' },
    { id: 28, name: '川村 太郎', icon: '🧑' },
    { id: 29, name: '林 次郎', icon: '🧔' },
    { id: 30, name: '金子 花子', icon: '👩' },
  ];

  const handleRecipientToggle = (id) => {
    setSelectedRecipients((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((recipientId) => recipientId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSubmit = () => {
    alert(`選択された送金先: ${selectedRecipients.join(', ')}`);
  };

  const filteredRecipients = recipients.filter((recipient) =>
    recipient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="common-header">
        <div style={{ height: "1vh" }}>
          <button className="common-back-button">
            戻る
          </button>
        </div>
        <h1>請求相手を選択</h1>
      </div>
      <div className="subheader-wrapper">
        <h2 className="subheader">請求先選択</h2>
      </div>
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="recipients-list">
        {filteredRecipients.map((recipient) => (
          <div
            key={recipient.id}
            onClick={() => handleRecipientToggle(recipient.id)}
            className={`recipient-item ${selectedRecipients.includes(recipient.id) ? 'selected' : ''}`}
          >
            {recipient.icon} {recipient.name}
          </div>
        ))}
      </div>
      <div className="subheader-wrapper">
        <h2 className="subheader">選択リスト</h2>
      </div>
      <div className="selected-recipients">
        {selectedRecipients.map((id) => {
          const recipient = recipients.find(r => r.id === id);
          return <div key={id} className="selected-recipient-item">{recipient.name}</div>;
        })}
      </div>
      <button 
        className="create-button" 
        onClick={handleSubmit} 
        disabled={selectedRecipients.length === 0}
      >
        作成
      </button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
