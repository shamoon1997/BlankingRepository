import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthenticationGuard } from "./hoc";
import { CallbackPage, LoginPage } from "./pages";

const ProtectedPage: React.FC<unknown> = () => {
  const { logout } = useAuth0();
  return (
    <>
      <div>Protected</div>
      <button onClick={() => void logout()}>Click to log out</button>
    </>
  );
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/protected"
          element={<AuthenticationGuard component={ProtectedPage} />}
        />
        <Route path="/callback" element={<CallbackPage />} />
      </Routes>
    </>
  );
}

export default App;
