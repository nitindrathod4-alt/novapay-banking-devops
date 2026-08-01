import Sidebar from "../components/Sidebar";

function TransactionsPage() {
  const transactions = [
    { id: 1, name: "Amazon", amount: "-₹2,450", status: "Success" },
    { id: 2, name: "Salary", amount: "+₹45,000", status: "Success" },
    { id: 3, name: "Electricity Bill", amount: "-₹1,200", status: "Success" },
    { id: 4, name: "Netflix", amount: "-₹649", status: "Success" },
  ];

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "30px" }}>
        <h1>📜 Transaction History</h1>

        <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.name}</td>
                <td>{t.amount}</td>
                <td>{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionsPage;
