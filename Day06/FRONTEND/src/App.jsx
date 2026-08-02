import "./App.css";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import ProfileUser from "./Components/Profile";

function App() {
  return (
    <div className="page-shell">
      <div className="form-stack">
        <Signup />
        <Signin />
        <ProfileUser />
      </div>
    </div>
  );
}

export default App;
