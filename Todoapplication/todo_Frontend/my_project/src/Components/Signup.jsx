import { useState } from "react";
import axios from "axios";

const Signup = ({ onSignupSuccess }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleUserRegister(e) {
    e.preventDefault();

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (!trimmedEmail || !trimmedUsername || !trimmedPassword) {
      alert("Please fill in all fields before registering.");
      return;
    }
    try {
      await axios.post("http://localhost:8080/signup", {
        username: trimmedUsername,
        password: trimmedPassword,
        email: trimmedEmail,
      });
      alert("Registration successful");
      onSignupSuccess?.();
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("Error", error.response?.data || error.message);
      alert("Registration failed");
    }
  }

  return (
    <div className="auth-container">
      <h1 className="auth-title">SIGNUP</h1>

      <form className="auth-form" onSubmit={handleUserRegister}>
        <input
          className="auth-input"
          type="text"
          placeholder="Enter your Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="auth-input"
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="auth-input"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="auth-btn" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Signup;
