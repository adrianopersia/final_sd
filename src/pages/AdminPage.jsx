import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

export default function AdminPage() {
  const { getAccessTokenSilently } = useAuth0();
  const [response, setResponse] = useState("");

  const getDashboard = async () => {
    const token = await getAccessTokenSilently();
    const res = await fetch("http://localhost:8080/api/admin/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setResponse(data.message);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Panel de Admin</h2>
      <button onClick={getDashboard}>Ver dashboard admin</button>
      <p>Respuesta: {response}</p>
    </div>
  );
}
