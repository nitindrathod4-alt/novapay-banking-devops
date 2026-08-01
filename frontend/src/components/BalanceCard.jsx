import { useEffect, useState } from "react";
import api from "../services/api";

function BalanceCard() {
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState({
    name: "Loading...",
  });

  useEffect(() => {
    loadBalance();
  }, []);

  const loadBalance = async () => {
    try {
      const res = await api.get("/transactions/balance");

      setBalance(res.data.balance);
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #2563eb, #1e40af)",
        color: "white",
        borderRadius: "15px",
        padding: "25px",
        marginBottom: "25px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
      }}
    >
      <h3>Available Balance</h3>

      <h1 style={{ margin: "15px 0" }}>
        ₹ {balance.toLocaleString("en-IN")}
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "25px"
        }}
      >
        <div>
          <small>Account Holder</small>
          <h3>{user.name}</h3>
        </div>

        <div>
          <small>Username</small>
          <h3>{user.username}</h3>
        </div>
      </div>

      <h2 style={{ marginTop: "20px", letterSpacing: "3px" }}>
        **** **** **** 2456
      </h2>
    </div>
  );
}

export default BalanceCard;
