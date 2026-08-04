import { useState } from "react";
import axios from "axios";

const Signup = ({ onSignupSuccess }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleUserRegister(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/signup", {
        username,
        password,
        email,
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
    <div>
      <h1>SIGNUP FORM</h1>

      <input
        type="text"
        placeholder="Enter your Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Enter your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleUserRegister}>Sign up</button>
    </div>
  );
};

export default Signup;
