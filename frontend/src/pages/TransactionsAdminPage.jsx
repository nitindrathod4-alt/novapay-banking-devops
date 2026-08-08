import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import api from "../services/api";

function TransactionsAdminPage() {
  const [transactions, setTransactions] = useState([]);
  const [username, setUsername] = useState("");
  const [type, setType] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const res = await api.get("/transactions/all");
      setTransactions(res.data.transactions || []);
    } catch (err) {
      console.log(err);
    }
  };

  const filterTransactions = async () => {
    try {
      const res = await api.get("/transactions/filter", {
        params: {
          username,
          type,
          from,
          to,
        },
      });

      setTransactions(res.data.transactions || []);
    } catch (err) {
      console.log(err);
    }
  };

  const resetFilters = () => {
    setUsername("");
    setType("");
    setFrom("");
    setTo("");
    loadTransactions();
  };

  const exportExcel = async () => {
    try {
      const res = await api.get("/transactions/export", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");

      link.href = url;
      link.download = "NovaPay-Transactions.xlsx";
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);
      alert("Export failed");
    }
  };

  const totalTransactions = transactions.length;

  const deposits = transactions.filter(
    (t) => t.type?.toLowerCase() === "deposit"
  ).length;

  const withdrawals = transactions.filter(
    (t) => t.type?.toLowerCase() === "withdraw"
  ).length;

  const transfers = transactions.filter(
    (t) => t.type?.toLowerCase() === "transfer"
  ).length;

  const totalAmount = transactions.reduce(
    (sum, t) => sum + Number(t.amount || 0),
    0
  );

  const formatMoney = (amount) =>
    Number(amount || 0).toLocaleString("en-IN");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f6f7f9",
        display: "flex",
      }}
    >
      {/* ADMIN SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <main
        style={{
          flex: 1,
          minWidth: 0,
          padding: "46px 52px",
          boxSizing: "border-box",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "32px",
            gap: "20px",
          }}
        >
          <div>
            <div
              style={{
                color: "#a30d2d",
                fontWeight: "900",
                fontSize: "18px",
                letterSpacing: "2px",
                marginBottom: "10px",
              }}
            >
              NOVAPAY ADMIN
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "42px",
                fontWeight: "900",
                color: "#111827",
                letterSpacing: "-1px",
              }}
            >
              Transactions
            </h1>

            <p
              style={{
                margin: "10px 0 0",
                color: "#64748b",
                fontSize: "17px",
              }}
            >
              Monitor and manage all customer transactions
            </p>
          </div>

          <button
            onClick={exportExcel}
            style={{
              background: "#b10d32",
              color: "#fff",
              border: "none",
              padding: "15px 24px",
              borderRadius: "12px",
              fontWeight: "800",
              fontSize: "15px",
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(177,13,50,.18)",
            }}
          >
            ↓ Export Excel
          </button>
        </div>

        {/* SUMMARY CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          <SummaryCard
            title="Total Transactions"
            value={totalTransactions}
            subtitle="All processed transactions"
          />

          <SummaryCard
            title="Deposits"
            value={deposits}
            subtitle="Deposit transactions"
            valueColor="#15803d"
          />

          <SummaryCard
            title="Withdrawals"
            value={withdrawals}
            subtitle="Withdrawal transactions"
            valueColor="#b91c1c"
          />

          <SummaryCard
            title="Transfers"
            value={transfers}
            subtitle="Money transfers"
            valueColor="#a30d2d"
          />
        </div>

        {/* TOTAL AMOUNT */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #eadfe2",
            borderRadius: "16px",
            padding: "20px 24px",
            marginBottom: "24px",
            boxShadow: "0 5px 18px rgba(0,0,0,.04)",
          }}
        >
          <div
            style={{
              color: "#64748b",
              fontSize: "13px",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: ".5px",
            }}
          >
            Total Transaction Amount
          </div>

          <div
            style={{
              marginTop: "6px",
              color: "#a30d2d",
              fontSize: "30px",
              fontWeight: "900",
            }}
          >
            ₹ {formatMoney(totalAmount)}
          </div>
        </div>

        {/* FILTER CARD */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #eadfe2",
            borderRadius: "16px",
            padding: "22px",
            marginBottom: "24px",
            boxShadow: "0 5px 18px rgba(0,0,0,.04)",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              fontWeight: "900",
              color: "#111827",
              marginBottom: "16px",
            }}
          >
            Transaction Filters
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(180px,1.3fr) minmax(150px,1fr) minmax(150px,1fr) minmax(150px,1fr) auto auto",
              gap: "12px",
              alignItems: "center",
            }}
          >
            <input
              placeholder="🔍 Search username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={inputStyle}
            >
              <option value="">All Types</option>
              <option value="deposit">Deposit</option>
              <option value="withdraw">Withdraw</option>
              <option value="transfer">Transfer</option>
            </select>

            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              style={inputStyle}
            />

            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              style={inputStyle}
            />

            <button
              onClick={filterTransactions}
              style={primaryButton}
            >
              Filter
            </button>

            <button
              onClick={resetFilters}
              style={secondaryButton}
            >
              Reset
            </button>
          </div>
        </div>

        {/* TRANSACTIONS TABLE */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #eadfe2",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 5px 18px rgba(0,0,0,.04)",
          }}
        >
          <div
            style={{
              padding: "22px 24px",
              borderBottom: "1px solid #eee",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  color: "#a30d2d",
                  fontSize: "13px",
                  fontWeight: "900",
                  letterSpacing: "1px",
                }}
              >
                FINANCIAL ACTIVITY
              </div>

              <div
                style={{
                  marginTop: "4px",
                  fontSize: "21px",
                  fontWeight: "900",
                  color: "#111827",
                }}
              >
                Recent Transactions
              </div>
            </div>

            <div
              style={{
                background: "#fdf0f3",
                color: "#a30d2d",
                padding: "8px 13px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: "800",
              }}
            >
              {transactions.length} Records
            </div>
          </div>

          {transactions.length === 0 ? (
            <div
              style={{
                padding: "70px 20px",
                textAlign: "center",
                color: "#64748b",
              }}
            >
              No transactions found
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "900px",
                }}
              >
                <thead>
                  <tr style={{ background: "#fafafa" }}>
                    <th style={thStyle}>Transaction</th>
                    <th style={thStyle}>Sender</th>
                    <th style={thStyle}>Receiver</th>
                    <th style={thStyle}>Type</th>
                    <th style={thStyle}>Amount</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.map((t) => {
                    const transactionType =
                      t.type?.toLowerCase() || "";

                    const isDeposit = transactionType === "deposit";
                    const isWithdraw =
                      transactionType === "withdraw";

                    return (
                      <tr
                        key={t._id}
                        style={{
                          borderTop: "1px solid #f0f0f0",
                        }}
                      >
                        <td style={tdStyle}>
                          <div
                            style={{
                              fontWeight: "800",
                              color: "#111827",
                            }}
                          >
                            #{t._id?.slice(-8)}
                          </div>

                          <div
                            style={{
                              fontSize: "11px",
                              color: "#94a3b8",
                              marginTop: "3px",
                            }}
                          >
                            Transaction ID
                          </div>
                        </td>

                        <td style={tdStyle}>
                          <b>
                            {t.sender?.username || "-"}
                          </b>
                        </td>

                        <td style={tdStyle}>
                          <b>
                            {t.receiver?.username || "-"}
                          </b>
                        </td>

                        <td style={tdStyle}>
                          <span
                            style={{
                              ...typeBadge,
                              background: isDeposit
                                ? "#dcfce7"
                                : isWithdraw
                                ? "#fee2e2"
                                : "#fdf0f3",
                              color: isDeposit
                                ? "#15803d"
                                : isWithdraw
                                ? "#b91c1c"
                                : "#a30d2d",
                            }}
                          >
                            {transactionType
                              ? transactionType
                                  .charAt(0)
                                  .toUpperCase() +
                                transactionType.slice(1)
                              : "-"}
                          </span>
                        </td>

                        <td style={tdStyle}>
                          <span
                            style={{
                              fontWeight: "900",
                              fontSize: "15px",
                            }}
                          >
                            ₹ {formatMoney(t.amount)}
                          </span>
                        </td>

                        <td style={tdStyle}>
                          <span
                            style={{
                              background: "#dcfce7",
                              color: "#15803d",
                              padding: "6px 10px",
                              borderRadius: "20px",
                              fontSize: "12px",
                              fontWeight: "800",
                            }}
                          >
                            ✓ {t.status || "Success"}
                          </span>
                        </td>

                        <td style={tdStyle}>
                          <div style={{ color: "#374151" }}>
                            {t.createdAt
                              ? new Date(
                                  t.createdAt
                                ).toLocaleDateString("en-IN")
                              : "-"}
                          </div>

                          <div
                            style={{
                              fontSize: "11px",
                              color: "#94a3b8",
                              marginTop: "3px",
                            }}
                          >
                            {t.createdAt
                              ? new Date(
                                  t.createdAt
                                ).toLocaleTimeString(
                                  "en-IN",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )
                              : ""}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  subtitle,
  valueColor = "#111827",
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #eadfe2",
        borderRadius: "16px",
        padding: "25px",
        minHeight: "125px",
        boxSizing: "border-box",
        boxShadow: "0 5px 18px rgba(0,0,0,.04)",
      }}
    >
      <div
        style={{
          color: "#64748b",
          fontSize: "14px",
          fontWeight: "700",
        }}
      >
        {title}
      </div>

      <div
        style={{
          marginTop: "12px",
          fontSize: "32px",
          fontWeight: "900",
          color: valueColor,
        }}
      >
        {value}
      </div>

      <div
        style={{
          marginTop: "6px",
          color: "#64748b",
          fontSize: "13px",
        }}
      >
        {subtitle}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "11px 13px",
  borderRadius: "9px",
  border: "1px solid #d9dde3",
  background: "#fff",
  color: "#374151",
  fontSize: "13px",
  outline: "none",
};

const primaryButton = {
  padding: "11px 17px",
  borderRadius: "9px",
  border: "none",
  background: "#a30d2d",
  color: "#fff",
  fontWeight: "800",
  cursor: "pointer",
};

const secondaryButton = {
  padding: "11px 17px",
  borderRadius: "9px",
  border: "1px solid #d1d5db",
  background: "#fff",
  color: "#374151",
  fontWeight: "800",
  cursor: "pointer",
};

const thStyle = {
  padding: "15px 18px",
  textAlign: "left",
  color: "#64748b",
  fontSize: "11px",
  fontWeight: "900",
  textTransform: "uppercase",
  letterSpacing: ".5px",
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "16px 18px",
  color: "#374151",
  fontSize: "13px",
  whiteSpace: "nowrap",
};

const typeBadge = {
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "800",
};

export default TransactionsAdminPage;
