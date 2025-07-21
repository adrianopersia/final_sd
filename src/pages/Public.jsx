"use client";

export default function Public() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🌐 Página Pública
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Esta página es accesible para todos los usuarios, sin necesidad de
            autenticación. Explora la información general de nuestro sistema.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center card-hover">
            <div className="text-5xl mb-4">🔓</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Acceso Libre
            </h3>
            <p className="text-gray-600">
              No necesitas estar registrado para ver esta información. Es
              completamente pública y accesible.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center card-hover">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Tecnología Moderna
            </h3>
            <p className="text-gray-600">
              Construido con React, Spring Boot y las mejores prácticas de
              desarrollo web moderno.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center card-hover">
            <div className="text-5xl mb-4">🛡️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Seguridad Avanzada
            </h3>
            <p className="text-gray-600">
              Implementamos Auth0 para garantizar la máxima seguridad en la
              autenticación y autorización.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            ✨ Características del Sistema
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <span className="text-2xl">🔐</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Autenticación Segura
                  </h4>
                  <p className="text-gray-600">
                    Integración completa con Auth0 para manejo seguro de
                    usuarios
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <span className="text-2xl">👥</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Control de Roles
                  </h4>
                  <p className="text-gray-600">
                    Sistema de roles granular con permisos específicos
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <span className="text-2xl">🌐</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    APIs RESTful
                  </h4>
                  <p className="text-gray-600">
                    Backend robusto con Spring Boot y Spring Security
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Interfaz Moderna
                  </h4>
                  <p className="text-gray-600">
                    UI/UX diseñada con React y componentes modernos
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <span className="text-2xl">📱</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Responsive Design
                  </h4>
                  <p className="text-gray-600">
                    Optimizado para todos los dispositivos y tamaños de pantalla
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <span className="text-2xl">🧪</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Testing Integrado
                  </h4>
                  <p className="text-gray-600">
                    Herramientas para probar APIs y funcionalidades
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="text-xl text-blue-100 mb-6">
            Inicia sesión para acceder a todas las funcionalidades del sistema
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            🚀 Ir al Home
          </button>
        </div>
      </div>
    </div>
  );
}
