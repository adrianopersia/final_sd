import { useAuth0 } from "@auth0/auth0-react";

export const useUserRoles = () => {
  const { user, isAuthenticated } = useAuth0();

  const getRoles = () => {
    if (!isAuthenticated || !user) return [];

    const roles = user["https://final-sd-api/roles"] || [];
    return roles.map((role) => role.toLowerCase());
  };

  const hasRole = (role) => {
    const roles = getRoles();
    return roles.includes(role.toLowerCase());
  };

  const isAdmin = () => hasRole("admin");
  const isUser = () => hasRole("user");

  return {
    roles: getRoles(),
    hasRole,
    isAdmin,
    isUser,
  };
};
