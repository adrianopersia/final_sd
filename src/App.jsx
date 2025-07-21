import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminPage from "./pages/AdminPage";
import ClientPage from "./pages/ClientPage";
import Header from "./components/Header";
import RoleBasedComponent from "./components/RoleBasedComponents";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            <RoleBasedComponent allowedRoles={["admin"]}>
              <AdminPage />
            </RoleBasedComponent>
          }
        />
        <Route
          path="/client"
          element={
            <RoleBasedComponent allowedRoles={["user"]}>
              <ClientPage />
            </RoleBasedComponent>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
