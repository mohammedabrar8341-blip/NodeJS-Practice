import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleUserRegister(e) {
    e.preventDefault();
    console.log("submitting", username, password, email);

    try {
      //POST request
      const response = await axios.post("http://localhost:8080/signup", {
        username,
        password,
        email,
      });
      console.log("Success", response.data);
      alert("Registration successfull");
    } catch (error) {
      console.log("Error", error.response.data || error.message);
      alert("Registration Fail");
    }
  }
  return (
    <div>
      <h1>SIGNUP</h1>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <br></br>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br></br>
      <input
        type="password"
        placeholder="Password"
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
        Sign UP
      </button>
    </div>
  );
};
export default Signup;
