import { useEffect, useState } from "react";
import api from "../services/api";

function BalanceCard() {

  const [user, setUser] = useState({
    name: "",
    username: "",
    balance: 0,
  });

  useEffect(() => {
    loadBalance();
  }, []);

  const loadBalance = async () => {
    try {

      const res = await api.get("/transactions/balance");

      setUser(res.data.user);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        background: "#2563eb",
        color: "white",
        padding: "30px",
        borderRadius: "15px",
        marginBottom: "25px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
      }}
    >
      <h2>Available Balance</h2>

      <h1
        style={{
          fontSize: "42px",
          margin: "15px 0",
        }}
      >
        ₹ {user.balance}
      </h1>

      <hr
        style={{
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      />

      <p>
        <strong>Account Holder:</strong> {user.name}
      </p>

      <p>
        <strong>Username:</strong> {user.username}
      </p>

      <p>
        <strong>Account Status:</strong> ✅ Active
      </p>
    </div>
  );
}

export default BalanceCard;
