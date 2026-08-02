import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleUserRegister(e) {
    e.preventDefault();

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedEmail || !trimmedPassword) {
      alert("Please fill in all fields before registering.");
      return;
    }

    console.log("submitting", trimmedUsername, trimmedPassword, trimmedEmail);

    try {
      //POST request
      const response = await axios.post("http://localhost:8080/signup", {
        username: trimmedUsername,
        password: trimmedPassword,
        email: trimmedEmail,
      });
      console.log("Success", response.data);
      alert("Registration successfull");
    } catch (error) {
      console.log("Error", error.response.data || error.message);
      alert("Registration Fail");
    }
  }
  return (
    <div className="auth-block">
      <h1 className="auth-title">SIGNUP</h1>
      <input
        className="auth-input"
        type="text"
        placeholder="Username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        className="auth-input"
        type="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        className="auth-input"
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <button
        className="auth-button"
        onClick={(e) => {
          handleUserRegister(e);
        }}
      >
        Sign Up
      </button>
    </div>
  );
};
export default Signup;
