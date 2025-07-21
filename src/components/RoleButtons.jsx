import { useAuth0 } from "@auth0/auth0-react";
import { hasRole } from "../helpers/roleUtils.js";
import { useNavigate } from "react-router-dom";

export default function RoleButtons() {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      {hasRole(user, "ADMIN") && (
        <>
          <button onClick={() => navigate("/admin/dashboard")}>
            Panel Admin
          </button>
          <button onClick={() => navigate("/admin/users")}>Ver Usuarios</button>
        </>
      )}

      {(hasRole(user, "USER") || hasRole(user, "ADMIN")) && (
        <>
          <button onClick={() => navigate("/user/profile")}>Ver Perfil</button>
          <button onClick={() => navigate("/user/documents")}>
            Ver Documentos
          </button>
        </>
      )}
    </div>
  );
}
