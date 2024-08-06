from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS
from db import insert_past, get_data_sender, account_search



app = Flask(__name__)

#CORSエラー回避
CORS(
    app,
    supports_credentials=True
)

@app.route('/account', methods=['POST'])
def account_check():

    #reactからの値の取得
    accountNumber = request.json['accountNumber']
    password = request.json['password']
    print(accountNumber,password)

    det = account_search(accountNumber, password)
    
    # print(det)

    if(det):
        print('success\n')
        #エラーがないときは200を返す
        return jsonify(), 200
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