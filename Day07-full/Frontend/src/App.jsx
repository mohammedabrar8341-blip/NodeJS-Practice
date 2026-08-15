import Body from "./Components/Body";
import "./App.css";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/body" element={<Body />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
