import { useState } from "react";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleUserRegister(e) {
    e.preventDefault();
    console.log("Submitting login from:", email, password);

    try {
      const response = await axios.post("http://localhost:8080/signin", {
        email,
        password,
      });
      console.log("Success", response.data);
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
