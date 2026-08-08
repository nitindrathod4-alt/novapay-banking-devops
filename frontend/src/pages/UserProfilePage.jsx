import BackButton from "../components/BackButton";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function UserProfilePage() {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const res = await api.get(`/users/${id}`);
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f7f7f8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#6b7280",
          fontSize: "16px",
        }}
      >
        Loading customer profile...
      </div>
    );
  }

  const avatar =
    user.photo
      ? `http://13.203.173.169:5000${user.photo}`
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.name || "Customer"
        )}&background=a30d2d&color=fff&size=160`;

  const statusActive = user.status === "Active";

  const kycVerified = user.kycStatus === "Verified";

  const cardStyle = {
    background: "#ffffff",
    border: "1px solid #eeeeee",
    borderRadius: "14px",
    padding: "24px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
  };

  const labelStyle = {
    color: "#6b7280",
    fontSize: "12px",
    fontWeight: "600",
    marginBottom: "6px",
    textTransform: "uppercase",
    letterSpacing: "0.4px",
  };

  const valueStyle = {
    color: "#171717",
    fontSize: "15px",
    fontWeight: "700",
  };

  const badge = (background, color) => ({
    display: "inline-flex",
    alignItems: "center",
    padding: "7px 13px",
    borderRadius: "20px",
    background,
    color,
    fontSize: "12px",
    fontWeight: "800",
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f7f8",
        padding: "30px 35px 50px",
      }}
    >
      {/* TOP */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            marginBottom: "18px",
          }}
        >
          <BackButton />
        </div>

        {/* HEADER */}
        <div
          style={{
            background:
              "linear-gradient(135deg, #8f0b2c 0%, #a30d2d 55%, #bd2447 100%)",
            borderRadius: "18px",
            padding: "28px 30px",
            color: "#ffffff",
            boxShadow: "0 10px 25px rgba(163,13,45,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "25px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <img
              src={avatar}
              onError={(e) => {
                e.target.src =
                  "https://ui-avatars.com/api/?name=Customer&background=a30d2d&color=fff&size=160";
              }}
              alt="Customer"
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid rgba(255,255,255,0.8)",
              }}
            />

            <div>
              <div
                style={{
                  fontSize: "12px",
                  opacity: 0.85,
                  fontWeight: "700",
                  marginBottom: "5px",
                  letterSpacing: "0.5px",
                }}
              >
                CUSTOMER PROFILE
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: "28px",
                  fontWeight: "800",
                }}
              >
                {user.name}
              </h1>

              <div
                style={{
                  marginTop: "7px",
                  fontSize: "14px",
                  opacity: 0.9,
                }}
              >
                @{user.username}
              </div>
            </div>
          </div>

          <div>
            <span
              style={
                statusActive
                  ? badge("#dcfce7", "#15803d")
                  : badge("#fee2e2", "#b91c1c")
              }
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: statusActive ? "#16a34a" : "#dc2626",
                  marginRight: "7px",
                }}
              />
              {user.status}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "20px",
            marginTop: "22px",
          }}
        >
          {/* ACCOUNT DETAILS */}
          <div style={cardStyle}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "22px",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: "#fce7ec",
                  color: "#a30d2d",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                }}
              >
                🏦
              </div>

              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "17px",
                    color: "#171717",
                  }}
                >
                  Account Details
                </h2>

                <div
                  style={{
                    color: "#9ca3af",
                    fontSize: "12px",
                    marginTop: "3px",
                  }}
                >
                  Customer banking information
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <div>
                <div style={labelStyle}>Account Number</div>
                <div style={valueStyle}>
                  {user.accountNumber || "Not Available"}
                </div>
              </div>

              <div>
                <div style={labelStyle}>IFSC Code</div>
                <div style={valueStyle}>
                  {user.ifsc || "Not Available"}
                </div>
              </div>

              <div>
                <div style={labelStyle}>Branch</div>
                <div style={valueStyle}>
                  {user.branchName || "Not Available"}
                </div>
              </div>

              <div>
                <div style={labelStyle}>Account Type</div>
                <div style={valueStyle}>
                  {user.accountType || "Savings"}
                </div>
              </div>
            </div>
          </div>

          {/* FINANCIAL */}
          <div style={cardStyle}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "22px",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: "#ecfdf5",
                  color: "#047857",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                }}
              >
                ₹
              </div>

              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "17px",
                    color: "#171717",
                  }}
                >
                  Financial Details
                </h2>

                <div
                  style={{
                    color: "#9ca3af",
                    fontSize: "12px",
                    marginTop: "3px",
                  }}
                >
                  Current account balance
                </div>
              </div>
            </div>

            <div
              style={{
                background: "#f8fafc",
                borderRadius: "12px",
                padding: "20px",
                border: "1px solid #f1f5f9",
              }}
            >
              <div style={labelStyle}>Available Balance</div>

              <div
                style={{
                  fontSize: "30px",
                  fontWeight: "900",
                  color: "#171717",
                  marginTop: "5px",
                }}
              >
                ₹
                {Number(user.balance || 0).toLocaleString("en-IN")}
              </div>
            </div>
          </div>

          {/* PERSONAL DETAILS */}
          <div style={cardStyle}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "22px",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: "#f3f4f6",
                  color: "#374151",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                }}
              >
                👤
              </div>

              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "17px",
                    color: "#171717",
                  }}
                >
                  Personal Details
                </h2>

                <div
                  style={{
                    color: "#9ca3af",
                    fontSize: "12px",
                    marginTop: "3px",
                  }}
                >
                  Customer information
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <div>
                <div style={labelStyle}>Full Name</div>
                <div style={valueStyle}>
                  {user.name || "Not Available"}
                </div>
              </div>

              <div>
                <div style={labelStyle}>Username</div>
                <div style={valueStyle}>
                  @{user.username || "Not Available"}
                </div>
              </div>

              <div>
                <div style={labelStyle}>Role</div>
                <div style={valueStyle}>
                  {user.role === "admin" ? "ADMIN" : "CUSTOMER"}
                </div>
              </div>

              <div>
                <div style={labelStyle}>User Status</div>

                <span
                  style={
                    statusActive
                      ? badge("#dcfce7", "#15803d")
                      : badge("#fee2e2", "#b91c1c")
                  }
                >
                  {user.status}
                </span>
              </div>
            </div>
          </div>

          {/* KYC */}
          <div style={cardStyle}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "22px",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: "#fff7ed",
                  color: "#c2410c",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                }}
              >
                🪪
              </div>

              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "17px",
                    color: "#171717",
                  }}
                >
                  KYC Verification
                </h2>

                <div
                  style={{
                    color: "#9ca3af",
                    fontSize: "12px",
                    marginTop: "3px",
                  }}
                >
                  Identity verification details
                </div>
              </div>
            </div>

            <div
              style={{
                marginBottom: "20px",
              }}
            >
              <div style={labelStyle}>Verification Status</div>

              <span
                style={
                  kycVerified
                    ? badge("#dcfce7", "#15803d")
                    : user.kycStatus === "Rejected"
                    ? badge("#fee2e2", "#b91c1c")
                    : badge("#fef3c7", "#92400e")
                }
              >
                {kycVerified
                  ? "✓ Verified"
                  : user.kycStatus === "Rejected"
                  ? "✕ Rejected"
                  : "• Pending"}
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <div>
                <div style={labelStyle}>Aadhaar Number</div>
                <div style={valueStyle}>
                  {user.aadhaarNumber || "Not Added"}
                </div>
              </div>

              <div>
                <div style={labelStyle}>PAN Number</div>
                <div style={valueStyle}>
                  {user.panNumber || "Not Added"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div
          style={{
            textAlign: "center",
            color: "#9ca3af",
            fontSize: "12px",
            marginTop: "28px",
          }}
        >
          NovaPay • Customer Profile
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
