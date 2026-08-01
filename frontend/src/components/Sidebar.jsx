import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        minHeight: "100vh",
        background: "#1e293b",
        color: "white",
        padding: "20px",
      }}
    >
      <h2>🏦 NovaPay</h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "30px",
        }}
      >
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          🏠 Dashboard
        </Link>

        <Link to="/transfer" style={{ color: "white", textDecoration: "none" }}>
          💸 Transfer
        </Link>

        <Link to="/transactions" style={{ color: "white", textDecoration: "none" }}>
          📜 Transactions
        </Link>

        <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>
          👤 Profile
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
