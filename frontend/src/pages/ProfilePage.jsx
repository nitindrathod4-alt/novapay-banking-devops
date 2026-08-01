import Sidebar from "../components/Sidebar";

function ProfilePage() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "30px" }}>
        <h1>👤 My Profile</h1>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "500px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
          }}
        >
          <p><strong>Name:</strong> Nitin Rathod</p>
          <p><strong>Bank:</strong> NovaPay Bank</p>
          <p><strong>Account:</strong> XXXX XXXX 2456</p>
          <p><strong>Email:</strong> nitin@example.com</p>
          <p><strong>Phone:</strong> +91 9876543210</p>

          <button>Edit Profile</button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
