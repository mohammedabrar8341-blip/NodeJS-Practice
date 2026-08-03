import { useState } from "react";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleUserLogin(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/signin", {
        email,
        password,
      });
      console.log("Success", response.data);
      alert("Login successful");
    } catch (error) {
      console.log("Error", error.response?.data || error.message);
      alert("Enter correct email and password");
    }
  }

  return (
    <div>
      <h1>SIGN IN</h1>
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
      <button onClick={handleUserLogin}>Login</button>
    </div>
  );
};

export default Signin;
