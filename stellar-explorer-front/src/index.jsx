import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BlockSearch from "./pages/BlockSearch";
import TransactionSearch from "./pages/TransactionSearch";
import BalanceSearch from "./pages/BalanceSearch";

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Stellar Explorer</h1>
        <nav>
          <Link to="/block">Buscar Bloco</Link> | 
          <Link to="/transaction">Buscar Transação</Link> | 
          <Link to="/balance">Buscar Saldo</Link>
        </nav>
        <Routes>
          <Route path="/block" element={<BlockSearch />} />
          <Route path="/block/:id" element={<BlockSearch />} /> {/* ADICIONADO */}
          <Route path="/transaction" element={<TransactionSearch />} />
          <Route path="/balance" element={<BalanceSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

