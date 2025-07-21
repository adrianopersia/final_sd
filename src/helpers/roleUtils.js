export function hasRole(user, role) {
  const roles = user?.["https://final-sd-api/roles"] || [];
  return roles.includes(role);
}
