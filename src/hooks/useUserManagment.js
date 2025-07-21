import { useState } from "react";
import { useApi } from "./useApi";

export function useUserManagement() {
  const { callApi } = useApi();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await callApi("/users");
    setUsers(data);
    setLoading(false);
  };

  const fetchUserStats = async () => {
    // Ejemplo de cómo podés calcular stats localmente:
    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.status === "active").length;
    const adminUsers = users.filter((u) => u.role === "admin").length;
    const regularUsers = users.filter((u) => u.role !== "admin").length;
    setStats({ totalUsers, activeUsers, adminUsers, regularUsers });
  };

  const createUser = async (newUser) => {
    const created = await callApi("/users", {
      method: "POST",
      body: JSON.stringify(newUser),
    });
    setUsers((prev) => [...prev, created]);
  };

  const updateUser = async (id, updatedFields) => {
    const updated = await callApi(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedFields),
    });
    setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
  };

  const updateUserStatus = async (id, newStatus) => {
    const user = users.find((u) => u.id === id);
    await updateUser(id, { ...user, status: newStatus });
  };

  const updateUserRole = async (id, newRole) => {
    const user = users.find((u) => u.id === id);
    await updateUser(id, { ...user, role: newRole });
  };

  return {
    users,
    stats,
    loading,
    fetchUsers,
    fetchUserStats,
    createUser,
    updateUser,
    updateUserStatus,
    updateUserRole,
  };
}
