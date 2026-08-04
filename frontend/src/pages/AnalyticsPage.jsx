import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function AnalyticsPage() {
  const [data, setData] = useState({
    totalUsers: 0,
    adminUsers: 0,
    totalBalance: 0,
    totalTransactions: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/users/analytics");
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "30px",
          background: "#f3f4f6",
          minHeight: "100vh",
        }}
      >
        <h1>📊 NovaPay Analytics</h1>

        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              <h3>👥 Total Users</h3>
              <h2>{data.totalUsers}</h2>
            </div>

            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              <h3>👨‍💼 Admin Users</h3>
              <h2>{data.adminUsers}</h2>
            </div>

            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              <h3>💰 Total Balance</h3>
              <h2>₹ {data.totalBalance}</h2>
            </div>

            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              <h3>📜 Transactions</h3>
              <h2>{data.totalTransactions}</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnalyticsPage;
