import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/signin", {
        email,
        password,
      });

      const token = response?.data?.token;
      if (token) {
        localStorage.setItem("token", token);
      }

      alert("Signin successfully");
      navigate("/body");
    } catch (err) {
      console.log(err);
      alert("No valid user found");
    }
  };

  return (
    <div>
      <h1>SIGNIN PAGE</h1>
      <div>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          placeholder="Enter email"
          value={email}
        />
        <br />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Enter password"
          value={password}
        />
        <br />
        <button onClick={signin}>SignIn</button>
      </div>
    </div>
  );
};
export default Signin;
