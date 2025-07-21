"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useUserRoles } from "../hooks/useUserRoles";

export default function Profile() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const { roles, isAdmin } = useUserRoles();

  const copyToken = async () => {
    try {
      const token = await getAccessTokenSilently();
      await navigator.clipboard.writeText(token);
      alert("Token copiado al clipboard!");
    } catch (error) {
      console.error("Error getting token:", error);
    }
  };

  if (isLoading) return <div className="text-center py-4">Cargando...</div>;

  if (!isAuthenticated) return null;

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Perfil de Usuario
      </h2>

      <div className="flex items-center space-x-4 mb-4">
        <img
          className="h-16 w-16 rounded-full"
          src={
            user.picture ||
            `https://ui-avatars.com/api/?name=${user.name}&background=3B82F6&color=fff`
          }
          alt={user.name}
        />
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Roles:
          </label>
          <div className="mt-1 flex flex-wrap gap-2">
            {roles.length > 0 ? (
              roles.map((role) => (
                <span
                  key={role}
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    role === "admin"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {role.toUpperCase()}
                </span>
              ))
            ) : (
              <span className="text-gray-500">Sin roles asignados</span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Permisos:
          </label>
          <div className="mt-1">
            {isAdmin && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                🔑 Acceso de Administrador
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <button
          onClick={copyToken}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Copiar Token para Postman
        </button>
      </div>
    </div>
  );
}
