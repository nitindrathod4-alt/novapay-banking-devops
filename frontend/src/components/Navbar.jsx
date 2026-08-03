function Navbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div
      style={{
        background: "#1e3a8a",
        color: "white",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>🏦 NovaPay Banking</h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <span>
          🔔 💬 👤 {user?.name}
        </span>

        <button
          onClick={logout}
          style={{
            background: "#dc2626",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
