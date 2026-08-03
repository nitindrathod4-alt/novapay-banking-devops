import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./components/Login";

import DashboardPage from "./pages/DashboardPage";
import TransferPage from "./pages/TransferPage";
import TransactionsPage from "./pages/TransactionsPage";
import ProfilePage from "./pages/ProfilePage";

import AdminDashboard from "./pages/AdminDashboard";
import UsersPage from "./pages/UsersPage";
import AddUserPage from "./pages/AddUserPage";
import EditUserPage from "./pages/EditUserPage";
import TransactionsAdminPage from "./pages/TransactionsAdminPage";
import DepositPage from "./pages/DepositPage";
import WithdrawPage from "./pages/WithdrawPage";
import AnalyticsPage from "./pages/AnalyticsPage";

import "./App.css";

function AppContent() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  if (user?.role === "admin") {
    return (
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/add-user" element={<AddUserPage />} />

        <Route
          path="/admin/edit-user/:id"
          element={<EditUserPage />}
        />
        <Route path="/admin/deposit" element={<DepositPage />} />
        <Route path="/admin/withdraw" element={<WithdrawPage />} />
        <Route path="/admin/transactions" element={<TransactionsAdminPage />} />
        <Route path="/admin/analytics" element={<AnalyticsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/transfer" element={<TransferPage />} />
      <Route path="/transactions" element={<TransactionsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
