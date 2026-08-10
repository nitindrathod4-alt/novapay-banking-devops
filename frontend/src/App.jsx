import AdminProfilePage from "./pages/AdminProfilePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./components/Login";

import DashboardPage from "./pages/DashboardPage";
import TransferPage from "./pages/TransferPage";
import TransactionsPage from "./pages/TransactionsPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import MobileRechargePage from "./pages/MobileRechargePage";
import BillPaymentPage from "./pages/BillPaymentPage";
import KycPage from "./pages/KycPage";

import AdminDashboard from "./pages/AdminDashboard";
import UsersPage from "./pages/UsersPage";
import AddUserPage from "./pages/AddUserPage";
import EditUserPage from "./pages/EditUserPage";
import TransactionsAdminPage from "./pages/TransactionsAdminPage";
import DepositPage from "./pages/DepositPage";
import AdminDepositPage from "./pages/AdminDepositPage";
import WithdrawPage from "./pages/WithdrawPage";
import AdminWithdrawPage from "./pages/AdminWithdrawPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import UserProfilePage from "./pages/UserProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AdminKyc from "./pages/AdminKyc";
import TicketPage from "./pages/TicketPage";
import TravelBookingPage from "./pages/TravelBookingPage";
import AdminTicketsPage from "./pages/AdminTicketsPage";

import "./App.css";

function AppContent() {
  const user = JSON.parse(localStorage.getItem("user") === "undefined" ? "{}" : (localStorage.getItem("user") || "{}"));

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

        <Route
          path="/admin/deposit"
          element={<AdminDepositPage />}
        />

        <Route
          path="/admin/withdraw"
          element={<AdminWithdrawPage />}
        />

        <Route
          path="/admin/transactions"
          element={<TransactionsAdminPage />}
        />

        <Route
          path="/admin/analytics"
          element={<AnalyticsPage />}
        />

        <Route
          path="/admin/profile"
          element={<AdminProfilePage />}
        />

        <Route
          path="/admin/user/:id"
          element={<UserProfilePage />}
        />

        <Route
          path="/admin/reset-password/:id"
          element={<ResetPasswordPage />}
        />

        <Route
          path="/admin/kyc"
          element={<AdminKyc />}
        />

        {/* ADMIN SUPPORT TICKETS */}
        <Route
          path="/admin-tickets"
          element={<AdminTicketsPage />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />

      <Route path="/transfer" element={<TransferPage />} />

      <Route path="/deposit" element={<DepositPage />} />

      <Route path="/withdraw" element={<WithdrawPage />} />

      <Route path="/transactions" element={<TransactionsPage />} />

      <Route path="/profile" element={<ProfilePage />} />

      <Route path="/settings" element={<SettingsPage />} />

      <Route
        path="/change-password"
        element={<ChangePasswordPage />}
      />

      <Route
        path="/mobile-recharge"
        element={<MobileRechargePage />}
      />

      <Route
        path="/bill-payment"
        element={<BillPaymentPage />}
      />

      <Route path="/kyc" element={<KycPage />} />

      <Route path="/tickets" element={<TicketPage />} />

      <Route
        path="/travel"
        element={<TravelBookingPage />}
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
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
