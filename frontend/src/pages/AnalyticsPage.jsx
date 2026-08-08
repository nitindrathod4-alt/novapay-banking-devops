import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import api from "../services/api";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function AnalyticsPage() {
  const [data, setData] = useState({
    totalUsers: 0,
    adminUsers: 0,
    totalBalance: 0,
    totalTransactions: 0,
  });

  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);

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

    const loadTransactions = async () => {
      try {
        const res = await api.get("/transactions/all");
        setTransactions(res.data.transactions || []);
      } catch (err) {
        console.log(err);
      }
    };

    const loadUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data.users || []);
      } catch (err) {
        console.log(err);
      }
    };

    load();
    loadTransactions();
    loadUsers();
  }, []);

  const money = (value) =>
    `₹ ${Number(value || 0).toLocaleString("en-IN")}`;

  const chartData = [
    {
      name: "Deposits",
      amount: transactions
        .filter((t) => t.type === "deposit")
        .reduce((sum, t) => sum + Number(t.amount || 0), 0),
    },
    {
      name: "Withdrawals",
      amount: transactions
        .filter((t) => t.type === "withdraw")
        .reduce((sum, t) => sum + Number(t.amount || 0), 0),
    },
    {
      name: "Transfers",
      amount: transactions
        .filter((t) => t.type === "transfer")
        .reduce((sum, t) => sum + Number(t.amount || 0), 0),
    },
  ];

  const kycStats = {
    verified: users.filter((u) => u.kycStatus === "Verified").length,
    pending: users.filter((u) => u.kycStatus === "Pending").length,
    rejected: users.filter((u) => u.kycStatus === "Rejected").length,
  };

  const userGrowth = Object.values(
    users.reduce((acc, u) => {
      const date = u.createdAt
        ? new Date(u.createdAt).toLocaleDateString()
        : "Unknown";

      if (!acc[date]) {
        acc[date] = {
          date,
          users: 0,
        };
      }

      acc[date].users++;

      return acc;
    }, {})
  );

  const spendingStats = {
    transfer: transactions
      .filter((t) => t.type === "transfer")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0),

    recharge: transactions
      .filter((t) => t.type === "mobile_recharge")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0),

    bills: transactions
      .filter((t) => t.type === "bill_payment")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0),
  };

  const spendingChart = [
    {
      name: "Transfer",
      amount: spendingStats.transfer,
    },
    {
      name: "Recharge",
      amount: spendingStats.recharge,
    },
    {
      name: "Bills",
      amount: spendingStats.bills,
    },
  ];

  const stats = {
    deposits: transactions
      .filter((t) => t.type === "deposit")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0),

    withdraws: transactions
      .filter((t) => t.type === "withdraw")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0),

    transfers: transactions
      .filter((t) => t.type === "transfer")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0),

    count: transactions.length,
  };

  const totalSpending =
    spendingStats.transfer +
    spendingStats.recharge +
    spendingStats.bills;

  const cardStyle = {
    background: "#ffffff",
    border: "1px solid #eee4e7",
    borderRadius: "16px",
    boxShadow: "0 4px 18px rgba(48, 15, 25, 0.06)",
  };

  const chartCardStyle = {
    ...cardStyle,
    padding: "24px",
  };

  const chartTooltip = {
    borderRadius: "10px",
    border: "1px solid #ead5da",
    boxShadow: "0 8px 20px rgba(0,0,0,.08)",
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f7f5f5",
      }}
    >
      <AdminSidebar />

      <main
        style={{
          flex: 1,
          padding: "32px 38px 50px",
          overflowX: "hidden",
        }}
      >
        {/* HEADER */}

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
                color: "#a30d2d",
                fontSize: "12px",
                fontWeight: "800",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                marginBottom: "7px",
              }}
            >
              NOVAPAY ADMIN
            </div>

            <h1
              style={{
                margin: 0,
                color: "#171717",
                fontSize: "30px",
                fontWeight: "800",
              }}
            >
              Analytics Overview
            </h1>

            <p
              style={{
                margin: "7px 0 0",
                color: "#777",
                fontSize: "14px",
              }}
            >
              Monitor customers, transactions and financial activity
            </p>
          </div>

          <div
            style={{
              background: "#a30d2d",
              color: "#fff",
              padding: "10px 18px",
              borderRadius: "9px",
              fontSize: "13px",
              fontWeight: "700",
            }}
          >
            Live Analytics
          </div>
        </div>

        {loading ? (
          <div
            style={{
              ...cardStyle,
              padding: "50px",
              textAlign: "center",
              color: "#777",
            }}
          >
            Loading analytics...
          </div>
        ) : (
          <>
            {/* KPI CARDS */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "18px",
                marginBottom: "22px",
              }}
            >
              <div style={{ ...cardStyle, padding: "22px" }}>
                <div
                  style={{
                    color: "#777",
                    fontSize: "13px",
                    fontWeight: "700",
                    marginBottom: "12px",
                  }}
                >
                  TOTAL CUSTOMERS
                </div>

                <div
                  style={{
                    fontSize: "29px",
                    fontWeight: "800",
                    color: "#171717",
                  }}
                >
                  {data.totalUsers}
                </div>

                <div
                  style={{
                    marginTop: "8px",
                    color: "#15803d",
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                >
                  Customer accounts
                </div>
              </div>

              <div style={{ ...cardStyle, padding: "22px" }}>
                <div
                  style={{
                    color: "#777",
                    fontSize: "13px",
                    fontWeight: "700",
                    marginBottom: "12px",
                  }}
                >
                  TOTAL BALANCE
                </div>

                <div
                  style={{
                    fontSize: "29px",
                    fontWeight: "800",
                    color: "#a30d2d",
                  }}
                >
                  {money(data.totalBalance)}
                </div>

                <div
                  style={{
                    marginTop: "8px",
                    color: "#777",
                    fontSize: "12px",
                  }}
                >
                  Customer funds
                </div>
              </div>

              <div style={{ ...cardStyle, padding: "22px" }}>
                <div
                  style={{
                    color: "#777",
                    fontSize: "13px",
                    fontWeight: "700",
                    marginBottom: "12px",
                  }}
                >
                  TRANSACTIONS
                </div>

                <div
                  style={{
                    fontSize: "29px",
                    fontWeight: "800",
                    color: "#171717",
                  }}
                >
                  {data.totalTransactions}
                </div>

                <div
                  style={{
                    marginTop: "8px",
                    color: "#777",
                    fontSize: "12px",
                  }}
                >
                  Total processed
                </div>
              </div>

              <div style={{ ...cardStyle, padding: "22px" }}>
                <div
                  style={{
                    color: "#777",
                    fontSize: "13px",
                    fontWeight: "700",
                    marginBottom: "12px",
                  }}
                >
                  ADMIN USERS
                </div>

                <div
                  style={{
                    fontSize: "29px",
                    fontWeight: "800",
                    color: "#171717",
                  }}
                >
                  {data.adminUsers}
                </div>

                <div
                  style={{
                    marginTop: "8px",
                    color: "#a30d2d",
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                >
                  Administrative accounts
                </div>
              </div>
            </div>

            {/* TRANSACTION SUMMARY */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "16px",
                marginBottom: "22px",
              }}
            >
              <div
                style={{
                  ...cardStyle,
                  padding: "20px",
                  borderLeft: "4px solid #15803d",
                }}
              >
                <div style={{ color: "#777", fontSize: "13px" }}>
                  TOTAL DEPOSITS
                </div>

                <div
                  style={{
                    fontSize: "23px",
                    fontWeight: "800",
                    marginTop: "8px",
                  }}
                >
                  {money(stats.deposits)}
                </div>
              </div>

              <div
                style={{
                  ...cardStyle,
                  padding: "20px",
                  borderLeft: "4px solid #b91c1c",
                }}
              >
                <div style={{ color: "#777", fontSize: "13px" }}>
                  TOTAL WITHDRAWALS
                </div>

                <div
                  style={{
                    fontSize: "23px",
                    fontWeight: "800",
                    marginTop: "8px",
                  }}
                >
                  {money(stats.withdraws)}
                </div>
              </div>

              <div
                style={{
                  ...cardStyle,
                  padding: "20px",
                  borderLeft: "4px solid #a30d2d",
                }}
              >
                <div style={{ color: "#777", fontSize: "13px" }}>
                  TOTAL TRANSFERS
                </div>

                <div
                  style={{
                    fontSize: "23px",
                    fontWeight: "800",
                    marginTop: "8px",
                  }}
                >
                  {money(stats.transfers)}
                </div>
              </div>

              <div
                style={{
                  ...cardStyle,
                  padding: "20px",
                  borderLeft: "4px solid #6b7280",
                }}
              >
                <div style={{ color: "#777", fontSize: "13px" }}>
                  TRANSACTION COUNT
                </div>

                <div
                  style={{
                    fontSize: "23px",
                    fontWeight: "800",
                    marginTop: "8px",
                  }}
                >
                  {stats.count}
                </div>
              </div>
            </div>

            {/* CHARTS */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(360px, 1fr))",
                gap: "22px",
              }}
            >
              <div style={chartCardStyle}>
                <div style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      color: "#a30d2d",
                      fontSize: "11px",
                      fontWeight: "800",
                      letterSpacing: "1px",
                    }}
                  >
                    CUSTOMER ACTIVITY
                  </div>

                  <h2
                    style={{
                      margin: "6px 0 0",
                      fontSize: "20px",
                      color: "#171717",
                    }}
                  >
                    User Growth
                  </h2>
                </div>

                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={userGrowth}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11 }}
                    />

                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 11 }}
                    />

                    <Tooltip contentStyle={chartTooltip} />

                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#a30d2d"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div style={chartCardStyle}>
                <div style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      color: "#a30d2d",
                      fontSize: "11px",
                      fontWeight: "800",
                      letterSpacing: "1px",
                    }}
                  >
                    FINANCIAL ACTIVITY
                  </div>

                  <h2
                    style={{
                      margin: "6px 0 0",
                      fontSize: "20px",
                      color: "#171717",
                    }}
                  >
                    Transaction Analysis
                  </h2>
                </div>

                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={chartData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11 }}
                    />

                    <YAxis tick={{ fontSize: 11 }} />

                    <Tooltip contentStyle={chartTooltip} />

                    <Bar
                      dataKey="amount"
                      fill="#a30d2d"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* KYC */}

            <div
              style={{
                ...chartCardStyle,
                marginTop: "22px",
              }}
            >
              <div style={{ marginBottom: "20px" }}>
                <div
                  style={{
                    color: "#a30d2d",
                    fontSize: "11px",
                    fontWeight: "800",
                    letterSpacing: "1px",
                  }}
                >
                  COMPLIANCE
                </div>

                <h2
                  style={{
                    margin: "6px 0 0",
                    fontSize: "20px",
                  }}
                >
                  KYC Overview
                </h2>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "15px",
                }}
              >
                <div
                  style={{
                    background: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    padding: "20px",
                    borderRadius: "12px",
                  }}
                >
                  <div
                    style={{
                      color: "#15803d",
                      fontSize: "13px",
                      fontWeight: "700",
                    }}
                  >
                    VERIFIED
                  </div>

                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: "800",
                      marginTop: "7px",
                      color: "#166534",
                    }}
                  >
                    {kycStats.verified}
                  </div>
                </div>

                <div
                  style={{
                    background: "#fffbeb",
                    border: "1px solid #fde68a",
                    padding: "20px",
                    borderRadius: "12px",
                  }}
                >
                  <div
                    style={{
                      color: "#92400e",
                      fontSize: "13px",
                      fontWeight: "700",
                    }}
                  >
                    PENDING
                  </div>

                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: "800",
                      marginTop: "7px",
                      color: "#92400e",
                    }}
                  >
                    {kycStats.pending}
                  </div>
                </div>

                <div
                  style={{
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    padding: "20px",
                    borderRadius: "12px",
                  }}
                >
                  <div
                    style={{
                      color: "#b91c1c",
                      fontSize: "13px",
                      fontWeight: "700",
                    }}
                  >
                    REJECTED
                  </div>

                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: "800",
                      marginTop: "7px",
                      color: "#b91c1c",
                    }}
                  >
                    {kycStats.rejected}
                  </div>
                </div>
              </div>
            </div>

            {/* SPENDING */}

            <div
              style={{
                ...chartCardStyle,
                marginTop: "22px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <div>
                  <div
                    style={{
                      color: "#a30d2d",
                      fontSize: "11px",
                      fontWeight: "800",
                      letterSpacing: "1px",
                    }}
                  >
                    CUSTOMER SPENDING
                  </div>

                  <h2
                    style={{
                      margin: "6px 0 0",
                      fontSize: "20px",
                    }}
                  >
                    Spending Analytics
                  </h2>
                </div>

                <div
                  style={{
                    color: "#a30d2d",
                    fontSize: "18px",
                    fontWeight: "800",
                  }}
                >
                  {money(totalSpending)}
                </div>
              </div>

              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={spendingChart}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11 }}
                  />

                  <YAxis tick={{ fontSize: 11 }} />

                  <Tooltip contentStyle={chartTooltip} />

                  <Bar
                    dataKey="amount"
                    fill="#6b7280"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default AnalyticsPage;
