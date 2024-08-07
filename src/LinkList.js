import React, { useState } from 'react';
import './LinkList.css';

const RequestLink = () => {
  const [linkCopied, setLinkCopied] = useState(null); // コピーしたリンクを特定するための状態
  const recipients = [
    { name: "山田太郎", link: "https://example.com/request-link?name=山田太郎" },
    { name: "鈴木花子", link: "https://example.com/request-link?name=鈴木花子" }
  ];

  // リンクをコピーする処理
  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    setLinkCopied(link);
    setTimeout(() => setLinkCopied(null), 2000);
  };

  // トップ画面に戻る処理
  const handleTop = () => {
    console.log('トップ画面に戻る');
  };

  // リンクを転送する処理
  const handleForward = (link) => {
    console.log(`リンクを転送する: ${link}`);
  };

  return (
    <div className="request-link-created">
      <header className="request-link-header1">
        <h1>請求リンクが作成されました</h1>
      </header>
      {recipients.map((recipient, index) => (
        <div key={index} className="recipient-block">
          <div className="recipient-name">宛名: {recipient.name}</div>
          <div className="link-display">{recipient.link}</div>
          <div className="button-group">
            <button
              className={`copy-button ${linkCopied === recipient.link ? 'copied' : ''}`}
              onClick={() => handleCopyLink(recipient.link)}
            >
              {linkCopied === recipient.link ? 'コピーしました！' : 'リンクをコピー'}
            </button>
            <button
              className="forward-button"
              onClick={() => handleForward(recipient.link)}
            >
              転送
            </button>
          </div>
        </div>
      ))}
      <div className="back-button-container">
        <button className="back-button" onClick={handleTop}>トップ画面に戻る</button>
      </div>
    </div>
  );
};

export default RequestLink;
