import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import RoleBasedComponent from "./RoleBasedComponents";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

export default function Header() {
  const { isAuthenticated, user } = useAuth0();

  return (
    <nav style={{ backgroundColor: "#333", padding: "10px", color: "white" }}>
      <Link to="/" style={{ marginRight: "10px", color: "white" }}>
        Home
      </Link>

      <RoleBasedComponent allowedRoles={["admin"]}>
        <Link to="/admin" style={{ marginRight: "10px", color: "white" }}>
          Admin
        </Link>
      </RoleBasedComponent>

      <RoleBasedComponent allowedRoles={["user"]}>
        <Link to="/client" style={{ marginRight: "10px", color: "white" }}>
          Cliente
        </Link>
      </RoleBasedComponent>

      <div style={{ float: "right" }}>
        {isAuthenticated ? (
          <>
            <span style={{ marginRight: "10px" }}>Usuario: {user?.name}</span>
            <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}
      </div>
    </nav>
  );
}
