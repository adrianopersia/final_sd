import { useAuth0 } from "@auth0/auth0-react";

export default function LogoutButton() {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <button onClick={() => logout({ returnTo: window.location.origin })}>
        Cerrar sesión
      </button>
    )
  );
}
