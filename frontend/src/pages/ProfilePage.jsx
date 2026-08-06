import BackButton from "../components/BackButton";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function ProfilePage() {
  const [user, setUser] = useState({});
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await api.get("/transactions/balance");
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadPhoto = async () => {
    if (!photo) {
      return alert("Please choose a photo");
    }

    const formData = new FormData();
    formData.append("photo", photo);

    try {
      await api.post(`/users/${user._id}/photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Profile Photo Updated");
      loadProfile();
    } catch (err) {
      alert(err.response?.data?.message || "Upload Failed");
    }
  };

  const downloadStatement = async () => {
    try {
      const res = await api.get("/statement/download", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");

      link.href = url;
      link.download = "NovaPay_Bank_Statement.pdf";

      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (err) {
      alert("Statement Download Failed");
    }
  };

  return (
    <div style={{ display: "flex", background: "#f3f4f6", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "40px" }}>

        <BackButton />

<h1>👤 My Profile</h1>

        <div
          style={{
            maxWidth: "760px",
            background: "#fff",
            padding: "35px",
            borderRadius: "18px",
            boxShadow: "0 10px 25px rgba(0,0,0,.12)",
          }}
        >

          <div style={{ textAlign: "center" }}>

            <img
              src={
                user.photo
                  ? `http://13.203.173.169:5000${user.photo}?t=${Date.now()}`
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.name || "User"
                    )}&background=2563eb&color=fff&size=200`
              }
              alt="Profile"
              style={{
                width: "170px",
                height: "170px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "5px solid #059669",
              }}
            />

            <br /><br />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />

            <br /><br />

            <button onClick={uploadPhoto}>
              📷 Upload Photo
            </button>


        
          </div>

          <hr style={{ margin: "30px 0" }} />

          <p><strong>👤 Name:</strong> {user.name}</p>
          <p><strong>🆔 Username:</strong> {user.username}</p>
          <p><strong>💰 Balance:</strong> ₹ {user.balance}</p>
          <p><strong>💳 Account Number:</strong> {user.accountNumber}</p>
          <p><strong>🏦 IFSC:</strong> {user.ifsc}</p>

          <p><strong>💳 Account Type:</strong> {user.accountType || "-"}</p>

          <p><strong>🏢 Branch:</strong> {user.branchName || "-"}</p>

          <p><strong>🔐 KYC Status:</strong> {user.kycStatus || "Pending"}</p>

          <p>
          <strong>📅 Account Open Date:</strong>
          {user.accountOpenDate
          ? new Date(user.accountOpenDate).toLocaleDateString()
          : "-"}
          </p>

          <p><strong>🟢 Status:</strong> {user.status}</p>

          <br />

          
<br />

<a
href="/change-password"
style={{
display:"inline-block",
marginTop:"15px",
background:"#2563eb",
color:"white",
padding:"12px 25px",
borderRadius:"8px",
textDecoration:"none"
}}
>
🔐 Change Password
</a>


<button
            onClick={downloadStatement}
            style={{
              background: "green",
              color: "white",
              border: "none",
              padding: "12px 25px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            📄 Download Bank Statement
          </button>


        
        </div>


        
      </div>

        
    </div>
  );
}


<div style={{
marginTop:"20px",
textAlign:"center",
fontSize:"13px",
color:"#6b7280",
borderTop:"1px solid #e5e7eb",
paddingTop:"12px"
}}>
<p style={{margin:0}}>
Developed by <strong>Nitin Rathod</strong>
</p>

<p style={{margin:"4px 0 0"}}>
DevOps • Cloud Engineer
</p>
</div>

export default ProfilePage;
