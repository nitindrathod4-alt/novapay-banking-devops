import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function AddUserPage() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    mobileNumber: "",
    balance: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createUser = async (e) => {
    e.preventDefault();

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
        balance: "",
      });

    } catch (err) {
      alert(err.response?.data?.message || "Failed to Create User");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "40px",
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#2563eb",
          fontWeight: "bold",
        }}
      >
        ⬅ Back
      </Link>

      <h1 style={{ marginTop: "20px" }}>
        ➕ Create New User
      </h1>

      <form
        onSubmit={createUser}
        style={{
          maxWidth: "500px",
          background: "#fff",
          padding: "30px",
          marginTop: "30px",
          borderRadius: "15px",
          boxShadow: "0 5px 15px rgba(0,0,0,.1)",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <input
          type="text"
          name="mobileNumber"
          placeholder="Mobile Number"
          value={form.mobileNumber}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <input
          type="number"
          name="balance"
          placeholder="Opening Balance"
          value={form.balance}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            background: "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          ➕ Create User
        </button>
      </form>
    </div>
  );
}

export default AddUserPage;
