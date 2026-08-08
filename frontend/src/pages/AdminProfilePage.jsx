import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import api from "../services/api";

function AdminProfilePage() {
  const [user, setUser] = useState({});
  const [photo, setPhoto] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await api.get("/users");

      const admin = (res.data.users || []).find(
        (u) => u.role === "admin"
      );

      setUser(admin || {});
    } catch (err) {
      console.log("Profile Error:", err);
    }
  };

  const changePassword = async () => {
    if (!oldPassword || !newPassword) {
      alert("Please enter old and new password");
      return;
    }

    try {
      await api.put("/users/change-password", {
        oldPassword,
        newPassword,
      });

      alert("Password changed successfully");

      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Password change failed"
      );
    }
  };

  const uploadPhoto = async () => {
    if (!photo) {
      alert("Please select a photo");
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);

    try {
      await api.post(
        `/users/${user._id}/photo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Profile photo updated successfully");
      setPhoto(null);
      loadProfile();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Photo upload failed"
      );
    }
  };

  const profileImage = user.photo
    ? `http://13.203.173.169:5000${user.photo}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.name || "Administrator"
      )}&background=ffffff&color=9f1730&size=300`;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f4f6f9",
      }}
    >
      <AdminSidebar />

      <main
        style={{
          flex: 1,
          padding: "35px 45px",
          overflowX: "hidden",
        }}
      >

        {/* PAGE HEADER */}

        <div style={{ marginBottom: "25px" }}>
          <div
            style={{
              fontSize: "13px",
              fontWeight: "700",
              color: "#64748b",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            Administrator
          </div>

          <h1
            style={{
              margin: "6px 0 0",
              fontSize: "30px",
              color: "#172033",
              fontWeight: "800",
            }}
          >
            My Profile
          </h1>

          <p
            style={{
              margin: "7px 0 0",
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            Manage your administrator account and security settings.
          </p>
        </div>

        {/* PROFILE HERO */}

        <section
          style={{
            background:
              "linear-gradient(135deg,#9f1730 0%,#8f142b 55%,#7f1026 100%)",
            borderRadius: "24px",
            padding: "42px 45px",
            display: "flex",
            alignItems: "center",
            gap: "38px",
            color: "white",
            boxShadow:
              "0 15px 35px rgba(127,16,38,.20)",
            position: "relative",
            overflow: "hidden",
          }}
        >

          <div
            style={{
              position: "absolute",
              width: "260px",
              height: "260px",
              border: "1px solid rgba(255,255,255,.12)",
              borderRadius: "50%",
              right: "-70px",
              top: "-100px",
            }}
          />

          <div
            style={{
              position: "absolute",
              width: "180px",
              height: "180px",
              border: "1px solid rgba(255,255,255,.10)",
              borderRadius: "50%",
              right: "40px",
              top: "-60px",
            }}
          />

          <div style={{ position: "relative" }}>
            <img
              src={profileImage}
              alt="Administrator"
              style={{
                width: "165px",
                height: "165px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "7px solid white",
                display: "block",
                boxShadow:
                  "0 8px 25px rgba(0,0,0,.20)",
              }}
            />

            <span
              style={{
                position: "absolute",
                right: "4px",
                bottom: "7px",
                width: "21px",
                height: "21px",
                background: "#20c997",
                borderRadius: "50%",
                border: "4px solid #9f1730",
              }}
            />
          </div>

          <div style={{ position: "relative" }}>
            <h2
              style={{
                margin: 0,
                fontSize: "38px",
                fontWeight: "800",
                letterSpacing: "-.5px",
              }}
            >
              {user.name || "Administrator"}
            </h2>

            <div
              style={{
                marginTop: "7px",
                fontSize: "18px",
                opacity: ".92",
              }}
            >
              @{user.username || "admin"}
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "14px",
                background: "white",
                color: "#9f1730",
                padding: "9px 18px",
                borderRadius: "30px",
                fontWeight: "800",
                fontSize: "15px",
              }}
            >
              <span
                style={{
                  width: "11px",
                  height: "11px",
                  borderRadius: "50%",
                  background: "#20c997",
                }}
              />

              Active
            </div>
          </div>
        </section>

        {/* CONTENT GRID */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0,1.5fr) minmax(320px,1fr)",
            gap: "30px",
            marginTop: "30px",
          }}
        >

          {/* PERSONAL INFORMATION */}

          <section style={cardStyle}>
            <div style={sectionHeader}>
              <div>
                <div style={eyebrow}>
                  ACCOUNT
                </div>

                <h2 style={sectionTitle}>
                  Personal Information
                </h2>
              </div>

              <div style={iconBox}>
                👤
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2,minmax(0,1fr))",
                gap: "20px",
              }}
            >
              <InfoBox
                label="FULL NAME"
                value={user.name || "Administrator"}
              />

              <InfoBox
                label="USERNAME"
                value={user.username || "admin"}
              />

              <InfoBox
                label="ROLE"
                value="Administrator"
              />

              <InfoBox
                label="ACCOUNT STATUS"
                value="Active"
                active
              />
            </div>
          </section>

          {/* UPDATE PHOTO */}

          <section style={cardStyle}>
            <div style={sectionHeader}>
              <div>
                <div style={eyebrow}>
                  PROFILE PHOTO
                </div>

                <h2 style={sectionTitle}>
                  Update Photo
                </h2>
              </div>

              <div style={iconBox}>
                📷
              </div>
            </div>

            <div
              style={{
                border: "1px dashed #cbd5e1",
                borderRadius: "18px",
                padding: "30px 25px",
                textAlign: "center",
                background: "#f8fafc",
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  margin: "0 auto 15px",
                  borderRadius: "50%",
                  background: "#edf2f8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                }}
              >
                ↑
              </div>

              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "800",
                  color: "#153b6f",
                }}
              >
                Choose profile photo
              </div>

              <div
                style={{
                  marginTop: "6px",
                  color: "#94a3b8",
                  fontSize: "14px",
                }}
              >
                JPG, PNG or WEBP
              </div>

              <label
                style={{
                  display: "block",
                  marginTop: "22px",
                  padding: "14px",
                  background: "#9f1730",
                  color: "white",
                  borderRadius: "12px",
                  fontWeight: "800",
                  cursor: "pointer",
                }}
              >
                Select Photo

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setPhoto(e.target.files[0])
                  }
                  style={{ display: "none" }}
                />
              </label>

              {photo && (
                <div
                  style={{
                    marginTop: "12px",
                    fontSize: "13px",
                    color: "#475569",
                  }}
                >
                  {photo.name}
                </div>
              )}

              <button
                onClick={uploadPhoto}
                style={{
                  width: "100%",
                  marginTop: "12px",
                  padding: "14px",
                  background: "#9f1730",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: "800",
                  cursor: "pointer",
                }}
              >
                Upload Photo
              </button>
            </div>
          </section>
        </div>

        {/* CHANGE PASSWORD */}

        <section
          style={{
            ...cardStyle,
            marginTop: "30px",
          }}
        >
          <div style={sectionHeader}>
            <div>
              <div style={eyebrow}>
                SECURITY
              </div>

              <h2 style={sectionTitle}>
                Change Password
              </h2>
            </div>

            <div style={iconBox}>
              🔐
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(2,minmax(0,1fr))",
              gap: "20px",
            }}
          >
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) =>
                setOldPassword(e.target.value)
              }
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              style={inputStyle}
            />
          </div>

          <button
            onClick={changePassword}
            style={{
              marginTop: "20px",
              padding: "13px 28px",
              background: "#9f1730",
              color: "white",
              border: "none",
              borderRadius: "11px",
              fontWeight: "800",
              cursor: "pointer",
            }}
          >
            Change Password
          </button>
        </section>

        {/* FOOTER */}

        <div
          style={{
            textAlign: "center",
            padding: "30px 0 10px",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          <strong style={{ color: "#334155" }}>
            NovaPay
          </strong>

          <div style={{ marginTop: "5px" }}>
            DevOps • Cloud Engineer
          </div>
        </div>

      </main>
    </div>
  );
}

function InfoBox({ label, value, active }) {
  return (
    <div
      style={{
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: "16px",
        padding: "20px 22px",
      }}
    >
      <div
        style={{
          fontSize: "13px",
          color: "#94a3b8",
          fontWeight: "800",
          letterSpacing: ".6px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          marginTop: "8px",
          fontSize: "19px",
          fontWeight: "800",
          color: active ? "#059669" : "#172033",
        }}
      >
        {value}
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "22px",
  padding: "30px",
  boxShadow:
    "0 8px 25px rgba(15,23,42,.06)",
};

const sectionHeader = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  marginBottom: "25px",
};

const eyebrow = {
  fontSize: "13px",
  fontWeight: "800",
  letterSpacing: "1.2px",
  color: "#a01832",
};

const sectionTitle = {
  margin: "5px 0 0",
  color: "#153b6f",
  fontSize: "27px",
  fontWeight: "800",
};

const iconBox = {
  width: "58px",
  height: "58px",
  borderRadius: "15px",
  background: "#edf2f8",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "25px",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "15px 17px",
  borderRadius: "12px",
  border: "1px solid #dbe3ec",
  background: "#f8fafc",
  fontSize: "15px",
  outline: "none",
};

export default AdminProfilePage;
