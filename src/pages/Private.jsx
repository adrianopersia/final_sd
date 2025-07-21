"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useUserRoles } from "../hooks/useUserRoles";
import { useState, useEffect } from "react";
import { useApi } from "../hooks/useApi";

export default function Private() {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const { roles, isAdmin, isUser } = useUserRoles();
  const { callApi } = useApi();
  const [userProfile, setUserProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [isAuthenticated]);

  const fetchUserProfile = async () => {
    setLoadingProfile(true);
    try {
      const profile = await callApi("/api/user/profile");
      setUserProfile(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoadingProfile(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-6xl mb-4">🔒</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Acceso Denegado
            </h1>
            <p className="text-gray-600">
              Debes iniciar sesión para ver esta página.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Welcome */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ¡Bienvenido, {user?.name}! 👋
          </h1>
          <p className="text-xl text-gray-600">
            Has accedido exitosamente a tu área privada
          </p>
        </div>

        {/* User Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <div className="flex items-center space-x-4">
              <img
                className="h-20 w-20 rounded-full ring-4 ring-white/30"
                src={
                  user?.picture ||
                  `https://ui-avatars.com/api/?name=${user?.name}&background=3B82F6&color=fff&size=128`
                }
                alt={user?.name}
              />
              <div className="text-white">
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-blue-100">{user?.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  {roles.map((role) => (
                    <span
                      key={role}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        role === "admin"
                          ? "bg-red-500/20 text-red-100 border border-red-400/30"
                          : "bg-blue-500/20 text-blue-100 border border-blue-400/30"
                      }`}
                    >
                      {role.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Información Personal */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  👤 Información Personal
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Nombre Completo
                    </label>
                    <p className="text-gray-900">
                      {user?.name || "No disponible"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <p className="text-gray-900">
                      {user?.email || "No disponible"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Nickname
                    </label>
                    <p className="text-gray-900">
                      {user?.nickname || "No disponible"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Email Verificado
                    </label>
                    <p
                      className={`${
                        user?.email_verified ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {user?.email_verified
                        ? "✅ Verificado"
                        : "❌ No verificado"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Información de Cuenta */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  🔐 Información de Cuenta
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      User ID
                    </label>
                    <p className="text-gray-900 text-xs font-mono bg-white p-2 rounded border">
                      {user?.sub || "No disponible"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Última Actualización
                    </label>
                    <p className="text-gray-900">
                      {user?.updated_at
                        ? new Date(user.updated_at).toLocaleDateString("es-ES")
                        : "No disponible"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Proveedor
                    </label>
                    <p className="text-gray-900">Auth0</p>
                  </div>
                </div>
              </div>

              {/* Roles y Permisos */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  🛡️ Roles y Permisos
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Roles Asignados
                    </label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {roles.length > 0 ? (
                        roles.map((role) => (
                          <span
                            key={role}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              role === "admin"
                                ? "bg-red-100 text-red-800 border border-red-200"
                                : "bg-blue-100 text-blue-800 border border-blue-200"
                            }`}
                          >
                            {role.toUpperCase()}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500 text-sm">
                          Sin roles asignados
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Permisos
                    </label>
                    <div className="space-y-1 mt-1">
                      <p className="text-sm text-green-600">
                        ✅ Acceso a área privada
                      </p>
                      {isUser() && (
                        <p className="text-sm text-green-600">
                          ✅ Endpoints de usuario
                        </p>
                      )}
                      {isAdmin() && (
                        <p className="text-sm text-green-600">
                          ✅ Panel de administrador
                        </p>
                      )}
                      {isAdmin() && (
                        <p className="text-sm text-green-600">
                          ✅ Gestión de usuarios
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* API Profile Data */}
            {loadingProfile ? (
              <div className="mt-8 bg-gray-50 rounded-xl p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-gray-600">Cargando datos del perfil...</p>
              </div>
            ) : userProfile ? (
              <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  🌐 Datos del Backend
                </h3>
                <pre className="bg-white p-4 rounded-lg text-sm overflow-x-auto border">
                  {JSON.stringify(userProfile, null, 2)}
                </pre>
              </div>
            ) : null}

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={fetchUserProfile}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                🔄 Actualizar Perfil
              </button>

              {isAdmin() && (
                <button
                  onClick={() => (window.location.href = "/admin")}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  👑 Ir a Admin Panel
                </button>
              )}

              <button
                onClick={() => (window.location.href = "/api-test")}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                🧪 Probar APIs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
