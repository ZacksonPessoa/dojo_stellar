import { useState } from "react";
import axios from "axios";

function TransactionSearch() {
  const [txHash, setTxHash] = useState("");
  const [transactionData, setTransactionData] = useState(null);
  const [error, setError] = useState("");

  const fetchTransaction = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/transaction/${txHash}`);
      setTransactionData(response.data);
      setError("");
    } catch (err) {
      setError("Transação não encontrada!");
      setTransactionData(null);
    }
  };

  return (
    <div>
      <h2>Buscar Transação</h2>
      <input
        type="text"
        value={txHash}
        onChange={(e) => setTxHash(e.target.value)}
        placeholder="Hash da Transação"
      />
      <button onClick={fetchTransaction}>Buscar</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {transactionData && (
        <pre>{JSON.stringify(transactionData, null, 2)}</pre>
      )}
    </div>
  );
}

export default TransactionSearch;
