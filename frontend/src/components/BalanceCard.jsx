function BalanceCard() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #2563eb, #1e40af)",
        color: "white",
        borderRadius: "15px",
        padding: "25px",
        marginBottom: "25px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
      }}
    >
      <h3>Available Balance</h3>

      <h1 style={{ margin: "15px 0" }}>
        ₹ 1,25,000.00
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "25px"
        }}
      >
        <div>
          <small>Card Holder</small>
          <h3>Nitin Rathod</h3>
        </div>

        <div>
          <small>Valid Thru</small>
          <h3>12/30</h3>
        </div>
      </div>

      <h2 style={{ marginTop: "20px", letterSpacing: "3px" }}>
        **** **** **** 2456
      </h2>
    </div>
  );
}

export default BalanceCard;
