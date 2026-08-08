import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import AdminSidebar from "../components/AdminSidebar";

function StatCard({ icon, title, value, subtitle, color, to }) {
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: "inherit",
        background: "#ffffff",
        borderRadius: "18px",
        padding: "22px",
        display: "block",
        border: "1px solid #eee",
        boxShadow: "0 6px 22px rgba(15,23,42,.06)",
        transition: "all .2s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            background: `${color}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
          }}
        >
          {icon}
        </div>

        <span
          style={{
            fontSize: "12px",
            color: "#94a3b8",
            fontWeight: "700",
          }}
        >
          View →
        </span>
      </div>

      <div
        style={{
          fontSize: "27px",
          fontWeight: "800",
          color: "#111827",
        }}
      >
        {value}
      </div>

      <div
        style={{
          marginTop: "6px",
          fontSize: "15px",
          fontWeight: "700",
          color: "#334155",
        }}
      >
        {title}
      </div>

      <div
        style={{
          marginTop: "5px",
          fontSize: "12px",
          color: "#94a3b8",
        }}
      >
        {subtitle}
      </div>
    </Link>
  );
}

function AdminDashboard() {
  const [recentUsers, setRecentUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    balance: 0,
    pendingKyc: 0,
  });

  useEffect(() => {
    loadUsers();
    loadTransactions();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await api.get("/users");

      const users = res.data.users || [];

      const sortedUsers = [...users].sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      );

      setRecentUsers(sortedUsers.slice(0, 5));

      setStats({
        total: users.length,
        active: users.filter(
          (u) => u.status === "Active"
        ).length,
        balance: users.reduce(
          (sum, u) => sum + Number(u.balance || 0),
          0
        ),
        pendingKyc: users.filter(
          (u) => u.kycStatus === "Pending"
        ).length,
      });
    } catch (err) {
      console.log("Users Error:", err);
    }
  };

  const loadTransactions = async () => {
    try {
      const res = await api.get("/transactions/all");

      setTransactions(
        (res.data.transactions || []).slice(0, 6)
      );
    } catch (err) {
      console.log("Transactions Error:", err);
    }
  };

  const depositTotal = transactions
    .filter((t) => t.type === "deposit")
    .reduce(
      (sum, t) => sum + Number(t.amount || 0),
      0
    );

  const withdrawTotal = transactions
    .filter((t) => t.type === "withdraw")
    .reduce(
      (sum, t) => sum + Number(t.amount || 0),
      0
    );

  const transferTotal = transactions
    .filter((t) => t.type === "transfer")
    .reduce(
      (sum, t) => sum + Number(t.amount || 0),
      0
    );

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f7f8fa",
      }}
    >
      {/* SIDEBAR - UNCHANGED */}
      <AdminSidebar />

      <main
        style={{
          flex: 1,
          padding: "32px",
          overflowX: "hidden",
        }}
      >
        {/* HEADER */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "13px",
                color: "#94a3b8",
                fontWeight: "700",
                marginBottom: "7px",
                textTransform: "uppercase",
                letterSpacing: ".08em",
              }}
            >
              NovaPay Admin
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "30px",
                fontWeight: "800",
                color: "#111827",
              }}
            >
              Good Day, Admin 👋
            </h1>

            <p
              style={{
                margin: "8px 0 0",
                color: "#64748b",
                fontSize: "14px",
              }}
            >
              Manage your banking platform from one place.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <button
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1px solid #e5e7eb",
                background: "#fff",
                fontSize: "19px",
                cursor: "pointer",
              }}
            >
              🔔
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "#fff",
                border: "1px solid #e5e7eb",
                padding: "7px 13px 7px 7px",
                borderRadius: "30px",
              }}
            >
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  background: "#b91c1c",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "800",
                }}
              >
                A
              </div>

              <div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "800",
                    color: "#111827",
                  }}
                >
                  Admin
                </div>

                <div
                  style={{
                    fontSize: "10px",
                    color: "#94a3b8",
                  }}
                >
                  Administrator
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HERO BALANCE CARD */}

        <div
          style={{
            background:
              "linear-gradient(135deg,#991b1b 0%,#dc2626 55%,#ef4444 100%)",
            borderRadius: "24px",
            padding: "30px",
            color: "#fff",
            marginBottom: "26px",
            boxShadow: "0 15px 35px rgba(185,28,28,.20)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "230px",
              height: "230px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,.15)",
              right: "-60px",
              top: "-70px",
            }}
          />

          <div
            style={{
              position: "absolute",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,.12)",
              right: "70px",
              bottom: "-90px",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                fontSize: "13px",
                opacity: ".82",
                marginBottom: "10px",
              }}
            >
              Total Customer Balance
            </div>

            <div
              style={{
                fontSize: "38px",
                fontWeight: "900",
                letterSpacing: "-1px",
              }}
            >
              ₹ {stats.balance.toLocaleString()}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "24px",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  opacity: ".8",
                }}
              >
                Across all registered customers
              </span>

              <Link
                to="/admin/analytics"
                style={{
                  textDecoration: "none",
                  color: "#991b1b",
                  background: "#fff",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: "800",
                }}
              >
                View Analytics →
              </Link>
            </div>
          </div>
        </div>

        {/* STAT CARDS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(210px,1fr))",
            gap: "18px",
            marginBottom: "26px",
          }}
        >
          <StatCard
            icon="👥"
            title="Total Users"
            value={stats.total}
            subtitle="Registered customers"
            color="#2563eb"
            to="/admin/users"
          />

          <StatCard
            icon="🟢"
            title="Active Users"
            value={stats.active}
            subtitle="Currently active"
            color="#16a34a"
            to="/admin/users"
          />

          <StatCard
            icon="🪪"
            title="Pending KYC"
            value={stats.pendingKyc}
            subtitle="Awaiting verification"
            color="#ca8a04"
            to="/admin/kyc"
          />

          <StatCard
            icon="💰"
            title="Total Balance"
            value={`₹ ${stats.balance.toLocaleString()}`}
            subtitle="Customer balances"
            color="#dc2626"
            to="/admin/analytics"
          />
        </div>

        {/* TRANSACTION OVERVIEW */}

        <div
          style={{
            background: "#fff",
            borderRadius: "22px",
            padding: "25px",
            marginBottom: "26px",
            border: "1px solid #eee",
            boxShadow: "0 6px 22px rgba(15,23,42,.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  color: "#111827",
                  fontSize: "19px",
                }}
              >
                Transaction Overview
              </h2>

              <p
                style={{
                  margin: "5px 0 0",
                  fontSize: "12px",
                  color: "#94a3b8",
                }}
              >
                Recent banking activity
              </p>
            </div>

            <Link
              to="/admin/transactions"
              style={{
                textDecoration: "none",
                color: "#b91c1c",
                fontSize: "12px",
                fontWeight: "800",
              }}
            >
              View All →
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(180px,1fr))",
              gap: "15px",
            }}
          >
            <OverviewBox
              icon="↙"
              title="Deposits"
              value={`₹ ${depositTotal.toLocaleString()}`}
              iconBg="#dcfce7"
              iconColor="#15803d"
            />

            <OverviewBox
              icon="↗"
              title="Withdrawals"
              value={`₹ ${withdrawTotal.toLocaleString()}`}
              iconBg="#fee2e2"
              iconColor="#b91c1c"
            />

            <OverviewBox
              icon="⇄"
              title="Transfers"
              value={`₹ ${transferTotal.toLocaleString()}`}
              iconBg="#dbeafe"
              iconColor="#1d4ed8"
            />

            <OverviewBox
              icon="▤"
              title="Transactions"
              value={transactions.length}
              iconBg="#fef3c7"
              iconColor="#a16207"
            />
          </div>
        </div>

        {/* TWO COLUMN */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(350px,1fr))",
            gap: "22px",
          }}
        >
          {/* RECENT TRANSACTIONS */}

          <div style={panel}>
            <PanelHeader
              title="Recent Transactions"
              to="/admin/transactions"
            />

            {transactions.length === 0 ? (
              <div style={empty}>
                No transactions found
              </div>
            ) : (
              transactions.map((t) => (
                <div
                  key={t._id}
                  style={listItem}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "13px",
                      background:
                        t.type === "deposit"
                          ? "#dcfce7"
                          : t.type === "withdraw"
                          ? "#fee2e2"
                          : "#dbeafe",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "19px",
                    }}
                  >
                    {t.type === "deposit"
                      ? "↙"
                      : t.type === "withdraw"
                      ? "↗"
                      : "⇄"}
                  </div>

                  <div style={{ flex: 1 }}>
                    <strong
                      style={{
                        color: "#111827",
                        fontSize: "14px",
                        textTransform: "capitalize",
                      }}
                    >
                      {t.type}
                    </strong>

                    <div
                      style={{
                        fontSize: "11px",
                        color: "#94a3b8",
                        marginTop: "4px",
                      }}
                    >
                      {t.sender?.username ||
                        t.user?.username ||
                        "Customer"}
                    </div>
                  </div>

                  <strong
                    style={{
                      color:
                        t.type === "deposit"
                          ? "#15803d"
                          : "#b91c1c",
                      fontSize: "14px",
                    }}
                  >
                    ₹ {Number(t.amount || 0).toLocaleString()}
                  </strong>
                </div>
              ))
            )}
          </div>

          {/* RECENT USERS */}

          <div style={panel}>
            <PanelHeader
              title="Recent Users"
              to="/admin/users"
            />

            {recentUsers.length === 0 ? (
              <div style={empty}>
                No users found
              </div>
            ) : (
              recentUsers.map((u) => (
                <div
                  key={u._id}
                  style={listItem}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg,#991b1b,#ef4444)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "900",
                    }}
                  >
                    {(u.name ||
                      u.username ||
                      "U")
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div style={{ flex: 1 }}>
                    <strong
                      style={{
                        color: "#111827",
                        fontSize: "14px",
                      }}
                    >
                      {u.name || "User"}
                    </strong>

                    <div
                      style={{
                        color: "#94a3b8",
                        fontSize: "11px",
                        marginTop: "4px",
                      }}
                    >
                      @{u.username}
                    </div>
                  </div>

                  <span
                    style={{
                      padding: "5px 10px",
                      borderRadius: "20px",
                      fontSize: "10px",
                      fontWeight: "800",
                      background:
                        u.status === "Active"
                          ? "#dcfce7"
                          : "#fee2e2",
                      color:
                        u.status === "Active"
                          ? "#166534"
                          : "#991b1b",
                    }}
                  >
                    {u.status || "Unknown"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* QUICK ACTIONS */}

        <div
          style={{
            marginTop: "24px",
            background: "#fff",
            padding: "25px",
            borderRadius: "22px",
            border: "1px solid #eee",
            boxShadow: "0 6px 22px rgba(15,23,42,.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "18px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  color: "#111827",
                  fontSize: "19px",
                }}
              >
                Quick Actions
              </h2>

              <p
                style={{
                  margin: "5px 0 0",
                  fontSize: "12px",
                  color: "#94a3b8",
                }}
              >
                Frequently used admin operations
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(160px,1fr))",
              gap: "13px",
            }}
          >
            <QuickAction
              to="/admin/add-user"
              icon="➕"
              label="Add User"
            />

            <QuickAction
              to="/admin/deposit"
              icon="💰"
              label="Deposit"
            />

            <QuickAction
              to="/admin/withdraw"
              icon="🏧"
              label="Withdraw"
            />

            <QuickAction
              to="/admin/kyc"
              icon="🪪"
              label="Review KYC"
            />

            <QuickAction
              to="/admin-tickets"
              icon="🎫"
              label="Support"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function OverviewBox({
  icon,
  title,
  value,
  iconBg,
  iconColor,
}) {
  return (
    <div
      style={{
        background: "#fafafa",
        border: "1px solid #f0f0f0",
        borderRadius: "15px",
        padding: "17px",
        display: "flex",
        alignItems: "center",
        gap: "13px",
      }}
    >
      <div
        style={{
          width: "43px",
          height: "43px",
          borderRadius: "12px",
          background: iconBg,
          color: iconColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: "900",
        }}
      >
        {icon}
      </div>

      <div>
        <div
          style={{
            color: "#94a3b8",
            fontSize: "11px",
            marginBottom: "4px",
          }}
        >
          {title}
        </div>

        <strong
          style={{
            color: "#111827",
            fontSize: "16px",
          }}
        >
          {value}
        </strong>
      </div>
    </div>
  );
}

function PanelHeader({ title, to }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "18px",
      }}
    >
      <h2
        style={{
          margin: 0,
          color: "#111827",
          fontSize: "18px",
        }}
      >
        {title}
      </h2>

      <Link
        to={to}
        style={{
          textDecoration: "none",
          color: "#b91c1c",
          fontSize: "12px",
          fontWeight: "800",
        }}
      >
        View All →
      </Link>
    </div>
  );
}

function QuickAction({ to, icon, label }) {
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        background: "#fafafa",
        border: "1px solid #eee",
        padding: "15px",
        borderRadius: "14px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        color: "#334155",
        fontWeight: "800",
        fontSize: "13px",
      }}
    >
      <span
        style={{
          width: "34px",
          height: "34px",
          borderRadius: "10px",
          background: "#fee2e2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "17px",
        }}
      >
        {icon}
      </span>

      {label}
    </Link>
  );
}

const panel = {
  background: "#fff",
  borderRadius: "22px",
  padding: "24px",
  border: "1px solid #eee",
  boxShadow: "0 6px 22px rgba(15,23,42,.05)",
};

const listItem = {
  display: "flex",
  alignItems: "center",
  gap: "13px",
  padding: "13px 0",
  borderBottom: "1px solid #f1f5f9",
};

const empty = {
  padding: "35px 10px",
  textAlign: "center",
  color: "#94a3b8",
  fontSize: "13px",
};

export default AdminDashboard;
