function Navbar() {
  return (
    <header
      style={{
        background: "#1e3a8a",
        color: "white",
        padding: "18px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <h2>🏦 NovaPay Banking</h2>

      <div style={{ fontSize: "22px" }}>
        🔔
        <span style={{ marginLeft: "15px" }}>💬</span>
        <span style={{ marginLeft: "15px" }}>👤 Nitin</span>
      </div>
    </header>
  );
}

export default Navbar;
