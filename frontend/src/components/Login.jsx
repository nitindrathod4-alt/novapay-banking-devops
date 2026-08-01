function Login({ onLogin }) {
  return (
    <div className="login-page">
      <div className="login-card">
        <h1>🏦 NovaPay Banking</h1>

        <input
          type="text"
          placeholder="Username"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button onClick={onLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
