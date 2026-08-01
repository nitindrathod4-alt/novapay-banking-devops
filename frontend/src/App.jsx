import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import DashboardPage from "./pages/DashboardPage";
import TransferPage from "./pages/TransferPage";
import TransactionsPage from "./pages/TransactionsPage";
import ProfilePage from "./pages/ProfilePage";

import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/transfer" element={<TransferPage />} />
      <Route path="/transactions" element={<TransactionsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
