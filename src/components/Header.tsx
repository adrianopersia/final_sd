"use client";

import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useUserRoles } from "../hooks/useUserRoles";

export default function Header() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const { isAdmin } = useUserRoles();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y navegación izquierda */}
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">Final SD</h1>
            </div>

            <nav className="flex space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Home
              </Link>

              <Link
                to="/public"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/public")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Público
              </Link>

              {isAuthenticated && (
                <>
                  <Link
                    to="/private"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive("/private")
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    Privado
                  </Link>

                  <Link
                    to="/api-test"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive("/api-test")
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    Test API
                  </Link>

                  {isAdmin() && (
                    <Link
                      to="/admin"
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive("/admin")
                          ? "bg-red-100 text-red-700"
                          : "text-red-600 hover:text-red-900 hover:bg-red-50"
                      }`}
                    >
                      Admin Panel
                    </Link>
                  )}
                </>
              )}
            </nav>
          </div>

          {/* Usuario y botones derecha */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={
                      user?.picture ||
                      `https://ui-avatars.com/api/?name=${
                        user?.name || "User"
                      }&background=3B82F6&color=fff`
                    }
                    alt={user?.name || "User"}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name || "Usuario"}
                  </span>
                </div>
                <button
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <button
                onClick={() => loginWithRedirect()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
