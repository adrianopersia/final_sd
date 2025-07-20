import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Cargando...</div>;

  return isAuthenticated && <div>Bienvenido, {user.name}</div>;
}
