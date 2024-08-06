import sqlite3

dbFile = 'test.db'

# 既存のテーブルを削除（存在する場合）
conn = sqlite3.connect(dbFile)
cursor = conn.cursor()

cursor.execute('DROP TABLE IF EXISTS transactions')
cursor.execute('DROP TABLE IF EXISTS users')

# ユーザーテーブルの作成
cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    password STRING,
    user_name TEXT NOT NULL,
    photo BLOB,
    balance REAL,
    account_number INTEGER,
    registered_id INTEGER
)
''')

# 履歴テーブルの作成
cursor.execute('''
CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_id INTEGER,
    receiver_id INTEGER,
    amount REAL NOT NULL,
    request_date DATETIME DEFAULT (datetime('now')),
    send_date DATETIME DEFAULT (datetime('now')),
    message TEXT,
    determination BOOLEAN,
    type TEXT NOT NULL, --請求送金判別カラム  
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id)
)
''')

# テストデータの挿入
users_data = [
    (1, 'password1', 'User1', None, 1000.0, 123456, 1001),
    (2, 'password2', 'User2', None, 1500.0, 123457, 1002),
    (3, 'password3', 'User3', None, 2000.0, 123458, 1003),
    (4, 'password4', 'User4', None, 2500.0, 123459, 1004),
    (5, 'password5', 'User5', None, 3000.0, 123460, 1005),
    (6, 'password6', 'User6', None, 3500.0, 123461, 1006),
    (7, 'password7', 'User7', None, 4000.0, 123462, 1007),
    (8, 'password8', 'User8', None, 4500.0, 123463, 1008),
    (9, 'password9', 'User9', None, 5000.0, 123464, 1009),
    (10, 'password10', 'User10', None, 5500.0, 123465, 1010)
]

cursor.executemany('''
INSERT INTO users (id, password, user_name, photo, balance, account_number, registered_id)
VALUES (?, ?, ?, ?, ?, ?, ?)
''', users_data)

# サンプルトランザクションデータの挿入
transactions_data = [
    (1, 2, 100.0, 'send', 'こんにちは', True),
    (1, 3, 200.0, 'request', 'んにち', False),
    (1, 4, 300.0, 'send', 'こんには', True),
    (4, 5, 400.0, 'request', 'んにちは', False),
    (5, 6, 500.0, 'send', 'にちは', True),
    (6, 7, 600.0, 'request', 'こちは', False),
    (7, 8, 700.0, 'send', 'こは', True),
    (8, 9, 800.0, 'request', 'いい', False),
    (9, 10, 900.0, 'send', 'ああ', True),
    (10, 1, 1000.0, 'request', 'よろしくお願いします', False)
]

cursor.executemany('''
INSERT INTO transactions (sender_id, receiver_id, amount, type, message, determination)
VALUES (?, ?, ?, ?, ?, ?)
''', transactions_data)



def insert_past(data):
    conn = sqlite3.connect(dbFile)
    cursor = conn.cursor()
    cursor.execute('''INSERT INTO transactions (sender_id, receiver_id, amount, type, message, determination)
    VALUES (?, ?, ?, ?, ?, ?)''', data)
    conn.commit()
    conn.close()


def get_data_sender(sender_id):
    conn = sqlite3.connect(dbFile)
    c = conn.cursor()
    c.execute('select * from transactions where sender_id =  ?', (sender_id, ))
    list1 = c.fetchall()
    conn.commit()
    conn.close()
    return list1


#ログイン時に使用
def account_search(id, password):
    conn = sqlite3.connect(dbFile)
    c = conn.cursor()
    c.execute('select * from users where id =  ? AND password = ?', (id, password))
    user = c.fetchone()
    conn.commit()
    conn.close()
    if user:
        return user
    else:
        return False




# テーブルの確認
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()
print(f"Tables in {dbFile}: {tables}")

# ユーザーテーブルのスキーマ確認
cursor.execute("PRAGMA table_info(users);")
user_schema = cursor.fetchall()
print("Schema of users table:")
for column in user_schema:
    print(column)

# 履歴テーブルのスキーマ確認
cursor.execute("PRAGMA table_info(transactions);")
transaction_schema = cursor.fetchall()
print("Schema of transactions table:")
for column in transaction_schema:
    print(column)

# テーブルの内容確認
cursor.execute("SELECT * FROM users;")
users = cursor.fetchall()
print("Contents of users table:")
for user in users:
    print(user)

cursor.execute("SELECT * FROM transactions;")
transactions = cursor.fetchall()
print("Contents of transactions table:")
for transaction in transactions:
    print(transaction)

# データベース接続の閉鎖
conn.commit()
conn.close()
