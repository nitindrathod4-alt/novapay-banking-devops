import { useState } from "react";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <h1 style={{ textAlign: "center", marginTop: "50px" }}>
      🎉 Login Successful
    </h1>
  );
}

export default App;
