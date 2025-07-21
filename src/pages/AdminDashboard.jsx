import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function AdminDashboard() {
  const { getAccessTokenSilently } = useAuth0();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const res = await fetch("http://localhost:8080/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setMessage(data.message);
      } catch (err) {
        console.error(err);
        setMessage("Error al obtener datos");
      }
    };
    fetchData();
  }, [getAccessTokenSilently]);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>{message}</p>
    </div>
  );
}
