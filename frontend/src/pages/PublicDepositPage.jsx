import { useState } from "react";
import axios from "axios";

function PublicDepositPage() {
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState("");

  const depositMoney = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/public/deposit`,
        {
          username,
          amount: Number(amount),
        }
      );

      alert(
        `${res.data.message}\n\nCurrent Balance: ₹${res.data.balance}`
      );

      setUsername("");
      setAmount("");
    } catch (err) {
      alert(err.response?.data?.message || "Deposit Failed");
    }
  };

  return (
    <div
      style={{
        width: "400px",
        margin: "80px auto",
        padding: "30px",
        background: "var(--card-bg)",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
      }}
    >
      <h1 style={{ textAlign: "center" }}>🏦 Public Deposit</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          marginBottom: "15px"
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
          marginBottom: "20px"
        }}
      />

      <button
        onClick={depositMoney}
        style={{
          width: "100%",
          padding: "12px",
          background: "#16a34a",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        Deposit Money
      </button>
    </div>
  );
}

export default PublicDepositPage;
