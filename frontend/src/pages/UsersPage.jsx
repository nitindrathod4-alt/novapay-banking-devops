import { useEffect, useState } from "react";
import api from "../services/api";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data.users || []);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return;

    try {
      await api.delete(`/users/${id}`);
      loadUsers();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  const filtered = users.filter((u) => {
    const name = (u.name || "").toLowerCase();
    const username = (u.username || "").toLowerCase();
    const query = search.toLowerCase();

    return name.includes(query) || username.includes(query);
  });

  const badge = (background, color) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px 12px",
    borderRadius: "20px",
    background,
    color,
    fontSize: "12px",
    fontWeight: "800",
    whiteSpace: "nowrap",
  });

  const actionItemStyle = {
    display: "block",
    width: "100%",
    padding: "11px 14px",
    border: "none",
    background: "#ffffff",
    color: "#374151",
    textAlign: "left",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
  };

  const thStyle = {
    padding: "14px 16px",
    textAlign: "left",
    color: "#ffffff",
    background: "#a30d2d",
    fontSize: "12px",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "0.4px",
  };

  const tdStyle = {
    padding: "15px 16px",
    verticalAlign: "middle",
  };

  return (
    <div
      style={{
        padding: "35px",
        background: "#f8f8f8",
        minHeight: "100vh",
      }}
    >
      {/* PAGE HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "26px",
              fontWeight: "900",
              color: "#171717",
            }}
          >
            User Management
          </div>

          <div
            style={{
              marginTop: "6px",
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            Manage customers and account information
          </div>
        </div>
      </div>

      {/* SUMMARY CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: "14px",
            padding: "22px",
            border: "1px solid #eeeeee",
          }}
        >
          <div
            style={{
              color: "#6b7280",
              fontSize: "13px",
              fontWeight: "700",
            }}
          >
            TOTAL USERS
          </div>

          <div
            style={{
              marginTop: "8px",
              fontSize: "28px",
              fontWeight: "900",
              color: "#171717",
            }}
          >
            {users.length}
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: "14px",
            padding: "22px",
            border: "1px solid #eeeeee",
          }}
        >
          <div
            style={{
              color: "#6b7280",
              fontSize: "13px",
              fontWeight: "700",
            }}
          >
            ACTIVE USERS
          </div>

          <div
            style={{
              marginTop: "8px",
              fontSize: "28px",
              fontWeight: "900",
              color: "#15803d",
            }}
          >
            {users.filter((u) => u.status === "Active").length}
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: "14px",
            padding: "22px",
            border: "1px solid #eeeeee",
          }}
        >
          <div
            style={{
              color: "#6b7280",
              fontSize: "13px",
              fontWeight: "700",
            }}
          >
            TOTAL BALANCE
          </div>

          <div
            style={{
              marginTop: "8px",
              fontSize: "28px",
              fontWeight: "900",
              color: "#a30d2d",
            }}
          >
            ₹
            {users
              .reduce((total, user) => total + Number(user.balance || 0), 0)
              .toLocaleString("en-IN")}
          </div>
        </div>
      </div>

      {/* SEARCH */}

      <div
        style={{
          background: "#ffffff",
          padding: "18px",
          borderRadius: "14px",
          border: "1px solid #eeeeee",
          marginBottom: "20px",
        }}
      >
        <input
          placeholder="🔍 Search customer by name or username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "13px 15px",
            borderRadius: "9px",
            border: "1px solid #d1d5db",
            outline: "none",
            fontSize: "14px",
          }}
        />
      </div>

      {/* TABLE */}

      <div
        style={{
          background: "#ffffff",
          borderRadius: "14px",
          border: "1px solid #eeeeee",
          overflow: "visible",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={{ ...thStyle, width: "70px" }}>Photo</th>
              <th style={thStyle}>Customer</th>
              <th style={thStyle}>Role</th>
              <th style={thStyle}>Balance</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>KYC</th>
              <th style={{ ...thStyle, width: "150px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  style={{
                    padding: "60px",
                    textAlign: "center",
                    color: "#6b7280",
                  }}
                >
                  No customers found
                </td>
              </tr>
            ) : (
              filtered.map((u) => (
                <tr
                  key={u._id}
                  style={{
                    borderBottom: "1px solid #eeeeee",
                  }}
                >
                  {/* PHOTO */}

                  <td style={tdStyle}>
                    <img
                      src={
                        u.photo
                          ? `http://13.203.173.169:5000${u.photo}`
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              u.name || "User"
                            )}&background=a30d2d&color=fff`
                      }
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          u.name || "User"
                        )}&background=a30d2d&color=fff`;
                      }}
                      style={{
                        width: "46px",
                        height: "46px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid #f1d5dc",
                      }}
                    />
                  </td>

                  {/* CUSTOMER */}

                  <td style={tdStyle}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "13px",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontWeight: "800",
                            color: "#171717",
                            fontSize: "14px",
                          }}
                        >
                          {u.name}
                        </div>

                        <div
                          style={{
                            color: "#6b7280",
                            fontSize: "12px",
                            marginTop: "4px",
                          }}
                        >
                          @{u.username}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* ROLE */}

                  <td style={tdStyle}>
                    <span
                      style={
                        u.role === "admin"
                          ? badge("#fce7ec", "#a30d2d")
                          : badge("#f3f4f6", "#374151")
                      }
                    >
                      {u.role === "admin" ? "ADMIN" : "CUSTOMER"}
                    </span>
                  </td>

                  {/* BALANCE */}

                  <td
                    style={{
                      ...tdStyle,
                      fontWeight: "800",
                      color: "#171717",
                    }}
                  >
                    ₹
                    {Number(u.balance || 0).toLocaleString("en-IN")}
                  </td>

                  {/* STATUS */}

                  <td style={tdStyle}>
                    <span
                      style={
                        u.status === "Active"
                          ? badge("#dcfce7", "#15803d")
                          : badge("#fee2e2", "#b91c1c")
                      }
                    >
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background:
                            u.status === "Active"
                              ? "#16a34a"
                              : "#dc2626",
                          marginRight: "7px",
                        }}
                      />
                      {u.status}
                    </span>
                  </td>

                  {/* KYC */}

                  <td style={tdStyle}>
                    <span
                      style={
                        u.kycStatus === "Verified"
                          ? badge("#dcfce7", "#15803d")
                          : u.kycStatus === "Rejected"
                          ? badge("#fee2e2", "#b91c1c")
                          : badge("#fef3c7", "#92400e")
                      }
                    >
                      {u.kycStatus === "Verified"
                        ? "✓ Verified"
                        : u.kycStatus === "Rejected"
                        ? "✕ Rejected"
                        : "• Pending"}
                    </span>
                  </td>

                  {/* ACTIONS */}

                  <td style={tdStyle}>
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                      }}
                    >
                      <button
                        onClick={(e) => {
                          const menu = e.currentTarget.nextElementSibling;

                          menu.style.display =
                            menu.style.display === "block"
                              ? "none"
                              : "block";
                        }}
                        style={{
                          padding: "9px 14px",
                          borderRadius: "8px",
                          border: "1px solid #e5b8c3",
                          background: "#ffffff",
                          color: "#a30d2d",
                          fontWeight: "800",
                          cursor: "pointer",
                          fontSize: "13px",
                          minWidth: "115px",
                        }}
                      >
                        Actions ▾
                      </button>

                      <div
                        style={{
                          display: "none",
                          position: "absolute",
                          right: 0,
                          top: "42px",
                          width: "180px",
                          background: "#ffffff",
                          border: "1px solid #ead5da",
                          borderRadius: "10px",
                          boxShadow: "0 10px 25px rgba(0,0,0,.15)",
                          zIndex: 1000,
                          overflow: "hidden",
                        }}
                      >
                        <button
                          onClick={() => {
                            window.location.href = `/admin/user/${u._id}`;
                          }}
                          style={actionItemStyle}
                        >
                          👁 View Profile
                        </button>

                        <button
                          onClick={() => {
                            window.location.href = `/admin/edit-user/${u._id}`;
                          }}
                          style={actionItemStyle}
                        >
                          ✏️ Edit User
                        </button>

                        <button
                          onClick={() => {
                            deleteUser(u._id, u.username);
                          }}
                          style={{
                            ...actionItemStyle,
                            color: "#b91c1c",
                          }}
                        >
                          🗑 Delete User
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersPage;
