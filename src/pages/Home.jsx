"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useUserRoles } from "../hooks/useUserRoles";
import { Link } from "react-router-dom";

export default function Home() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const { isAdmin } = useUserRoles();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Bienvenido a{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Final SD
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Una aplicación moderna de demostración con Spring Boot, React y
              Auth0. Explora las funcionalidades de autenticación y autorización
              basada en roles.
            </p>

            {!isAuthenticated ? (
              <div className="space-y-4">
                <button
                  onClick={() => loginWithRedirect()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  🚀 Comenzar Ahora
                </button>
                <p className="text-gray-500">
                  Inicia sesión para acceder a todas las funcionalidades
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <Link
                  to="/private"
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  <div className="text-4xl mb-4">🔒</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Área Privada
                  </h3>
                  <p className="text-gray-600">
                    Accede a tu panel personal y gestiona tu perfil
                  </p>
                </Link>

                <Link
                  to="/api-test"
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  <div className="text-4xl mb-4">🧪</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Test APIs
                  </h3>
                  <p className="text-gray-600">
                    Prueba los endpoints del backend con diferentes roles
                  </p>
                </Link>

                {isAdmin() && (
                  <Link
                    to="/admin"
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    <div className="text-4xl mb-4">👑</div>
                    <h3 className="text-xl font-semibold mb-2">Panel Admin</h3>
                    <p className="text-red-100">
                      Gestiona usuarios y configuraciones del sistema
                    </p>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Features Section */}
      {isAuthenticated && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Características del Sistema
            </h2>
            <p className="text-gray-600">
              Explora todas las funcionalidades disponibles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-4">🔐</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Autenticación
              </h3>
              <p className="text-gray-600 text-sm">
                Integración completa con Auth0
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="font-semibold text-gray-900 mb-2">Roles</h3>
              <p className="text-gray-600 text-sm">
                Control de acceso basado en roles
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="font-semibold text-gray-900 mb-2">Seguridad</h3>
              <p className="text-gray-600 text-sm">APIs protegidas con JWT</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-2">Moderno</h3>
              <p className="text-gray-600 text-sm">React + Spring Boot</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
