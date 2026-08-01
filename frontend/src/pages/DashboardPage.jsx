import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";

function DashboardPage() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Dashboard />
      </div>
    </div>
  );
}

export default DashboardPage;
