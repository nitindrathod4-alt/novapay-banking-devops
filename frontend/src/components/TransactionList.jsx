function TransactionList() {
  const transactions = [
    { name: "Amazon", amount: "-₹2,450" },
    { name: "Salary", amount: "+₹45,000" },
    { name: "Electricity Bill", amount: "-₹1,200" },
    { name: "Netflix", amount: "-₹649" },
  ];

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Recent Transactions</h2>

      {transactions.map((t, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "12px 0",
            borderBottom: "1px solid #eee"
          }}
        >
          <span>{t.name}</span>
          <strong>{t.amount}</strong>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;
