import { Link } from "react-router-dom";

function Card({ title, subtitle, icon, color, to }) {
  return (
    <Link
      to={to}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,.1)",
          cursor: "pointer",
        }}
      >
        <div style={{ fontSize: "42px", marginBottom: "15px" }}>
          {icon}
        </div>

        <h2 style={{ color }}>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </Link>
  );
}

function AdminDashboard() {
  return (
    <div
      style={{
        padding: "40px",
        background: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      <h1>👨‍💼 NovaPay Admin Panel</h1>
      <p>Welcome, Administrator</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "25px",
          marginTop: "35px",
        }}
      >
        <Card icon="👥" title="Users" subtitle="Manage Users" color="#2563eb" to="/admin/users" />
        <Card icon="➕" title="Add User" subtitle="Create New User" color="#16a34a" to="/admin/add-user" />
        <Card icon="💰" title="Deposit" subtitle="Deposit Money" color="#059669" to="/admin/deposit" />
        <Card icon="🏧" title="Withdraw" subtitle="Withdraw Money" color="#dc2626" to="/admin/withdraw" />
        <Card icon="📜" title="Transactions" subtitle="View Transactions" color="#9333ea" to="/admin/transactions" />
        <Card icon="📊" title="Analytics" subtitle="System Analytics" color="#ea580c" to="/admin/analytics" />
      </div>

      <div
        style={{
          marginTop: "40px",
          textAlign: "center",
          color: "#64748b",
          fontSize: "13px",
        }}
      >
        <strong>NovaPay Banking System</strong><br />
        Developed by <strong>Nitin Rathod</strong>
      </div>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
        style={{
          position: "fixed",
          right: "25px",
          bottom: "25px",
          background: "#dc2626",
          color: "#fff",
          border: "none",
          padding: "12px 20px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
}

export default AdminDashboard;
