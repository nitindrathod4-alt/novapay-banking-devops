import { NavLink } from "react-router-dom";

function AdminSidebar() {
  const menuStyle = {
    textDecoration: "none",
    padding: "13px 15px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    fontWeight: "600",
    fontSize: "15px",
    color: "#dbe4f0",
    transition: "0.2s",
  };

  const items = [
    ["/admin/profile", "👤", "My Profile"],
    ["/admin/dashboard", "🏠", "Dashboard"],
    ["/admin/users", "👥", "Users"],
    ["/admin/add-user", "➕", "Add User"],
    ["/admin/deposit", "💰", "Deposit"],
    ["/admin/withdraw", "🏧", "Withdraw"],
    ["/admin/transactions", "📜", "Transactions"],
    ["/admin/kyc", "🪪", "KYC"],
    ["/admin/analytics", "📊", "Analytics"],
    ["/admin-tickets", "🎫", "Support Tickets"],
  ];

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <aside
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "#111827",
        padding: "28px 15px",
        boxSizing: "border-box",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        alignSelf: "flex-start",
      }}
    >
      {/* LOGO */}
      <div style={{ paddingLeft: "8px", marginBottom: "28px" }}>
        <div
          style={{
            fontSize: "32px",
            fontWeight: "900",
            letterSpacing: "-1.5px",
            lineHeight: "1",
          }}
        >
          <span style={{ color: "#ffffff" }}>NOVA</span>
          <span style={{ color: "#b91c3c" }}>PAY</span>
        </div>

        <div
          style={{
            color: "#94a3b8",
            fontSize: "14px",
            marginTop: "9px",
          }}
        >
          Admin Console
        </div>
      </div>

      {/* DIVIDER */}
      <div
        style={{
          height: "1px",
          background: "#293344",
          margin: "0 7px 25px",
        }}
      />

      {/* SECTION */}
      <div
        style={{
          color: "#94a3b8",
          fontSize: "12px",
          fontWeight: "800",
          letterSpacing: "1.5px",
          paddingLeft: "8px",
          marginBottom: "12px",
        }}
      >
        ADMINISTRATION
      </div>

      {/* MENU */}
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        {items.map(([path, icon, label]) => (
          <NavLink
            key={path}
            to={path}
            style={({ isActive }) => ({
              ...menuStyle,
              color: isActive ? "#ffffff" : "#dbe4f0",
              background: isActive ? "#b91c3c" : "transparent",
              boxShadow: isActive
                ? "0 6px 18px rgba(185,30,60,.25)"
                : "none",
            })}
          >
            <span
              style={{
                width: "27px",
                fontSize: "19px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {icon}
            </span>

            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* SPACER */}
      <div style={{ flex: 1 }} />

      {/* ADMIN STATUS */}
      <div
        style={{
          margin: "20px 4px 12px",
          padding: "12px",
          borderRadius: "12px",
          background: "#172033",
          border: "1px solid #263247",
        }}
      >
        <div
          style={{
            color: "#94a3b8",
            fontSize: "11px",
            fontWeight: "700",
            marginBottom: "5px",
          }}
        >
          ADMIN ACCESS
        </div>

        <div
          style={{
            color: "#22c55e",
            fontSize: "13px",
            fontWeight: "700",
          }}
        >
          ● System Active
        </div>
      </div>

      {/* LOGOUT */}
      <button
        onClick={logout}
        style={{
          width: "100%",
          padding: "13px 15px",
          border: "1px solid #334155",
          borderRadius: "12px",
          background: "transparent",
          color: "#e2e8f0",
          fontSize: "15px",
          fontWeight: "600",
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        🚪 Logout
      </button>
    </aside>
  );
}

export default AdminSidebar;
