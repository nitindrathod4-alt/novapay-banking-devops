import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [kycFilter, setKycFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const res = await api.get("/users");

      setUsers(
        (res.data.users || []).filter(
          (u) => u.role !== "admin"
        )
      );
    } catch (err) {
      console.log("Users Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const text = search.toLowerCase();

      const matchesSearch =
        !text ||
        user.name?.toLowerCase().includes(text) ||
        user.username?.toLowerCase().includes(text) ||
        user.email?.toLowerCase().includes(text) ||
        user.mobileNumber?.toLowerCase().includes(text);

      const matchesStatus =
        statusFilter === "All" ||
        user.status === statusFilter;

      const matchesKyc =
        kycFilter === "All" ||
        user.kycStatus === kycFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesKyc
      );
    });
  }, [users, search, statusFilter, kycFilter]);

  const totalBalance = users.reduce(
    (sum, user) =>
      sum + Number(user.balance || 0),
    0
  );

  const activeUsers = users.filter(
    (u) => u.status === "Active"
  ).length;

  const pendingKyc = users.filter(
    (u) => u.kycStatus === "Pending"
  ).length;

  const verifiedKyc = users.filter(
    (u) => u.kycStatus === "Verified"
  ).length;

  const getStatusStyle = (status) => {
    if (status === "Active") {
      return {
        background: "#ecfdf5",
        color: "#047857",
      };
    }

    if (status === "Blocked") {
      return {
        background: "#fef2f2",
        color: "#b91c1c",
      };
    }

    return {
      background: "#f8fafc",
      color: "#64748b",
    };
  };

  const getKycStyle = (status) => {
    if (status === "Verified") {
      return {
        background: "#ecfdf5",
        color: "#047857",
      };
    }

    if (status === "Rejected") {
      return {
        background: "#fef2f2",
        color: "#b91c1c",
      };
    }

    return {
      background: "#fff7ed",
      color: "#c2410c",
    };
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f6f7f9",
        padding: "32px",
      }}
    >
      {/* PAGE HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "28px",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <div>
          <div
            style={{
              color: "#e31837",
              fontSize: "13px",
              fontWeight: "800",
              letterSpacing: ".5px",
              textTransform: "uppercase",
              marginBottom: "7px",
            }}
          >
            Customer Management
          </div>

          <h1
            style={{
              margin: 0,
              color: "#111827",
              fontSize: "30px",
              fontWeight: "800",
            }}
          >
            Customers
          </h1>

          <p
            style={{
              margin: "7px 0 0",
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            Manage customer accounts, balances and KYC status.
          </p>
        </div>

        <Link
          to="/admin/add-user"
          style={{
            textDecoration: "none",
            background: "#e31837",
            color: "#fff",
            padding: "13px 20px",
            borderRadius: "10px",
            fontWeight: "800",
            fontSize: "14px",
            boxShadow: "0 6px 16px rgba(227,24,55,.20)",
          }}
        >
          + Add Customer
        </Link>
      </div>

      {/* SUMMARY CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(210px,1fr))",
          gap: "18px",
          marginBottom: "24px",
        }}
      >
        <SummaryCard
          label="Total Customers"
          value={users.length}
          icon="👥"
        />

        <SummaryCard
          label="Active Customers"
          value={activeUsers}
          icon="✓"
        />

        <SummaryCard
          label="Pending KYC"
          value={pendingKyc}
          icon="◷"
        />

        <SummaryCard
          label="Total Customer Balance"
          value={`₹${totalBalance.toLocaleString("en-IN")}`}
          icon="₹"
        />
      </div>

      {/* MAIN CARD */}

      <div
        style={{
          background: "#ffffff",
          borderRadius: "18px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 5px 20px rgba(15,23,42,.05)",
          overflow: "hidden",
        }}
      >
        {/* CARD HEADER */}

        <div
          style={{
            padding: "22px 24px",
            borderBottom: "1px solid #edf0f3",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  color: "#111827",
                  fontSize: "19px",
                  fontWeight: "800",
                }}
              >
                Customer Accounts
              </h2>

              <p
                style={{
                  margin: "5px 0 0",
                  color: "#6b7280",
                  fontSize: "13px",
                }}
              >
                {filteredUsers.length} customer
                {filteredUsers.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div
              style={{
                background: "#fff5f6",
                color: "#e31837",
                padding: "8px 12px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: "800",
              }}
            >
              {verifiedKyc} KYC Verified
            </div>
          </div>
        </div>

        {/* FILTER AREA */}

        <div
          style={{
            padding: "20px 24px",
            background: "#fafafa",
            borderBottom: "1px solid #edf0f3",
            display: "grid",
            gridTemplateColumns:
              "minmax(250px,1fr) 180px 180px",
            gap: "12px",
          }}
        >
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: "13px",
                top: "12px",
                fontSize: "16px",
              }}
            >
              🔍
            </span>

            <input
              type="text"
              placeholder="Search customer, username, email..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              style={searchStyle}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            style={selectStyle}
          >
            <option value="All">
              All Status
            </option>
            <option value="Active">
              Active
            </option>
            <option value="Blocked">
              Blocked
            </option>
          </select>

          <select
            value={kycFilter}
            onChange={(e) =>
              setKycFilter(e.target.value)
            }
            style={selectStyle}
          >
            <option value="All">
              All KYC
            </option>
            <option value="Pending">
              Pending
            </option>
            <option value="Verified">
              Verified
            </option>
            <option value="Rejected">
              Rejected
            </option>
          </select>
        </div>

        {/* TABLE */}

        <div
          style={{
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "900px",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#f8fafc",
                }}
              >
                <th style={thStyle}>
                  CUSTOMER
                </th>

                <th style={thStyle}>
                  CONTACT
                </th>

                <th style={thStyle}>
                  BALANCE
                </th>

                <th style={thStyle}>
                  STATUS
                </th>

                <th style={thStyle}>
                  KYC
                </th>

                <th style={thStyle}>
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    style={{
                      padding: "50px",
                      textAlign: "center",
                      color: "#64748b",
                    }}
                  >
                    Loading customers...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    style={{
                      padding: "55px",
                      textAlign: "center",
                      color: "#64748b",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "32px",
                        marginBottom: "10px",
                      }}
                    >
                      👥
                    </div>

                    No customers found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    style={{
                      borderBottom:
                        "1px solid #edf0f3",
                    }}
                  >
                    {/* CUSTOMER */}

                    <td style={tdStyle}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <div
                          style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "50%",
                            background:
                              "#fff0f2",
                            color: "#e31837",
                            display: "flex",
                            alignItems: "center",
                            justifyContent:
                              "center",
                            fontWeight: "800",
                            fontSize: "16px",
                          }}
                        >
                          {(
                            user.name ||
                            "U"
                          )
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <div
                            style={{
                              color: "#111827",
                              fontWeight: "800",
                              fontSize: "14px",
                            }}
                          >
                            {user.name ||
                              "Unknown"}
                          </div>

                          <div
                            style={{
                              color: "#6b7280",
                              fontSize: "12px",
                              marginTop: "3px",
                            }}
                          >
                            @{user.username}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* CONTACT */}

                    <td style={tdStyle}>
                      <div
                        style={{
                          color: "#374151",
                          fontSize: "13px",
                        }}
                      >
                        {user.email || "-"}
                      </div>

                      <div
                        style={{
                          color: "#9ca3af",
                          fontSize: "12px",
                          marginTop: "4px",
                        }}
                      >
                        {user.mobileNumber ||
                          "-"}
                      </div>
                    </td>

                    {/* BALANCE */}

                    <td style={tdStyle}>
                      <div
                        style={{
                          fontWeight: "800",
                          color: "#111827",
                          fontSize: "15px",
                        }}
                      >
                        ₹
                        {Number(
                          user.balance || 0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </div>
                    </td>

                    {/* STATUS */}

                    <td style={tdStyle}>
                      <span
                        style={{
                          ...badgeStyle,
                          ...getStatusStyle(
                            user.status
                          ),
                        }}
                      >
                        {user.status ||
                          "Unknown"}
                      </span>
                    </td>

                    {/* KYC */}

                    <td style={tdStyle}>
                      <span
                        style={{
                          ...badgeStyle,
                          ...getKycStyle(
                            user.kycStatus
                          ),
                        }}
                      >
                        {user.kycStatus ||
                          "Pending"}
                      </span>
                    </td>

                    {/* ACTION */}

                    <td style={tdStyle}>
                      <Link
                        to={`/admin/users/${user._id}`}
                        style={{
                          textDecoration: "none",
                          color: "#e31837",
                          border:
                            "1px solid #e31837",
                          padding:
                            "8px 15px",
                          borderRadius: "8px",
                          fontSize: "13px",
                          fontWeight: "800",
                          display:
                            "inline-block",
                        }}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* SUMMARY CARD */

function SummaryCard({
  label,
  value,
  icon,
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "20px",
        border: "1px solid #e5e7eb",
        boxShadow:
          "0 5px 18px rgba(15,23,42,.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              color: "#6b7280",
              fontSize: "12px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: ".4px",
            }}
          >
            {label}
          </div>

          <div
            style={{
              marginTop: "8px",
              color: "#111827",
              fontSize: "25px",
              fontWeight: "800",
            }}
          >
            {value}
          </div>
        </div>

        <div
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "12px",
            background: "#fff0f2",
            color: "#e31837",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            fontWeight: "800",
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

const searchStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px 14px 12px 40px",
  borderRadius: "9px",
  border: "1px solid #d9dee5",
  background: "#fff",
  outline: "none",
  fontSize: "13px",
};

const selectStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px",
  borderRadius: "9px",
  border: "1px solid #d9dee5",
  background: "#fff",
  color: "#374151",
  fontSize: "13px",
  outline: "none",
};

const thStyle = {
  padding: "14px 18px",
  textAlign: "left",
  color: "#6b7280",
  fontSize: "11px",
  fontWeight: "800",
  letterSpacing: ".5px",
};

const tdStyle = {
  padding: "16px 18px",
  verticalAlign: "middle",
};

const badgeStyle = {
  display: "inline-block",
  padding: "6px 11px",
  borderRadius: "20px",
  fontSize: "11px",
  fontWeight: "800",
};

export default AdminUsers;
