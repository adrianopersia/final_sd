"use client";

import { useUserRoles } from "../hooks/useUserRoles";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

export default function Admin() {
  const { isAdmin } = useUserRoles();
  const { isAuthenticated } = useAuth0();
  const [activeSection, setActiveSection] = useState("dashboard");

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8">
          <h1 className="text-2xl font-bold text-red-900 mb-4">
            🔒 Acceso Denegado
          </h1>
          <p className="text-red-700">
            Debes iniciar sesión para acceder a esta página.
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin()) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8">
          <h1 className="text-2xl font-bold text-red-900 mb-4">
            🚫 Acceso Denegado
          </h1>
          <p className="text-red-700 mb-4">
            No tienes permisos de administrador para acceder a esta página.
          </p>
          <div className="bg-red-100 p-4 rounded-lg">
            <p className="text-sm text-red-800">
              Solo los usuarios con rol <strong>ADMIN</strong> pueden acceder al
              panel de administración.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg p-8 mb-8">
        <h1 className="text-3xl font-bold mb-2">🔑 Panel de Administrador</h1>
        <p className="text-red-100">
          Gestiona usuarios y configuraciones del sistema
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveSection("dashboard")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeSection === "dashboard"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveSection("users")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeSection === "users"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Gestión de Usuarios
            </button>
            <button
              onClick={() => setActiveSection("config")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeSection === "config"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Configuración
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white shadow rounded-lg p-6">
        {activeSection === "dashboard" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Dashboard Principal
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Quick Actions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-500 p-2 rounded-lg mr-3">
                    <span className="text-white text-xl">👥</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Usuarios
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Administrar usuarios del sistema
                </p>
                <button
                  onClick={() => setActiveSection("users")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Gestionar Usuarios
                </button>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-green-500 p-2 rounded-lg mr-3">
                    <span className="text-white text-xl">⚙️</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Sistema
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Configurar parámetros del sistema
                </p>
                <button
                  onClick={() => setActiveSection("config")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Configurar Sistema
                </button>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-500 p-2 rounded-lg mr-3">
                    <span className="text-white text-xl">🔐</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Seguridad
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">Gestionar roles y permisos</p>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Gestionar Roles
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === "users" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Gestión de Usuarios
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                👥 Administrar Usuarios
              </h3>
              <p className="text-blue-800 mb-4">
                Desde aquí puedes gestionar todos los usuarios del sistema,
                asignar roles y modificar permisos.
              </p>
              <div className="space-y-3">
                <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors mr-3">
                  Ver Todos los Usuarios
                </button>
                <button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors mr-3">
                  Crear Nuevo Usuario
                </button>
                <button className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
                  Gestionar Roles
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === "config" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Configuración del Sistema
            </h2>
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">
                  ⚙️ Configuración General
                </h3>
                <p className="text-green-800 mb-4">
                  Configura los parámetros generales del sistema y las opciones
                  de seguridad.
                </p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
                  Abrir Configuración
                </button>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-900 mb-4">
                  🔧 Configuración de API
                </h3>
                <p className="text-yellow-800 mb-4">
                  Gestiona las configuraciones de las APIs y los endpoints del
                  sistema.
                </p>
                <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
                  Configurar APIs
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
