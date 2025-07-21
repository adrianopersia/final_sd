"use client";

import { useState } from "react";
import { useApi } from "../hooks/useApi";
import { useUserRoles } from "../hooks/useUserRoles";
import { useAuth0 } from "@auth0/auth0-react";

export default function ApiTest() {
  const { callApi, loading, error } = useApi();
  const { isAdmin, roles } = useUserRoles();
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [results, setResults] = useState({});
  const [showToken, setShowToken] = useState(false);
  const [currentToken, setCurrentToken] = useState("");

  const testEndpoint = async (endpoint, name) => {
    try {
      const result = await callApi(endpoint);
      setResults((prev) => ({
        ...prev,
        [name]: {
          success: true,
          data: result,
          timestamp: new Date().toLocaleTimeString(),
        },
      }));
    } catch (err) {
      setResults((prev) => ({
        ...prev,
        [name]: {
          success: false,
          error: err.message,
          timestamp: new Date().toLocaleTimeString(),
        },
      }));
    }
  };

  const copyToken = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: "https://final-sd-api",
        },
      });
      setCurrentToken(token);
      await navigator.clipboard.writeText(token);
      alert("Token copiado al clipboard!");
    } catch (error) {
      console.error("Error getting token:", error);
      alert("Error al obtener el token: " + error.message);
    }
  };

  const endpoints = [
    {
      name: "Public Hello",
      endpoint: "/api/public/hello",
      description: "Endpoint público - No requiere autenticación",
      color: "green",
    },
    {
      name: "Private Hello",
      endpoint: "/api/private/hello",
      description: "Endpoint privado - Requiere autenticación",
      color: "blue",
    },
    {
      name: "User Profile",
      endpoint: "/api/user/profile",
      description: "Perfil de usuario - Requiere rol USER o ADMIN",
      color: "blue",
    },
  ];

  const adminEndpoints = [
    {
      name: "Admin Dashboard",
      endpoint: "/api/admin/dashboard",
      description: "Dashboard de admin - Solo ADMIN",
      color: "red",
    },
    {
      name: "Admin Users",
      endpoint: "/api/admin/users",
      description: "Gestión de usuarios - Solo ADMIN",
      color: "red",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2">🧪 Test de APIs</h1>
        <p className="text-indigo-100">
          Prueba los endpoints del backend con diferentes roles
        </p>
      </div>

      {/* User Info & Token */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Estado de Autenticación
            </h2>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Estado:</span>{" "}
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    isAuthenticated
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {isAuthenticated ? "Autenticado" : "No autenticado"}
                </span>
              </p>
              <p className="text-sm">
                <span className="font-medium">Roles:</span>{" "}
                {roles.length > 0 ? (
                  <span className="space-x-1">
                    {roles.map((role) => (
                      <span
                        key={role}
                        className={`px-2 py-1 rounded text-xs ${
                          role === "admin"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {role.toUpperCase()}
                      </span>
                    ))}
                  </span>
                ) : (
                  <span className="text-gray-500">Sin roles</span>
                )}
              </p>
            </div>
          </div>

          {isAuthenticated && (
            <div className="space-x-2">
              <button
                onClick={copyToken}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Copiar Token
              </button>
              <button
                onClick={() => setShowToken(!showToken)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {showToken ? "Ocultar" : "Ver"} Token
              </button>
            </div>
          )}
        </div>

        {showToken && currentToken && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-xs font-mono break-all text-gray-600">
              {currentToken}
            </p>
          </div>
        )}
      </div>

      {/* General Endpoints */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          🌐 Endpoints Generales
        </h2>
        <div className="space-y-4">
          {endpoints.map((endpoint) => (
            <div
              key={endpoint.name}
              className={`border-l-4 border-${endpoint.color}-500 bg-${endpoint.color}-50 p-4 rounded-r-lg`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {endpoint.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {endpoint.description}
                  </p>
                  <code className="text-xs bg-white px-2 py-1 rounded mt-2 inline-block border">
                    GET {endpoint.endpoint}
                  </code>
                </div>
                <button
                  onClick={() => testEndpoint(endpoint.endpoint, endpoint.name)}
                  disabled={loading}
                  className={`bg-${endpoint.color}-600 hover:bg-${endpoint.color}-700 disabled:bg-${endpoint.color}-300 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors ml-4`}
                >
                  {loading ? "Probando..." : "Probar"}
                </button>
              </div>

              {results[endpoint.name] && (
                <div
                  className={`mt-3 p-3 rounded-md text-sm border ${
                    results[endpoint.name].success
                      ? "bg-green-50 text-green-800 border-green-200"
                      : "bg-red-50 text-red-800 border-red-200"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <strong>
                      {results[endpoint.name].success ? "✅ Éxito" : "❌ Error"}
                    </strong>
                    <span className="text-xs opacity-75">
                      {results[endpoint.name].timestamp}
                    </span>
                  </div>
                  {results[endpoint.name].success ? (
                    <pre className="whitespace-pre-wrap text-xs mt-2 bg-white p-2 rounded border">
                      {JSON.stringify(results[endpoint.name].data, null, 2)}
                    </pre>
                  ) : (
                    <div className="text-sm">
                      {results[endpoint.name].error}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Admin Endpoints */}
      {isAdmin() && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            🔑 Endpoints de Administrador
          </h2>
          <div className="space-y-4">
            {adminEndpoints.map((endpoint) => (
              <div
                key={endpoint.name}
                className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {endpoint.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {endpoint.description}
                    </p>
                    <code className="text-xs bg-white px-2 py-1 rounded mt-2 inline-block border">
                      GET {endpoint.endpoint}
                    </code>
                  </div>
                  <button
                    onClick={() =>
                      testEndpoint(endpoint.endpoint, endpoint.name)
                    }
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors ml-4"
                  >
                    {loading ? "Probando..." : "Probar"}
                  </button>
                </div>

                {results[endpoint.name] && (
                  <div
                    className={`mt-3 p-3 rounded-md text-sm border ${
                      results[endpoint.name].success
                        ? "bg-green-50 text-green-800 border-green-200"
                        : "bg-red-100 text-red-800 border-red-300"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <strong>
                        {results[endpoint.name].success
                          ? "✅ Éxito"
                          : "❌ Error"}
                      </strong>
                      <span className="text-xs opacity-75">
                        {results[endpoint.name].timestamp}
                      </span>
                    </div>
                    {results[endpoint.name].success ? (
                      <pre className="whitespace-pre-wrap text-xs mt-2 bg-white p-2 rounded border">
                        {JSON.stringify(results[endpoint.name].data, null, 2)}
                      </pre>
                    ) : (
                      <div className="text-sm">
                        {results[endpoint.name].error}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Debug Info */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="font-semibold text-red-900 mb-2">🐛 Error de Debug</h3>
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
