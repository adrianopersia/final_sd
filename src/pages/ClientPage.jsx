import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

export default function ClientPage() {
  const { getAccessTokenSilently } = useAuth0();
  const [response, setResponse] = useState("");

  const getProfile = async () => {
    const token = await getAccessTokenSilently();
    const res = await fetch("http://localhost:8080/api/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setResponse(data.message);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Vista de Cliente</h2>
      <button onClick={getProfile}>Ver perfil cliente</button>
      <p>Respuesta: {response}</p>
    </div>
  );
}
