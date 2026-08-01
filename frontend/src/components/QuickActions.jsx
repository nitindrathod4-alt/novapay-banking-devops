function QuickActions() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "15px",
        marginBottom: "30px"
      }}
    >
      <button>💸 Transfer</button>
      <button>💰 Deposit</button>
      <button>🏧 Withdraw</button>
      <button>📜 History</button>
    </div>
  );
}

export default QuickActions;
