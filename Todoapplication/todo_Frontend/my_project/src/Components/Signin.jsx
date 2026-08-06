import { useState } from "react";
import axios from "axios";

const Signin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleUserLogin(e) {
    e.preventDefault();

    const trimmedEmail=email.trim()
    const trimmedPassword=password.trim()

    if(!trimmedEmail||!trimmedPassword){
      alert("Please enter both email and password")
return
    }
    try {
      const response = await axios.post("http://localhost:8080/signin", {
        email:trimmedEmail,
        password:trimmedPassword,
      });

      if (!response.data.token) {
        alert(response.data.msg || "Login failed. Please try again.");
        return;
      }

      localStorage.setItem("token", response.data.token);
      onLoginSuccess?.(response.data.token);
      alert("Login successful");
      setEmail("");
      setPassword("");
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
