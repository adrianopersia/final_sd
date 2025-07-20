import { useAuth0 } from "@auth0/auth0-react";
import { useUserRoles } from "../hooks/useUserRoles";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { roles, isAdmin } = useUserRoles();

  if (isLoading) return <div>Cargando...</div>;

  return (
    isAuthenticated && (
      <div
        style={{ padding: "10px", border: "1px solid #ccc", margin: "10px" }}
      >
        <h3>Perfil de Usuario</h3>
        <p>
          <strong>Nombre:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Roles:</strong>{" "}
          {roles.length > 0 ? roles.join(", ") : "Sin roles asignados"}
        </p>
        {isAdmin && <p style={{ color: "red" }}>🔑 Acceso de Administrador</p>}
      </div>
    )
  );
}
