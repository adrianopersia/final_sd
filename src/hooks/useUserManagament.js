"use client";

import { useState } from "react";
import { useApi } from "./useApi";

export const useUserManagement = () => {
  const { callApi, loading, error } = useApi();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});

  const fetchUsers = async () => {
    try {
      const response = await callApi("/api/admin/users");
      setUsers(response);
      return response;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  const fetchUserStats = async () => {
    try {
      const response = await callApi("/api/admin/users/stats");
      setStats(response);
      return response;
    } catch (error) {
      console.error("Error fetching user stats:", error);
      throw error;
    }
  };

  const createUser = async (userData) => {
    try {
      const response = await callApi("/api/admin/users", {
        method: "POST",
        body: JSON.stringify(userData),
      });
      // Actualizar la lista local
      setUsers((prevUsers) => [...prevUsers, response]);
      return response;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      const response = await callApi(`/api/admin/users/${userId}/role`, {
        method: "PUT",
        body: JSON.stringify({ role: newRole }),
      });
      // Actualizar la lista local
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? response : user))
      );
      return response;
    } catch (error) {
      console.error("Error updating user role:", error);
      throw error;
    }
  };

  const updateUserStatus = async (userId, newStatus) => {
    try {
      const response = await callApi(`/api/admin/users/${userId}/status`, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus }),
      });
      // Actualizar la lista local
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? response : user))
      );
      return response;
    } catch (error) {
      console.error("Error updating user status:", error);
      throw error;
    }
  };

  const deleteUser = async (userId) => {
    try {
      await callApi(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });
      // Actualizar la lista local
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };

  return {
    users,
    stats,
    loading,
    error,
    fetchUsers,
    fetchUserStats,
    createUser,
    updateUserRole,
    updateUserStatus,
    deleteUser,
  };
};
