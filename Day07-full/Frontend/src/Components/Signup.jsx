import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateSignup = () => {
    if (username.trim().length < 3 || username.trim().length > 15) {
      return "Username must be between 3 and 15 characters.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Email is invalid.";
    }

    if (password.length < 8 || password.length > 12) {
      return "Password must be between 8 and 12 characters.";
    }

    return "";
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const validationError = validateSignup();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/signup", {
        username: username.trim(),
        email: email.trim(),
        password,
      });

      setError("");
      alert(response?.data?.msg || "Signup successful!");
      navigate("/signin");
    } catch (error) {
      console.error("Error signing up:", error);
      const msg = error?.response?.data?.msg || "Signup failed. Please try again.";
      setError(msg);
      alert(msg);
    }
  }

  return (
    <div>
      <h1>SIGNUP FORM</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account? <button type="button" onClick={() => navigate("/signin")}>Sign In</button>
      </p>
    </div>
  );
};

export default Signup;
