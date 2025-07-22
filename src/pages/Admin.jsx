"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import UserModal from "../components/UserModal";

export default function Admin() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "usuario",
  });

  // Cargar usuarios al iniciar
  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = await getAccessTokenSilently();
      const res = await fetch("http://localhost:8080/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });
      setShowCreateModal(false);
      setNewUser({ name: "", email: "", role: "usuario" });
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      const token = await getAccessTokenSilently();
      const user = users.find((u) => u.id === userId);
      if (!user) return;

      await fetch(`http://localhost:8080/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...user, role: newRole }),
      });
      fetchUsers();
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const toggleUserStatus = async (userId) => {
    try {
      const token = await getAccessTokenSilently();
      const user = users.find((u) => u.id === userId);
      if (!user) return;

      const newStatus = user.status === "active" ? "inactive" : "active";

      await fetch(`http://localhost:8080/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...user, status: newStatus }),
      });
      fetchUsers();
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  if (!isAuthenticated) {
    return <div className="p-8 text-center">Debes iniciar sesión.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            👑 Gestión de Usuarios
          </h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            ➕ Crear Usuario
          </button>
        </div>

        {loading ? (
          <div className="text-center">Cargando usuarios...</div>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Último Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={`https://ui-avatars.com/api/?name=${user.name}&background=3B82F6&color=fff`}
                          alt={user.name}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          updateUserRole(user.id, e.target.value)
                        }
                        className="px-2 py-1 rounded text-xs bg-gray-100"
                      >
                        <option value="usuario">Usuario</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.status === "active" ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {user.lastLogin
                        ? new Date(user.lastLogin).toLocaleDateString()
                        : "Nunca"}
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs"
                      >
                        {user.status === "active" ? "Desactivar" : "Activar"}
                      </button>
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <UserModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={createUser}
        newUser={newUser}
        setNewUser={setNewUser}
      />
    </div>
  );
}
