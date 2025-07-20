import { useAuth0 } from "@auth0/auth0-react";
import RoleBasedComponent from "../components/RoleBasedComponents";
import { useUserRoles } from "../hooks/useUserRoles";

export default function Private() {
  const { isAuthenticated, isLoading } = useAuth0();
  const { roles } = useUserRoles();

  if (isLoading) return <div>Cargando...</div>;

  if (!isAuthenticated) {
    return <div>Debes iniciar sesión para ver esta página</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Página Privada</h1>
      <p>¡Bienvenido! Has accedido a una página protegida.</p>

      <RoleBasedComponent
        allowedRoles={["admin"]}
        fallback={<p>No tienes permisos de administrador</p>}
      >
        <div
          style={{
            backgroundColor: "#f0f8ff",
            padding: "15px",
            margin: "10px 0",
          }}
        >
          <h3>🔑 Panel de Administrador</h3>
          <p>Solo los administradores pueden ver este contenido</p>
          <button>Gestionar Usuarios</button>
          <button>Configuración del Sistema</button>
        </div>
      </RoleBasedComponent>

      <RoleBasedComponent allowedRoles={["user", "admin"]}>
        <div
          style={{
            backgroundColor: "#f0fff0",
            padding: "15px",
            margin: "10px 0",
          }}
        >
          <h3>👤 Panel de Usuario</h3>
          <p>Contenido disponible para usuarios registrados</p>
          <button>Mi Perfil</button>
          <button>Mis Documentos</button>
        </div>
      </RoleBasedComponent>
    </div>
  );
}
