import { useUserRoles } from "../hooks/useUserRoles";

export default function RoleBasedComponent({
  allowedRoles,
  children,
  fallback = null,
}) {
  const { hasRole } = useUserRoles();

  const hasPermission = allowedRoles.some((role) => hasRole(role));

  return hasPermission ? children : fallback;
}
