import { useEffect, useState } from "react";
import api from "../services/api";

function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const res = await api.get("/transactions/history");
      setTransactions(res.data.transactions || []);
    } catch (err) {
      console.log(err);
    }
  };

  const getTitle = (t) => {
    if (t.type === "deposit") return "💰 Deposit";
    if (t.type === "withdraw") return "🏧 Withdraw";

    if (t.type === "transfer") {
      if (t.sender?.username === JSON.parse(localStorage.getItem("user"))?.username) {
        return `💸 Transfer to ${t.receiver?.username || "-"}`;
      } else {
        return `💸 Transfer from ${t.sender?.username || "-"}`;
      }
    }

    return t.type;
  };

  const getAmount = (t) => {
    if (t.type === "deposit") return `+₹${t.amount}`;

    if (t.type === "withdraw") return `-₹${t.amount}`;

    if (t.type === "transfer") {
      if (t.sender?.username === JSON.parse(localStorage.getItem("user"))?.username) {
        return `-₹${t.amount}`;
      }

      return `+₹${t.amount}`;
    }

    return `₹${t.amount}`;
  };

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        marginTop: "20px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>📜 Recent Transactions</h2>

      {transactions.length === 0 ? (
        <p>No Transactions Found</p>
      ) : (
        transactions.map((t) => (
          <div
            key={t._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <span>{getTitle(t)}</span>

            <strong>{getAmount(t)}</strong>
          </div>
        ))
      )}
    </div>
  );
}

export default TransactionList;
