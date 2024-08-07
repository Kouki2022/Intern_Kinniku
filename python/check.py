from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS
from db import get_data_sender, account_search, insert_send, balance_send, get_recip



app = Flask(__name__)

#CORSエラー回避
CORS(
    app,
    supports_credentials=True
)


#ログイン時に使用
@app.route('/account', methods=['POST'])
def account_check():

    #reactからの値の取得
    accountNumber = request.json['accountNumber']
    password = request.json['password']
    print(accountNumber,password)

    user = account_search(accountNumber, password)

    # print(user)

    if(user):
        print('success\n')
        return list(user)
    else:
        print('lost\n')
        return jsonify(), 300


#送金時に使用
@app.route('/send-money', methods=['POST'])
def send():

    #reactからの値の取得
    sender_id = request.json['sender_id']
    receiver_id = request.json['receiver_id']
    amount = request.json['amount']
    type = request.json['type']
    message = request.json['message']
    determination = request.json['determination']

    print(sender_id, receiver_id, amount, type,  message, determination)

    #履歴データベースに追加
    det = insert_send(sender_id, receiver_id, amount, type,  message, determination)
    
    #残高の増減
    det2 = balance_send(sender_id, receiver_id, amount)


    if(det & det2):
        print('success\n')
        return jsonify(), 200
    else:
        print('lost\n')
        return jsonify(), 300




@app.route('/recip', methods=['POST'])
def recip():

    #reactからの値の取得
    id1 = request.json['id1']
    id2 = request.json['id2']
    id3 = request.json['id3']
    id4 = request.json['id4']

    recipient = get_recip(id1, id2, id3, id4)

    print(recipient)

    # print(user)

    if(recipient):
        print('success\n')
        return recipient
    else:
        print('lost\n')
        return jsonify(), 300





# テスト
@app.route('/send', methods=['POST'])
def create_transaction():

    if not request.json or 'amount' not in request.json or 'message' not in request.json:
        return jsonify({'error': 'Invalid request, missing amount or message'}), 400


    #reactからの値の取得
    amount = request.json['amount']
    message = request.json['message']

    print(amount)



    #dbにデータ追加のテスト
    data = (15, 111, 4040, 'request', 'これが追加されたら成功', True)
    insert_past(data)



    #dbからデータ取得
    list1 = get_data_sender(1)
    print(list1)




    
    #エラーがないときは200を返す
    return jsonify(amount), 200




if __name__ == '__main__':
    app.run(debug=True)
