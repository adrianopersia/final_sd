import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Public from "./pages/Public";
import Private from "./pages/Private";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import RoleBasedComponent from "./components/RoleBasedComponents";
import "./App.css";

function App() {
  return (
    <Router>
      <nav
        style={{
          padding: "10px",
          backgroundColor: "#f5f5f5",
          marginBottom: "20px",
        }}
      >
        <Link to="/">Home</Link> | <Link to="/public">Public</Link> |{" "}
        <Link to="/private">Private</Link> | <LoginButton /> | <LogoutButton />
        <RoleBasedComponent allowedRoles={["admin"]}>
          {" "}
          |{" "}
          <Link to="/admin" style={{ color: "red" }}>
            Admin Panel
          </Link>
        </RoleBasedComponent>
      </nav>

      <Profile />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/public" element={<Public />} />
        <Route path="/private" element={<Private />} />
      </Routes>
    </Router>
  );
}

export default App;
