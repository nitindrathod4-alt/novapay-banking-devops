import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await api.get("/");
      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  const deposit = async (id, username) => {
    const amount = prompt(`Deposit Amount for ${username}`);
    if (!amount) return;

    await api.post(`/${id}/deposit`, {
      amount: Number(amount),
    });

    loadUsers();
  };

  const withdraw = async (id, username) => {
    const amount = prompt(`Withdraw Amount from ${username}`);
    if (!amount) return;

    await api.post(`/${id}/withdraw`, {
      amount: Number(amount),
    });

    loadUsers();
  };

  const deleteUser = async (id, username) => {
    if (!window.confirm(`Delete ${username}?`)) return;

    await api.delete(`/${id}`);

    loadUsers();
  };

  const toggleStatus = async (id) => {
    try {
      await api.patch(`/users/${id}/status`);
      loadUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Operation Failed");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "30px" }}>
      <h1>👥 Users Management</h1>

      <input
        type="text"
        placeholder="🔍 Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
        }}
      />

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Status</th>
            <th>Balance</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.username}</td>
              <td>{u.status}</td>
              <td>₹ {u.balance}</td>

              <td>
                {u.role !== "admin" && (
                  <>
                    <button onClick={() => deposit(u._id, u.username)}>
                      💰 Deposit
                    </button>{" "}

                    <button onClick={() => withdraw(u._id, u.username)}>
                      🏧 Withdraw
                    </button>{" "}

                    <Link to={`/admin/edit-user/${u._id}`}>
                      <button>✏️ Edit</button>
                    </Link>{" "}

                    <button
                      onClick={() => toggleStatus(u._id)}
                    >
                      {u.status === "Active"
                        ? "🚫 Block"
                        : "🟢 Unblock"}
                    </button>{" "}

                    <button
                      onClick={() =>
                        deleteUser(u._id, u.username)
                      }
                    >
                      ❌ Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersPage;
