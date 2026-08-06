import BackButton from "../components/BackButton";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function KycPage() {
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");

  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [panFile, setPanFile] = useState(null);

  const [status, setStatus] = useState("Pending");
  const [message, setMessage] = useState("");

  const submitKyc = async () => {
    try {
      setMessage("Submitting KYC...");

      // Step 1: Submit Aadhaar + PAN numbers
      await api.post("/profile/kyc", {
        aadhaarNumber,
        panNumber,
      });

      // Step 2: Upload documents
      const formData = new FormData();

      formData.append("aadhaarDocument", aadhaarFile);
      formData.append("panDocument", panFile);

      await api.post("/profile/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setStatus("Pending");
      setMessage("KYC submitted successfully ✅");

    } catch (error) {
      console.log(error);
      setMessage(
        error.response?.data?.message || "KYC submission failed"
      );
    }
  };


  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--page-bg)" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "40px" }}>
        <BackButton />

<h1>🪪 KYC Verification</h1>

        <div
          style={{
            background: "var(--card-bg)",
            padding: "30px",
            borderRadius: "15px",
            maxWidth: "700px",
          }}
        >

          <h2>Complete Your KYC</h2>

          <input
            type="text"
            placeholder="Aadhaar Number"
            value={aadhaarNumber}
            onChange={(e) => setAadhaarNumber(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px"
            }}
          />

          <input
            type="text"
            placeholder="PAN Number"
            value={panNumber}
            onChange={(e) => setPanNumber(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px"
            }}
          />

          <label>Aadhaar Document</label>
          <input
            type="file"
            onChange={(e) => setAadhaarFile(e.target.files[0])}
          />

          <br /><br />

          <label>PAN Document</label>
          <input
            type="file"
            onChange={(e) => setPanFile(e.target.files[0])}
          />

          <br /><br />

          <button
            onClick={submitKyc}
            style={{
              background:"#2563eb",
              color:"#fff",
              border:"none",
              padding:"12px 24px",
              borderRadius:"8px",
              cursor:"pointer"
            }}
          >
            Submit KYC
          </button>


          <h3 style={{marginTop:"20px"}}>
            Status : 🟡 {status}
          </h3>

          <p>{message}</p>

        </div>
      </div>
    </div>
  );
}

export default KycPage;
