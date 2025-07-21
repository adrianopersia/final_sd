import { useAuth0 } from "@auth0/auth0-react";
import { useUserRoles } from "../hooks/useUserRoles";

export default function Private() {
  const { isAuthenticated, isLoading } = useAuth0();
  const { roles, isAdmin, isUser } = useUserRoles();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8">
          <h1 className="text-2xl font-bold text-red-900 mb-4">
            🔒 Acceso Denegado
          </h1>
          <p className="text-red-700">
            Debes iniciar sesión para ver esta página.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2">
          ¡Bienvenido a tu área privada! 🎉
        </h1>
        <p className="text-blue-100">
          Has accedido exitosamente a una página protegida
        </p>
      </div>

      {/* User Info Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500">
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <span className="text-2xl">👤</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Tu información
            </h2>
            <p className="text-gray-600">Detalles de tu cuenta y permisos</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">Roles asignados:</p>
          <div className="flex flex-wrap gap-2">
            {roles.length > 0 ? (
              roles.map((role) => (
                <span
                  key={role}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    role === "admin"
                      ? "bg-red-100 text-red-800 border border-red-200"
                      : "bg-blue-100 text-blue-800 border border-blue-200"
                  }`}
                >
                  {role.toUpperCase()}
                </span>
              ))
            ) : (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                Sin roles asignados
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content based on roles */}
      {isUser() && !isAdmin() && (
        <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <span className="text-2xl">👨‍💼</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Panel de Usuario
              </h3>
              <p className="text-gray-600">
                Funciones disponibles para usuarios registrados
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">
                ✅ Permisos disponibles:
              </h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Acceso a endpoints de usuario</li>
                <li>• Ver tu perfil personal</li>
                <li>• Acceso a funciones básicas</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">
                🔧 Acciones rápidas:
              </h4>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors mb-2">
                Ver Mi Perfil
              </button>
            </div>
          </div>
        </div>
      )}

      {isAdmin() && (
        <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-red-500">
          <div className="flex items-center mb-4">
            <div className="bg-red-100 p-3 rounded-full mr-4">
              <span className="text-2xl">🔑</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Panel de Administrador
              </h3>
              <p className="text-gray-600">
                Funciones exclusivas para administradores
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-medium text-red-900 mb-2">
                🛡️ Permisos de administrador:
              </h4>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• Acceso completo a todas las APIs</li>
                <li>• Gestión de usuarios del sistema</li>
                <li>• Configuración del sistema</li>
                <li>• Acceso al panel de administración</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-medium text-orange-900 mb-2">
                ⚡ Acciones de administrador:
              </h4>
              <div className="space-y-2">
                <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Ir al Panel Admin
                </button>
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Gestionar Sistema
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No roles assigned */}
      {roles.length === 0 && (
        <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-yellow-500">
          <div className="flex items-center mb-4">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Sin roles asignados
              </h3>
              <p className="text-gray-600">
                Tu cuenta necesita permisos para acceder a las funciones
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-yellow-800 text-sm">
              Contacta al administrador del sistema para que te asigne los roles
              correspondientes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
