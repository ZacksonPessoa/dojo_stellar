from flask import Flask, jsonify, request
import requests
from flask_cors import CORS  # Importa o CORS

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas as rotas

# URL do Horizon do seu nó Stellar Testnet
HORIZON_URL = "http://horizon:8000"

# Rota para buscar um bloco pelo número (ledger)
@app.route("/block/<int:ledger_id>", methods=["GET"])
def get_block(ledger_id):
    response = requests.get(f"{HORIZON_URL}/ledgers/{ledger_id}")
    return jsonify(response.json())

# Rota para buscar uma transação pelo hash
@app.route("/transaction/<string:tx_hash>", methods=["GET"])
def get_transaction(tx_hash):
    response = requests.get(f"{HORIZON_URL}/transactions/{tx_hash}")
    return jsonify(response.json())

# Rota para buscar o saldo de uma conta pelo endereço
@app.route("/balance/<string:account_id>", methods=["GET"])
def get_balance(account_id):
    response = requests.get(f"{HORIZON_URL}/accounts/{account_id}")
    if response.status_code != 200:
        return jsonify({"error": "Account not found"}), 404

    account_data = response.json()
    balances = account_data.get("balances", [])
    return jsonify({"account": account_id, "balances": balances})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
