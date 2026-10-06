import { useState } from "react";

function Login({ onLogin }) {
  const [membershipId, setMembershipId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (
      membershipId === "ADMIN001" &&
      password === "admin123"
    ) {
      setError("");
      onLogin();
    } else {
      setError(
        "Invalid membership ID or password."
      );
    }
  }

  return (
    <div className="login-page">
      <form
        className="login-box"
        onSubmit={handleSubmit}
      >
        <h1>Library Login</h1>

        <p>
          Community Library Management System
        </p>

        <label>Membership ID</label>

        <input
          type="text"
          placeholder="Enter membership ID"
          value={membershipId}
          onChange={(e) =>
            setMembershipId(e.target.value)
          }
          required
        />

        <label>Password</label>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="primary-button"
        >
          Login
        </button>

        <p className="login-help">
          Demo Login:
          <br />
          ID: ADMIN001
          <br />
          Password: admin123
        </p>
      </form>
    </div>
  );
}

export default Login;