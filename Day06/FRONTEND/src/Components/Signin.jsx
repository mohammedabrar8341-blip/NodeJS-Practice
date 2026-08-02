import { useState } from "react";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleUserRegister(e) {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      alert("Please enter both email and password.");
      return;
    }

    console.log("Submitting login from:", { email: trimmedEmail, password: trimmedPassword });

    try {
      const response = await axios.post("http://localhost:8080/signin", {
        email: trimmedEmail,
        password: trimmedPassword,
      });
      console.log("Success", response.data);

      if (!response.data.token) {
        alert(response.data.msg || "Login fail!try again");
        return;
      }

      localStorage.setItem("token", response.data.token);
      alert("Login Successfully!");

      // Tip: You can save your JWT token here if your backend returns one:
      // localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.log("Error", error.response.data || error.message);
      alert("Login fail!try again ");
    }
  }

  return (
    <div>
      <h1>SIGNIN</h1>

      <input
        type="email"
        placeholder="Enter your Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br></br>
      <input
        type="password"
        placeholder="Enter your Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br></br>
      <button
        onClick={(e) => {
          handleUserRegister(e);
        }}
      >
        Sign In
      </button>
    </div>
  );
};
export default Signin;
