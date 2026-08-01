import Navbar from "./Navbar";
import BalanceCard from "./BalanceCard";
import QuickActions from "./QuickActions";
import TransactionList from "./TransactionList";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "30px",
          background: "#f3f4f6",
          minHeight: "100vh",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>
          Welcome Back, Nitin 👋
        </h1>

        <BalanceCard />
        <QuickActions />
        <TransactionList />
      </div>
    </>
  );
}

export default Dashboard;
