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
    <div className="auth-page">
      <div className="auth-card">
        <h1>SIGN IN</h1>
        <div className="auth-form">
          <input
            className="auth-input"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            placeholder="Enter email"
            value={email}
          />
          <input
            className="auth-input"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Enter password"
            value={password}
          />
          <button className="auth-btn" onClick={signin}>Sign In</button>
        </div>

        <div className="auth-footer">
          <span>Need an account?</span>
          <button className="link-btn" type="button" onClick={() => navigate("/signup")}>Create one</button>
        </div>
      </div>
    </div>
  );
};
export default Signin;
