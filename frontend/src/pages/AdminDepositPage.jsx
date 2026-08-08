import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import AdminSidebar from "../components/AdminSidebar";

function AdminDepositPage() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await api.get("/users");

      setUsers(
        (res.data.users || []).filter(
          (u) => u.role !== "admin"
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deposit = async () => {
    if (!userId) {
      alert("Please select a customer");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(`/users/${userId}/deposit`, {
        amount: Number(amount),
      });

      alert(res.data.message);

      setAmount("");
      loadUsers();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Deposit Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const selectedUser = users.find(
    (u) => u._id === userId
  );

  return (
    <div style={page}>
      <AdminSidebar />

      <main style={main}>
        <div style={header}>
          <div>
            <div style={eyebrow}>ADMIN PANEL</div>

            <h1 style={title}>
              Deposit Money
            </h1>

            <p style={subtitle}>
              Credit funds directly to a customer account.
            </p>
          </div>

          <Link
            to="/admin"
            style={backButton}
          >
            ← Dashboard
          </Link>
        </div>

        <div style={layout}>
          <section style={card}>
            <div style={cardHeader}>
              <div>
                <h2 style={cardTitle}>
                  Customer Deposit
                </h2>

                <p style={cardSubtitle}>
                  Select a customer and enter the amount
                  to credit.
                </p>
              </div>

              <div style={secureBadge}>
                <span>●</span>
                Secure
              </div>
            </div>

            <div style={sectionLabel}>
              CUSTOMER ACCOUNT
            </div>

            <label style={label}>
              Select Customer
            </label>

            <select
              value={userId}
              onChange={(e) =>
                setUserId(e.target.value)
              }
              style={select}
            >
              <option value="">
                Choose a customer
              </option>

              {users.map((u) => (
                <option
                  key={u._id}
                  value={u._id}
                >
                  {u.name} • {u.username} • ₹
                  {Number(
                    u.balance || 0
                  ).toLocaleString("en-IN")}
                </option>
              ))}
            </select>

            {selectedUser && (
              <div style={customerPreview}>
                <div style={avatar}>
                  {(selectedUser.name || "U")
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={customerName}>
                    {selectedUser.name}
                  </div>

                  <div style={customerUsername}>
                    @{selectedUser.username}
                  </div>
                </div>

                <div style={currentBalance}>
                  <div style={balanceLabel}>
                    CURRENT BALANCE
                  </div>

                  <div style={balanceValue}>
                    ₹
                    {Number(
                      selectedUser.balance || 0
                    ).toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            )}

            <div style={sectionLabel}>
              DEPOSIT DETAILS
            </div>

            <label style={label}>
              Deposit Amount
            </label>

            <div style={amountBox}>
              <span style={rupee}>₹</span>

              <input
                type="number"
                min="1"
                placeholder="0.00"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
                style={amountInput}
              />
            </div>

            <div style={notice}>
              <div style={noticeIcon}>i</div>

              <div>
                <div style={noticeTitle}>
                  Admin transaction
                </div>

                <div style={noticeText}>
                  This amount will be credited directly
                  to the selected customer's account.
                </div>
              </div>
            </div>

            <button
              onClick={deposit}
              disabled={loading}
              style={{
                ...depositButton,
                opacity: loading ? 0.7 : 1,
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {loading
                ? "Processing..."
                : "Confirm Deposit →"}
            </button>
          </section>

          <aside style={sideCard}>
            <div style={sideIcon}>₹</div>

            <h3 style={sideTitle}>
              Account Credit
            </h3>

            <p style={sideText}>
              Use this section to securely credit
              funds into an existing NovaPay customer
              account.
            </p>

            <div style={divider} />

            <div style={infoRow}>
              <span>Customers</span>
              <strong>{users.length}</strong>
            </div>

            <div style={infoRow}>
              <span>Selected</span>
              <strong>
                {selectedUser ? "Yes" : "No"}
              </strong>
            </div>

            <div style={divider} />

            <div style={security}>
              <span>🔒</span>
              Admin-only transaction
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

const page = {
  display: "flex",
  minHeight: "100vh",
  background: "#f5f7fa",
};

const main = {
  flex: 1,
  padding: "34px 38px",
  overflowX: "hidden",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 20,
  marginBottom: 28,
};

const eyebrow = {
  color: "#64748b",
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: 1.2,
  marginBottom: 7,
};

const title = {
  margin: 0,
  color: "#0b1f3a",
  fontSize: 32,
  fontWeight: 850,
};

const subtitle = {
  margin: "8px 0 0",
  color: "#64748b",
  fontSize: 14,
};

const backButton = {
  textDecoration: "none",
  padding: "11px 16px",
  borderRadius: 11,
  border: "1px solid #dbe3ec",
  background: "#fff",
  color: "#16477f",
  fontSize: 13,
  fontWeight: 800,
};

const layout = {
  display: "grid",
  gridTemplateColumns:
    "minmax(0, 1fr) 290px",
  gap: 24,
  alignItems: "start",
};

const card = {
  background: "#fff",
  border: "1px solid #e7ebf0",
  borderRadius: 20,
  boxShadow:
    "0 8px 25px rgba(15,23,42,.05)",
  padding: 28,
};

const cardHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 30,
  paddingBottom: 22,
  borderBottom:
    "1px solid #edf1f5",
};

const cardTitle = {
  margin: 0,
  color: "#0b1f3a",
  fontSize: 19,
  fontWeight: 850,
};

const cardSubtitle = {
  margin: "6px 0 0",
  color: "#94a3b8",
  fontSize: 12,
};

const secureBadge = {
  display: "flex",
  alignItems: "center",
  gap: 7,
  padding: "7px 11px",
  borderRadius: 20,
  background: "#ecfdf5",
  color: "#047857",
  fontSize: 12,
  fontWeight: 800,
};

const sectionLabel = {
  color: "#64748b",
  fontSize: 11,
  fontWeight: 850,
  letterSpacing: 1,
  marginBottom: 12,
  marginTop: 8,
};

const label = {
  display: "block",
  color: "#334155",
  fontSize: 12,
  fontWeight: 800,
  marginBottom: 8,
};

const select = {
  width: "100%",
  height: 48,
  boxSizing: "border-box",
  padding: "0 14px",
  border: "1px solid #dbe3ec",
  borderRadius: 11,
  background: "#fbfcfe",
  color: "#334155",
  fontSize: 13,
  outline: "none",
  marginBottom: 18,
};

const customerPreview = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: 15,
  marginBottom: 28,
  borderRadius: 13,
  background: "#f5f8fc",
  border: "1px solid #e3eaf2",
};

const avatar = {
  width: 43,
  height: 43,
  borderRadius: "50%",
  background: "#eaf1ff",
  color: "#16477f",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 850,
};

const customerName = {
  color: "#0b1f3a",
  fontSize: 14,
  fontWeight: 850,
};

const customerUsername = {
  color: "#94a3b8",
  fontSize: 11,
  marginTop: 3,
};

const currentBalance = {
  textAlign: "right",
};

const balanceLabel = {
  color: "#94a3b8",
  fontSize: 9,
  fontWeight: 850,
  letterSpacing: ".5px",
};

const balanceValue = {
  color: "#0b1f3a",
  fontSize: 16,
  fontWeight: 850,
  marginTop: 3,
};

const amountBox = {
  position: "relative",
  marginBottom: 20,
};

const rupee = {
  position: "absolute",
  left: 16,
  top: 12,
  color: "#16477f",
  fontSize: 20,
  fontWeight: 850,
};

const amountInput = {
  width: "100%",
  height: 54,
  boxSizing: "border-box",
  paddingLeft: 42,
  paddingRight: 15,
  border: "1px solid #dbe3ec",
  borderRadius: 12,
  background: "#fbfcfe",
  outline: "none",
  color: "#0b1f3a",
  fontSize: 20,
  fontWeight: 800,
};

const notice = {
  display: "flex",
  gap: 12,
  padding: "14px 16px",
  background: "#f4f7fb",
  border: "1px solid #e3eaf2",
  borderRadius: 12,
  marginBottom: 20,
};

const noticeIcon = {
  width: 24,
  height: 24,
  borderRadius: "50%",
  background: "#16477f",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12,
  fontWeight: 800,
  flexShrink: 0,
};

const noticeTitle = {
  color: "#0b1f3a",
  fontSize: 12,
  fontWeight: 850,
  marginBottom: 3,
};

const noticeText = {
  color: "#64748b",
  fontSize: 11,
  lineHeight: 1.5,
};

const depositButton = {
  width: "100%",
  height: 48,
  border: 0,
  borderRadius: 11,
  background: "#b5121b",
  color: "#fff",
  fontSize: 14,
  fontWeight: 850,
  boxShadow:
    "0 7px 18px rgba(181,18,27,.20)",
};

const sideCard = {
  background: "#0b1f3a",
  color: "#fff",
  borderRadius: 20,
  padding: 25,
  boxShadow:
    "0 10px 30px rgba(11,31,58,.16)",
};

const sideIcon = {
  width: 50,
  height: 50,
  borderRadius: 15,
  background: "rgba(255,255,255,.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 22,
  fontWeight: 850,
  marginBottom: 18,
};

const sideTitle = {
  margin: 0,
  fontSize: 19,
  fontWeight: 850,
};

const sideText = {
  color: "#b9c5d4",
  fontSize: 12,
  lineHeight: 1.6,
  marginTop: 9,
};

const divider = {
  height: 1,
  background:
    "rgba(255,255,255,.12)",
  margin: "22px 0",
};

const infoRow = {
  display: "flex",
  justifyContent: "space-between",
  color: "#b9c5d4",
  fontSize: 12,
  marginBottom: 14,
};

const security = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  color: "#cbd5e1",
  fontSize: 11,
  fontWeight: 700,
};

export default AdminDepositPage;
