import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import AdminSidebar from "../components/AdminSidebar";

function AddUserPage() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    mobileNumber: "",
    email: "",
    balance: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/users", {
        ...form,
        balance: Number(form.balance),
      });

      alert("✅ User Created Successfully");

      setForm({
        name: "",
        username: "",
        password: "",
        mobileNumber: "",
        email: "",
        balance: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to Create User");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <AdminSidebar />

      <main style={main}>
        <div style={topBar}>
          <div>
            <div style={eyebrow}>ADMIN PANEL</div>
            <h1 style={title}>Create New User</h1>
            <p style={subtitle}>
              Add a new customer account to NovaPay.
            </p>
          </div>

          <Link to="/admin/users" style={backButton}>
            ← Back to Users
          </Link>
        </div>

        <div style={layout}>
          <section style={formCard}>
            <div style={cardHeader}>
              <div>
                <h2 style={cardTitle}>Customer Information</h2>
                <p style={cardSubtitle}>
                  Enter the customer's account details below.
                </p>
              </div>

              <div style={secureBadge}>
                <span>●</span>
                Secure
              </div>
            </div>

            <form onSubmit={createUser}>
              <div style={sectionLabel}>PERSONAL DETAILS</div>

              <div style={grid}>
                <Field
                  label="Full Name"
                  name="name"
                  placeholder="Enter full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

                <Field
                  label="Username"
                  name="username"
                  placeholder="Choose username"
                  value={form.username}
                  onChange={handleChange}
                  required
                />

                <Field
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="customer@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

                <Field
                  label="Mobile Number"
                  name="mobileNumber"
                  placeholder="Enter mobile number"
                  value={form.mobileNumber}
                  onChange={handleChange}
                />
              </div>

              <div style={sectionLabel}>ACCOUNT SETUP</div>

              <div style={grid}>
                <Field
                  label="Login Password"
                  name="password"
                  type="password"
                  placeholder="Create secure password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />

                <Field
                  label="Opening Balance"
                  name="balance"
                  type="number"
                  placeholder="0"
                  value={form.balance}
                  onChange={handleChange}
                  prefix="₹"
                />
              </div>

              <div style={notice}>
                <div style={noticeIcon}>i</div>

                <div>
                  <div style={noticeTitle}>Account creation</div>
                  <div style={noticeText}>
                    The customer will be created with the information
                    provided above. You can manage the account after
                    creation from User Management.
                  </div>
                </div>
              </div>

              <div style={actions}>
                <Link to="/admin/users" style={cancelButton}>
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    ...createButton,
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Creating..." : "Create User →"}
                </button>
              </div>
            </form>
          </section>

          <aside style={sideCard}>
            <div style={sideIcon}>👤</div>

            <h3 style={sideTitle}>New Customer</h3>

            <p style={sideText}>
              Create a secure NovaPay customer profile with account
              credentials and opening balance.
            </p>

            <div style={checkList}>
              <Check text="Customer profile" />
              <Check text="Login credentials" />
              <Check text="Banking account" />
              <Check text="Opening balance" />
            </div>

            <div style={sideFooter}>
              <span style={lock}>🔒</span>
              Admin-only access
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  prefix,
}) {
  return (
    <div style={field}>
      <label style={labelStyle}>
        {label}
        {required && <span style={{ color: "#b5121b" }}> *</span>}
      </label>

      <div style={inputWrap}>
        {prefix && <span style={prefixStyle}>{prefix}</span>}

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          style={{
            ...input,
            paddingLeft: prefix ? 34 : 14,
          }}
        />
      </div>
    </div>
  );
}

function Check({ text }) {
  return (
    <div style={check}>
      <span style={checkIcon}>✓</span>
      <span>{text}</span>
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

const topBar = {
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
  gridTemplateColumns: "minmax(0, 1fr) 290px",
  gap: 24,
  alignItems: "start",
};

const formCard = {
  background: "#fff",
  border: "1px solid #e7ebf0",
  borderRadius: 20,
  boxShadow: "0 8px 25px rgba(15,23,42,.05)",
  padding: "28px",
};

const cardHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 30,
  paddingBottom: 22,
  borderBottom: "1px solid #edf1f5",
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
  marginBottom: 15,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(2,minmax(0,1fr))",
  gap: 20,
  marginBottom: 28,
};

const field = {
  display: "flex",
  flexDirection: "column",
};

const labelStyle = {
  color: "#334155",
  fontSize: 12,
  fontWeight: 800,
  marginBottom: 8,
};

const inputWrap = {
  position: "relative",
};

const input = {
  width: "100%",
  height: 46,
  boxSizing: "border-box",
  border: "1px solid #dbe3ec",
  borderRadius: 11,
  background: "#fbfcfe",
  outline: "none",
  color: "#0f172a",
  fontSize: 13,
};

const prefixStyle = {
  position: "absolute",
  left: 14,
  top: 14,
  color: "#64748b",
  fontWeight: 700,
  zIndex: 1,
};

const notice = {
  display: "flex",
  gap: 12,
  padding: "14px 16px",
  background: "#f4f7fb",
  border: "1px solid #e3eaf2",
  borderRadius: 12,
  marginBottom: 26,
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

const actions = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 12,
};

const cancelButton = {
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 20px",
  borderRadius: 11,
  border: "1px solid #dbe3ec",
  color: "#475569",
  background: "#fff",
  fontSize: 13,
  fontWeight: 800,
};

const createButton = {
  border: 0,
  padding: "12px 22px",
  borderRadius: 11,
  background: "#b5121b",
  color: "#fff",
  fontSize: 13,
  fontWeight: 850,
  boxShadow: "0 7px 18px rgba(181,18,27,.20)",
};

const sideCard = {
  background: "#0b1f3a",
  color: "#fff",
  borderRadius: 20,
  padding: 25,
  boxShadow: "0 10px 30px rgba(11,31,58,.16)",
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

const checkList = {
  marginTop: 25,
  paddingTop: 20,
  borderTop: "1px solid rgba(255,255,255,.12)",
};

const check = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginBottom: 14,
  color: "#e2e8f0",
  fontSize: 12,
  fontWeight: 700,
};

const checkIcon = {
  width: 22,
  height: 22,
  borderRadius: "50%",
  background: "rgba(255,255,255,.12)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: 11,
};

const sideFooter = {
  marginTop: 25,
  paddingTop: 18,
  borderTop: "1px solid rgba(255,255,255,.12)",
  color: "#94a3b8",
  fontSize: 11,
  fontWeight: 700,
};

const lock = {
  marginRight: 7,
};

export default AddUserPage;
