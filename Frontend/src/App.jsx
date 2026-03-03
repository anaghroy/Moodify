import AppRoutes from "./AppRoutes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AudioProvider } from "./features/Expression/context/AudioContext";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AudioProvider>
        <AppRoutes />
      </AudioProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
