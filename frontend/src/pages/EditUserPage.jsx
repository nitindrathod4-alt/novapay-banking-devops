import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    balance: "",
    status: "Active",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const res = await api.get("/users");

      const user = res.data.users.find((u) => u._id === id);

      if (!user) {
        alert("User not found");
        navigate("/admin/users");
        return;
      }

      setForm({
        name: user.name,
        username: user.username,
        balance: user.balance,
        status: user.status || "Active",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveUser = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/users/users/${id}`, {
        ...form,
        balance: Number(form.balance),
      });

      alert("✅ User Updated Successfully");
      navigate("/admin/users");
    } catch (err) {
      alert(err.response?.data?.message || "Update Failed");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "13px 15px",
    border: "1px solid #d9d9d9",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#171717",
    background: "#fff",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontSize: "12px",
    fontWeight: "800",
    color: "#555",
    textTransform: "uppercase",
    letterSpacing: "0.4px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f7f8",
        padding: "32px 40px",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto 25px",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            color: "#777",
            marginBottom: "8px",
            fontWeight: "600",
          }}
        >
          ADMIN / USER MANAGEMENT / EDIT USER
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            color: "#171717",
            fontWeight: "800",
          }}
        >
          Edit User
        </h1>

        <p
          style={{
            marginTop: "7px",
            color: "#777",
            fontSize: "14px",
          }}
        >
          Update customer account information
        </p>
      </div>

      {/* Main Card */}
      <form
        onSubmit={saveUser}
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "14px",
          border: "1px solid #eeeeee",
          boxShadow: "0 5px 18px rgba(0,0,0,.06)",
          overflow: "hidden",
        }}
      >
        {/* Card Header */}
        <div
          style={{
            padding: "22px 28px",
            borderBottom: "1px solid #eeeeee",
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              background: "#fce7ec",
              color: "#a30d2d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
            }}
          >
            ✏️
          </div>

          <div>
            <div
              style={{
                fontSize: "17px",
                fontWeight: "800",
                color: "#171717",
              }}
            >
              Customer Details
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "#777",
                marginTop: "3px",
              }}
            >
              Manage basic account information
            </div>
          </div>
        </div>

        {/* Form */}
        <div
          style={{
            padding: "30px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}
        >
          {/* Name */}
          <div>
            <label style={labelStyle}>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={form.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* Username */}
          <div>
            <label style={labelStyle}>Username</label>

            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={form.username}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* Balance */}
          <div>
            <label style={labelStyle}>Account Balance</label>

            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "15px",
                  top: "13px",
                  fontWeight: "800",
                  color: "#555",
                }}
              >
                ₹
              </span>

              <input
                type="number"
                name="balance"
                placeholder="0"
                value={form.balance}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  paddingLeft: "32px",
                }}
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label style={labelStyle}>Account Status</label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              style={{
                ...inputStyle,
                cursor: "pointer",
              }}
            >
              <option value="Active">Active</option>
              <option value="Frozen">Frozen</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "20px 30px",
            background: "#fafafa",
            borderTop: "1px solid #eeeeee",
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
          }}
        >
          <button
            type="button"
            onClick={() => navigate("/admin/users")}
            style={{
              padding: "11px 22px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              background: "#ffffff",
              color: "#444",
              fontWeight: "800",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            style={{
              padding: "11px 24px",
              borderRadius: "8px",
              border: "none",
              background: "#a30d2d",
              color: "#ffffff",
              fontWeight: "800",
              cursor: "pointer",
              fontSize: "13px",
              boxShadow: "0 4px 10px rgba(163,13,45,.2)",
            }}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUserPage;
