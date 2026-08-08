import { useEffect, useState } from "react";
import api from "../services/api";
import AdminSidebar from "../components/AdminSidebar";

function AdminKyc() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadKyc = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/kyc");
      setUsers(res.data.users || []);
    } catch (err) {
      console.log("KYC Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadKyc();
  }, []);

  const approve = async (id) => {
    try {
      await api.put(`/admin/kyc/${id}/approve`);
      loadKyc();
    } catch (err) {
      alert(err.response?.data?.message || "Approval failed");
    }
  };

  const reject = async (id) => {
    try {
      await api.put(`/admin/kyc/${id}/reject`);
      loadKyc();
    } catch (err) {
      alert(err.response?.data?.message || "Rejection failed");
    }
  };

  const pending = users.filter(
    (u) => u.kycStatus === "Pending"
  ).length;

  const verified = users.filter(
    (u) => u.kycStatus === "Verified"
  ).length;

  const rejected = users.filter(
    (u) => u.kycStatus === "Rejected"
  ).length;

  const statusStyle = (status) => {
    if (status === "Verified") {
      return {
        background: "#ecfdf5",
        color: "#047857",
        border: "1px solid #a7f3d0",
      };
    }

    if (status === "Rejected") {
      return {
        background: "#fef2f2",
        color: "#b91c1c",
        border: "1px solid #fecaca",
      };
    }

    return {
      background: "#fff7ed",
      color: "#c2410c",
      border: "1px solid #fed7aa",
    };
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f6f8fb",
      }}
    >
      <AdminSidebar />

      <main
        style={{
          flex: 1,
          padding: "34px",
          overflowX: "auto",
        }}
      >
        {/* HEADER */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "28px",
            gap: "20px",
          }}
        >
          <div>
            <div
              style={{
                color: "#64748b",
                fontSize: "13px",
                fontWeight: "600",
                marginBottom: "7px",
              }}
            >
              ADMIN / COMPLIANCE
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "30px",
                fontWeight: "800",
                color: "#111827",
              }}
            >
              KYC Verification
            </h1>

            <p
              style={{
                margin: "8px 0 0",
                color: "#64748b",
                fontSize: "14px",
              }}
            >
              Review and verify customer identity documents.
            </p>
          </div>

          <button
            onClick={loadKyc}
            style={{
              border: "1px solid #dbe2ea",
              background: "#fff",
              padding: "11px 18px",
              borderRadius: "10px",
              fontWeight: "700",
              cursor: "pointer",
              color: "#334155",
            }}
          >
            ↻ Refresh
          </button>
        </div>

        {/* SUMMARY CARDS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(200px,1fr))",
            gap: "18px",
            marginBottom: "26px",
          }}
        >
          <SummaryCard
            title="Pending Review"
            value={pending}
            icon="⏳"
            subtitle="Requires attention"
          />

          <SummaryCard
            title="Verified"
            value={verified}
            icon="✓"
            subtitle="Approved customers"
          />

          <SummaryCard
            title="Rejected"
            value={rejected}
            icon="!"
            subtitle="Rejected applications"
          />

          <SummaryCard
            title="Total Applications"
            value={users.length}
            icon="▣"
            subtitle="KYC records"
          />
        </div>

        {/* KYC TABLE */}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "18px",
            boxShadow: "0 6px 24px rgba(15,23,42,.05)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "22px 24px",
              borderBottom: "1px solid #eef2f7",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "18px",
                  color: "#111827",
                }}
              >
                Customer KYC Applications
              </h2>

              <p
                style={{
                  margin: "5px 0 0",
                  fontSize: "13px",
                  color: "#64748b",
                }}
              >
                Identity verification records
              </p>
            </div>

            <span
              style={{
                background: "#f1f5f9",
                padding: "7px 12px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: "700",
                color: "#475569",
              }}
            >
              {users.length} Records
            </span>
          </div>

          {loading ? (
            <div
              style={{
                padding: "60px",
                textAlign: "center",
                color: "#64748b",
              }}
            >
              Loading KYC records...
            </div>
          ) : users.length === 0 ? (
            <div
              style={{
                padding: "65px",
                textAlign: "center",
                color: "#64748b",
              }}
            >
              <div
                style={{
                  fontSize: "40px",
                  marginBottom: "12px",
                }}
              >
                🪪
              </div>

              <strong style={{ color: "#334155" }}>
                No KYC applications found
              </strong>

              <div
                style={{
                  marginTop: "6px",
                  fontSize: "13px",
                }}
              >
                New verification requests will appear here.
              </div>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "950px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "#f8fafc",
                    }}
                  >
                    {[
                      "CUSTOMER",
                      "AADHAAR",
                      "PAN",
                      "DOCUMENTS",
                      "STATUS",
                      "ACTION",
                    ].map((heading) => (
                      <th
                        key={heading}
                        style={{
                          padding: "14px 18px",
                          textAlign: "left",
                          fontSize: "11px",
                          letterSpacing: ".5px",
                          color: "#64748b",
                          borderBottom:
                            "1px solid #e5e7eb",
                        }}
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td style={td}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "12px",
                              background: "#eef2ff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: "800",
                              color: "#4338ca",
                            }}
                          >
                            {user.name
                              ?.charAt(0)
                              ?.toUpperCase() || "U"}
                          </div>

                          <div>
                            <div
                              style={{
                                fontWeight: "750",
                                color: "#111827",
                              }}
                            >
                              {user.name}
                            </div>

                            <div
                              style={{
                                fontSize: "12px",
                                color: "#64748b",
                                marginTop: "3px",
                              }}
                            >
                              {user.username || "Customer"}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td style={td}>
                        <span style={maskedValue(user.aadhaarNumber)}>
                          {user.aadhaarNumber || "-"}
                        </span>
                      </td>

                      <td style={td}>
                        <span style={maskedValue(user.panNumber)}>
                          {user.panNumber || "-"}
                        </span>
                      </td>

                      <td style={td}>
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                          }}
                        >
                          {user.aadhaarDocument ? (
                            <a
                              href={`http://13.203.173.169:5000/uploads/${user.aadhaarDocument}`}
                              target="_blank"
                              rel="noreferrer"
                              style={documentBtn}
                            >
                              Aadhaar
                            </a>
                          ) : (
                            <span style={missingDoc}>
                              Aadhaar
                            </span>
                          )}

                          {user.panDocument ? (
                            <a
                              href={`http://13.203.173.169:5000/uploads/${user.panDocument}`}
                              target="_blank"
                              rel="noreferrer"
                              style={documentBtn}
                            >
                              PAN
                            </a>
                          ) : (
                            <span style={missingDoc}>
                              PAN
                            </span>
                          )}
                        </div>
                      </td>

                      <td style={td}>
                        <span
                          style={{
                            ...statusPill,
                            ...statusStyle(
                              user.kycStatus
                            ),
                          }}
                        >
                          {user.kycStatus || "Pending"}
                        </span>
                      </td>

                      <td style={td}>
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                          }}
                        >
                          {user.kycStatus !== "Verified" && (
                            <button
                              onClick={() =>
                                approve(user._id)
                              }
                              style={approveBtn}
                            >
                              ✓ Approve
                            </button>
                          )}

                          {user.kycStatus !== "Rejected" && (
                            <button
                              onClick={() =>
                                reject(user._id)
                              }
                              style={rejectBtn}
                            >
                              Reject
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
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
  icon,
  subtitle,
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: "17px",
        padding: "20px",
        boxShadow: "0 5px 20px rgba(15,23,42,.04)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "43px",
            height: "43px",
            borderRadius: "12px",
            background: "#eef2ff",
            color: "#4338ca",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            fontWeight: "800",
          }}
        >
          {icon}
        </div>

        <span
          style={{
            fontSize: "11px",
            color: "#94a3b8",
            fontWeight: "700",
          }}
        >
          KYC
        </span>
      </div>

      <div
        style={{
          marginTop: "18px",
          fontSize: "28px",
          fontWeight: "800",
          color: "#111827",
        }}
      >
        {value}
      </div>

      <div
        style={{
          marginTop: "4px",
          fontWeight: "700",
          color: "#334155",
        }}
      >
        {title}
      </div>

      <div
        style={{
          marginTop: "4px",
          fontSize: "12px",
          color: "#64748b",
        }}
      >
        {subtitle}
      </div>
    </div>
  );
}

const td = {
  padding: "17px 18px",
  borderBottom: "1px solid #eef2f7",
  color: "#334155",
  fontSize: "13px",
  verticalAlign: "middle",
};

const statusPill = {
  display: "inline-block",
  padding: "6px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "700",
};

const documentBtn = {
  textDecoration: "none",
  background: "#f1f5f9",
  color: "#334155",
  padding: "7px 10px",
  borderRadius: "8px",
  fontSize: "12px",
  fontWeight: "700",
};

const missingDoc = {
  background: "#f8fafc",
  color: "#94a3b8",
  padding: "7px 10px",
  borderRadius: "8px",
  fontSize: "12px",
};

const approveBtn = {
  border: "none",
  background: "#059669",
  color: "#fff",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "700",
  fontSize: "12px",
};

const rejectBtn = {
  border: "none",
  background: "#fff1f2",
  color: "#be123c",
  border: "1px solid #fecdd3",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "700",
  fontSize: "12px",
};

const maskedValue = (value) => ({
  fontFamily: "monospace",
  fontSize: "12px",
  color: value ? "#334155" : "#94a3b8",
});

export default AdminKyc;
