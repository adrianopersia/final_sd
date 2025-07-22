import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-2p6bkdu5vkol2d5t.us.auth0.com"
      clientId="MlNHq1KvivTK77J6YZo3rom0wwqFMiTO"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://final-sd-api",
        scope: "openid profile email",
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
