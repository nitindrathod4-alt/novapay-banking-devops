import Sidebar from "../components/Sidebar";

function TransferPage() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "30px" }}>
        <h1>💸 Transfer Money</h1>

        <input
          type="text"
          placeholder="Recipient Account Number"
          style={{ width: "100%", padding: "12px", marginBottom: "15px" }}
        />

        <input
          type="number"
          placeholder="Amount"
          style={{ width: "100%", padding: "12px", marginBottom: "15px" }}
        />

        <button>Transfer Now</button>
      </div>
    </div>
  );
}

export default TransferPage;
