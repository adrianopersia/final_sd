"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

export const useApi = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const headers = {
        "Content-Type": "application/json",
        ...options.headers,
      };

      // Si no es un endpoint público, agregar token
      if (!endpoint.includes("/public/") && isAuthenticated) {
        try {
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: "https://final-sd-api", // Asegúrate de que coincida con tu Auth0 API
            },
          });
          headers.Authorization = `Bearer ${token}`;
        } catch (tokenError) {
          console.error("Error getting token:", tokenError);
          throw new Error("No se pudo obtener el token de autenticación");
        }
      }

      console.log("Calling API:", `http://localhost:8080${endpoint}`);
      console.log("Headers:", headers);

      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: options.method || "GET",
        ...options,
        headers,
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        throw new Error(
          `HTTP ${response.status}: ${errorText || response.statusText}`
        );
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        return data;
      } else {
        const text = await response.text();
        return { message: text };
      }
    } catch (err) {
      console.error("API call error:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { callApi, loading, error };
};
