import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import AdminSidebar from "../components/AdminSidebar";

function AdminWithdrawPage() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");

  const [requestId, setRequestId] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
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

  const createWithdrawalRequest = async () => {
    if (!userId) {
      alert("Please select a user");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        `/withdrawals/${userId}/request`,
        {
          amount: Number(amount),
        }
      );

      setRequestId(res.data.requestId);
      setOtp("");
      setStep(2);

      alert(
        "✅ OTP has been sent to the user's registered email."
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Withdrawal request failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const approveWithdrawal = async () => {
    if (!otp || otp.length !== 6) {
      alert("Enter the 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        `/withdrawals/${requestId}/approve`,
        {
          otp,
        }
      );

      alert(
        `✅ ${res.data.message}\n\n` +
          `New Balance: ₹${res.data.balance}`
      );

      setAmount("");
      setOtp("");
      setRequestId("");
      setUserId("");
      setStep(1);

      loadUsers();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const cancelRequest = () => {
    setAmount("");
    setOtp("");
    setRequestId("");
    setUserId("");
    setStep(1);
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
              Withdraw Money
            </h1>

            <p style={subtitle}>
              Securely process a withdrawal from a
              customer account.
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
            {step === 1 && (
              <>
                <div style={cardHeader}>
                  <div>
                    <h2 style={cardTitle}>
                      Create Withdrawal
                    </h2>

                    <p style={cardSubtitle}>
                      Select the customer and enter the
                      withdrawal amount.
                    </p>
                  </div>

                  <div style={secureBadge}>
                    <span>●</span>
                    Secure
                  </div>
                </div>

                <div style={stepIndicator}>
                  <div style={stepActive}>
                    <span>1</span>
                    Request
                  </div>

                  <div style={stepLine} />

                  <div style={stepInactive}>
                    <span>2</span>
                    Verify OTP
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
                        AVAILABLE BALANCE
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
                  WITHDRAWAL DETAILS
                </div>

                <label style={label}>
                  Withdrawal Amount
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
                  <div style={noticeIcon}>!</div>

                  <div>
                    <div style={noticeTitle}>
                      OTP verification required
                    </div>

                    <div style={noticeText}>
                      An approval OTP will be sent to the
                      customer's registered email before
                      the withdrawal is completed.
                    </div>
                  </div>
                </div>

                <button
                  onClick={createWithdrawalRequest}
                  disabled={loading}
                  style={{
                    ...primaryButton,
                    opacity: loading ? 0.7 : 1,
                    cursor: loading
                      ? "not-allowed"
                      : "pointer",
                  }}
                >
                  {loading
                    ? "Sending OTP..."
                    : "Send Approval OTP →"}
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div style={cardHeader}>
                  <div>
                    <h2 style={cardTitle}>
                      Verify Withdrawal
                    </h2>

                    <p style={cardSubtitle}>
                      Confirm the OTP sent to the
                      customer's registered email.
                    </p>
                  </div>

                  <div style={secureBadge}>
                    <span>●</span>
                    Protected
                  </div>
                </div>

                <div style={stepIndicator}>
                  <div style={stepDone}>
                    <span>✓</span>
                    Request
                  </div>

                  <div style={stepLineActive} />

                  <div style={stepActive}>
                    <span>2</span>
                    Verify OTP
                  </div>
                </div>

                <div style={withdrawSummary}>
                  <div style={summaryTop}>
                    <div>
                      <div style={summaryLabel}>
                        WITHDRAWAL AMOUNT
                      </div>

                      <div style={summaryAmount}>
                        ₹
                        {Number(
                          amount
                        ).toLocaleString("en-IN")}
                      </div>
                    </div>

                    <div style={summaryIcon}>
                      ₹
                    </div>
                  </div>

                  {selectedUser && (
                    <div style={summaryUser}>
                      <div style={smallAvatar}>
                        {(selectedUser.name || "U")
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>
                        <div style={summaryName}>
                          {selectedUser.name}
                        </div>

                        <div style={summaryUsername}>
                          @{selectedUser.username}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div style={otpMessage}>
                  <div style={mailIcon}>✉</div>

                  <div>
                    <div style={noticeTitle}>
                      OTP sent successfully
                    </div>

                    <div style={noticeText}>
                      Enter the 6-digit OTP sent to the
                      user's registered email address.
                    </div>
                  </div>
                </div>

                <label style={label}>
                  Enter 6-digit OTP
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength="6"
                  placeholder="••••••"
                  value={otp}
                  onChange={(e) =>
                    setOtp(
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                  style={otpInput}
                />

                <button
                  onClick={approveWithdrawal}
                  disabled={loading}
                  style={{
                    ...approveButton,
                    opacity: loading ? 0.7 : 1,
                    cursor: loading
                      ? "not-allowed"
                      : "pointer",
                  }}
                >
                  {loading
                    ? "Verifying..."
                    : "Verify OTP & Withdraw →"}
                </button>

                <button
                  onClick={cancelRequest}
                  disabled={loading}
                  style={cancelButton}
                >
                  Cancel Request
                </button>
              </>
            )}
          </section>

          <aside style={sideCard}>
            <div style={sideIcon}>🔐</div>

            <h3 style={sideTitle}>
              Secure Withdrawal
            </h3>

            <p style={sideText}>
              NovaPay uses an OTP approval step to
              protect customer withdrawals from
              unauthorized transactions.
            </p>

            <div style={divider} />

            <div style={securityItem}>
              <span>✓</span>
              Customer verification
            </div>

            <div style={securityItem}>
              <span>✓</span>
              Email OTP protection
            </div>

            <div style={securityItem}>
              <span>✓</span>
              Admin-controlled transaction
            </div>

            <div style={divider} />

            <div style={security}>
              🔒 Secure admin transaction
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
  gap: 15,
  marginBottom: 25,
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
  whiteSpace: "nowrap",
};

const stepIndicator = {
  display: "flex",
  alignItems: "center",
  marginBottom: 30,
};

const stepActive = {
  display: "flex",
  alignItems: "center",
  gap: 7,
  color: "#16477f",
  fontSize: 12,
  fontWeight: 850,
};

const stepDone = {
  display: "flex",
  alignItems: "center",
  gap: 7,
  color: "#047857",
  fontSize: 12,
  fontWeight: 850,
};

const stepInactive = {
  display: "flex",
  alignItems: "center",
  gap: 7,
  color: "#94a3b8",
  fontSize: 12,
  fontWeight: 750,
};

const stepLine = {
  height: 1,
  flex: 1,
  background: "#e2e8f0",
  margin: "0 14px",
};

const stepLineActive = {
  height: 1,
  flex: 1,
  background: "#9fb7d4",
  margin: "0 14px",
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
  background: "#b5121b",
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

const primaryButton = {
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

const withdrawSummary = {
  padding: 20,
  borderRadius: 15,
  background: "#f5f8fc",
  border: "1px solid #e3eaf2",
  marginBottom: 18,
};

const summaryTop = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const summaryLabel = {
  color: "#64748b",
  fontSize: 10,
  fontWeight: 850,
  letterSpacing: ".8px",
};

const summaryAmount = {
  color: "#0b1f3a",
  fontSize: 28,
  fontWeight: 900,
  marginTop: 5,
};

const summaryIcon = {
  width: 48,
  height: 48,
  borderRadius: 14,
  background: "#fff1f2",
  color: "#b5121b",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 20,
  fontWeight: 900,
};

const summaryUser = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginTop: 17,
  paddingTop: 15,
  borderTop: "1px solid #e2e8f0",
};

const smallAvatar = {
  width: 34,
  height: 34,
  borderRadius: "50%",
  background: "#eaf1ff",
  color: "#16477f",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 850,
  fontSize: 12,
};

const summaryName = {
  color: "#0b1f3a",
  fontSize: 12,
  fontWeight: 850,
};

const summaryUsername = {
  color: "#94a3b8",
  fontSize: 10,
  marginTop: 2,
};

const otpMessage = {
  display: "flex",
  gap: 12,
  padding: "14px 16px",
  background: "#eff6ff",
  border: "1px solid #dbeafe",
  borderRadius: 12,
  marginBottom: 22,
};

const mailIcon = {
  width: 28,
  height: 28,
  borderRadius: 9,
  background: "#16477f",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 13,
  flexShrink: 0,
};

const otpInput = {
  width: "100%",
  height: 58,
  boxSizing: "border-box",
  border: "1px solid #cbd5e1",
  borderRadius: 12,
  background: "#fbfcfe",
  outline: "none",
  textAlign: "center",
  letterSpacing: 10,
  fontSize: 25,
  fontWeight: 900,
  color: "#0b1f3a",
  marginBottom: 18,
};

const approveButton = {
  width: "100%",
  height: 49,
  border: 0,
  borderRadius: 11,
  background: "#047857",
  color: "#fff",
  fontSize: 14,
  fontWeight: 850,
  boxShadow:
    "0 7px 18px rgba(4,120,87,.18)",
};

const cancelButton = {
  width: "100%",
  height: 44,
  marginTop: 10,
  border: "1px solid #e2e8f0",
  borderRadius: 11,
  background: "#fff",
  color: "#475569",
  fontSize: 13,
  fontWeight: 750,
  cursor: "pointer",
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
  fontSize: 21,
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

const securityItem = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  color: "#d7e0eb",
  fontSize: 12,
  marginBottom: 15,
};

const divider = {
  height: 1,
  background:
    "rgba(255,255,255,.12)",
  margin: "22px 0",
};

const security = {
  color: "#cbd5e1",
  fontSize: 11,
  fontWeight: 700,
};

export default AdminWithdrawPage;
