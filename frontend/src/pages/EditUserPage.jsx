import BackButton from "../components/BackButton";
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

  return (
    <div
      style={{
        padding: "40px",
        background: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      <BackButton />

<h1>✏️ Edit User</h1>

      <form
        onSubmit={saveUser}
        style={{
          background: "#fff",
          padding: "25px",
          maxWidth: "500px",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,.1)",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <input
          type="number"
          name="balance"
          placeholder="Balance"
          value={form.balance}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
        >
          <option value="Active">Active</option>
          <option value="Frozen">Frozen</option>
        </select>

        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          💾 Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditUserPage;
