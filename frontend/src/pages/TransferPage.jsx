import { useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function TransferPage() {
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState("");

  const transferMoney = async () => {
    try {
      const res = await api.post("/transactions/transfer", {
        username,
        amount: Number(amount),
      });

      alert(res.data.message);
      setUsername("");
      setAmount("");
    } catch (err) {
      alert(err.response?.data?.message || "Transfer Failed");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "30px" }}>
        <h1>💸 Transfer Money</h1>

        <input
          type="text"
          placeholder="Recipient Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <button
          onClick={transferMoney}
          style={{
            padding: "12px 25px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Transfer Now
        </button>
      </div>
    </div>
  );
}

export default TransferPage;
