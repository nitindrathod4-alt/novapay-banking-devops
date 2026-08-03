import { useEffect, useState } from "react";
import api from "../services/api";

function TransactionsAdminPage() {
  const [transactions, setTransactions] = useState([]);
  const [username, setUsername] = useState("");
  const [type, setType] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const res = await api.get("/transactions/all");
      setTransactions(res.data.transactions);
    } catch (err) {
      console.log(err);
      alert("Unable to load transactions");
    }
  };

  const filterTransactions = async () => {
    try {
      const res = await api.get("/transactions/filter", {
        params: {
          username,
          type,
          from,
          to,
        },
      });

      setTransactions(res.data.transactions);
    } catch (err) {
      console.log(err);
      alert("Filter Failed");
    }
  };

  const resetFilters = () => {
    setUsername("");
    setType("");
    setFrom("");
    setTo("");
    loadTransactions();
  };

  const exportExcel = async () => {
  try {
    const res = await api.get("/transactions/export", {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));

    const link = document.createElement("a");
    link.href = url;
    link.download = "NovaPay-Transactions.xlsx";

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);

  } catch (err) {
    console.log(err);
    alert("Excel Download Failed");
  }
};

  return (
    <div style={{ padding: "30px" }}>
      <h1>📜 All Transactions</h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          margin: "20px 0",
        }}
      >
        <input
          placeholder="🔍 Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All Types</option>
          <option value="Deposit">Deposit</option>
          <option value="Withdraw">Withdraw</option>
          <option value="Transfer">Transfer</option>
        </select>

        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />

        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <button onClick={filterTransactions}>🔍 Filter</button>

        <button onClick={resetFilters}>🔄 Reset</button>

        <button
          onClick={exportExcel}
          style={{
            background: "#16a34a",
            color: "#fff",
            border: "none",
            padding: "8px 15px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          📄 Export Excel
        </button>
      </div>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t) => (
            <tr key={t._id}>
              <td>{t.sender?.username || "-"}</td>
              <td>{t.receiver?.username || "-"}</td>
              <td>{t.type}</td>
              <td>₹ {t.amount}</td>
              <td>{t.status}</td>
              <td>{new Date(t.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsAdminPage;
