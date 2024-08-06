import React from 'react';

const Person = () => {
    return (
        <div className='Person-wrapper'>
            <div className='Person-container'>
                <img src='https://via.placeholder.com/150' alt='Person' />
                <div className='name'>
                    <h2>サンプル氏名</h2>
                </div>
            </div>
            <div className='account-details'>
                <p className='account-number'>口座番号:0000000</p>
                <div className='balance'>
                    <p>預金残高</p>
                    <h3>50,000円</h3>
                </div>
            </div>

            <style jsx>{`
                .Person-wrapper {
                    background-color: #f0f0f0;
                    border-radius: 10px;
                    padding: 20px;
                    max-width: 400px;
                }

                .Person-container {
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                }

                img {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    margin-right: 20px;
                    background-color: #ffd700;
                }

                .name {
                    flex-grow: 1;
                }

                h2 {
                    margin: 0;
                    font-size: 20px;
                    color: #333;
                }

                .account-details {
                    background-color: white;
                    border-radius: 8px;
                    padding: 15px;
                }

                .account-number {
                    margin: 0 0 10px 0;
                    font-size: 14px;
                    color: #666;
                }

                .balance {
                    background-color: #f9f9f9;
                    border-radius: 6px;
                    padding: 10px;
                }

                .balance p {
                    margin: 0;
                    font-size: 14px;
                    color: #666;
                }

                .balance h3 {
                    margin: 5px 0 0;
                    font-size: 22px;
                    color: #333;
                    font-weight: bold;
                }
            `}</style>
        </div>
    );
}

export default Person;