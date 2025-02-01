import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BlockSearch() {
  const { id } = useParams();  // Captura o número do bloco da URL
  const [blockNumber, setBlockNumber] = useState(id || "");  // Se acessar pela URL, já preenche o campo
  const [blockData, setBlockData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchBlock(id);
    }
  }, [id]);  // Executa ao mudar o ID na URL

  const fetchBlock = async (num = blockNumber) => {
    try {
      const response = await axios.get(`http://localhost:5000/block/${num}`);
      setBlockData(response.data);
      setError("");
    } catch (err) {
      console.error("Erro ao buscar bloco:", err.response ? err.response.data : err.message);
      setError(`Erro ao buscar bloco: ${err.response ? err.response.data.detail : "Erro desconhecido"}`);
      setBlockData(null);
    }
  };
  

  return (
    <div>
      <h2>Buscar Bloco</h2>
      <input
        type="number"
        value={blockNumber}
        onChange={(e) => setBlockNumber(e.target.value)}
        placeholder="Número do Bloco"
      />
      <button onClick={() => fetchBlock()}>Buscar</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {blockData && <pre>{JSON.stringify(blockData, null, 2)}</pre>}
    </div>
  );
}

export default BlockSearch;
