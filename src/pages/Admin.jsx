"use client";

import { useUserRoles } from "../hooks/useUserRoles";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { useUserManagement } from "../hooks/useUserManagment";

export default function Admin() {
  const { isAdmin } = useUserRoles();
  const { isAuthenticated } = useAuth0();
  const {
    users,
    stats,
    loading,
    fetchUsers,
    fetchUserStats,
    createUser,
    updateUserRole,
    updateUserStatus,
    updateUser,
  } = useUserManagement();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "usuario",
  });

  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated && isAdmin()) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    try {
      await fetchUsers();
      await fetchUserStats();
    } catch (error) {
      console.error("Error loading admin data:", error);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await createUser(newUser);
      setNewUser({ name: "", email: "", role: "usuario" });
      setShowCreateModal(false);
      await fetchUserStats();
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error al crear usuario: " + error.message);
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      await updateUser(editUser.id, editUser);
      setEditUser(null);
      await fetchUserStats();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error al actualizar usuario: " + error.message);
    }
  };

  const toggleUserStatus = async (userId) => {
    try {
      const user = users.find((u) => u.id === userId);
      const newStatus = user.status === "active" ? "inactive" : "active";
      await updateUserStatus(userId, newStatus);
      await fetchUserStats();
    } catch (error) {
      console.error("Error updating user status:", error);
      alert("Error al actualizar estado: " + error.message);
    }
  };

  const changeUserRole = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      await fetchUserStats();
    } catch (error) {
      console.error("Error updating user role:", error);
      alert("Error al actualizar rol: " + error.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-6xl mb-4">🔒</div>
            <h1 className="text-2xl font-bold text-red-900 mb-4">
              Acceso Denegado
            </h1>
            <p className="text-red-700">
              Debes iniciar sesión para acceder a esta página.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-6xl mb-4">🚫</div>
            <h1 className="text-2xl font-bold text-red-900 mb-4">
              Acceso Denegado
            </h1>
            <p className="text-red-700 mb-4">
              No tienes permisos de administrador para acceder a esta página.
            </p>
            <div className="bg-red-100 p-4 rounded-lg">
              <p className="text-sm text-red-800">
                Solo los usuarios con rol <strong>ADMIN</strong> pueden acceder
                al panel de administración.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            👑 Panel de Administrador
          </h1>
          <p className="text-xl text-gray-600">
            Gestiona usuarios y sus roles en el sistema
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Usuarios"
            value={stats.totalUsers}
            emoji="👥"
          />
          <StatCard
            title="Usuarios Activos"
            value={stats.activeUsers}
            emoji="✅"
          />
          <StatCard
            title="Administradores"
            value={stats.adminUsers}
            emoji="👑"
          />
          <StatCard
            title="Usuarios Regulares"
            value={stats.regularUsers}
            emoji="👤"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-pink-600 px-8 py-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Gestión de Usuarios
              </h2>
              <p className="text-red-100">
                Administra todos los usuarios del sistema
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-white text-red-600 hover:bg-red-50 px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              ➕ Crear Usuario
            </button>
          </div>

          <div className="p-8">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Cargando usuarios...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usuario
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rol
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Último Login
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users?.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap flex items-center">
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
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={user.role}
                            onChange={(e) =>
                              changeUserRole(user.id, e.target.value)
                            }
                            className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${
                              user.role === "admin"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            <option value="usuario">Usuario</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {user.status === "active"
                              ? "✅ Activo"
                              : "⏸️ Inactivo"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.lastLogin
                            ? new Date(user.lastLogin).toLocaleDateString(
                                "es-ES"
                              )
                            : "Nunca"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            onClick={() => toggleUserStatus(user.id)}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                              user.status === "active"
                                ? "bg-red-100 text-red-700 hover:bg-red-200"
                                : "bg-green-100 text-green-700 hover:bg-green-200"
                            }`}
                          >
                            {user.status === "active"
                              ? "Desactivar"
                              : "Activar"}
                          </button>
                          <button
                            onClick={() => setEditUser(user)}
                            className="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg text-xs font-medium transition-colors"
                          >
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
        </div>
      </div>

      {/* Modal Crear Usuario */}
      {showCreateModal && (
        <UserModal
          title="➕ Crear Nuevo Usuario"
          user={newUser}
          onChange={setNewUser}
          onCancel={() => setShowCreateModal(false)}
          onSubmit={handleCreateUser}
          buttonLabel="Crear Usuario"
        />
      )}

      {/* Modal Editar Usuario */}
      {editUser && (
        <UserModal
          title="✏️ Editar Usuario"
          user={editUser}
          onChange={setEditUser}
          onCancel={() => setEditUser(null)}
          onSubmit={handleEditUser}
          buttonLabel="Guardar Cambios"
        />
      )}
    </div>
  );
}

function StatCard({ title, value = 0, emoji }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-blue-100 text-blue-600">
          <span className="text-2xl">{emoji}</span>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
