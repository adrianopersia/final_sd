import { useApi } from "./useApi";
import { useState } from "react";

export function useUserManagement() {
  const { callApi } = useApi();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await callApi("/users");
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (newUser) => {
    await callApi("/users", "POST", newUser);
    await fetchUsers();
  };

  const updateUser = async (id, userData) => {
    await callApi(`/users/${id}`, "PUT", userData);
    await fetchUsers();
  };

  return { users, loading, fetchUsers, createUser, updateUser };
}
