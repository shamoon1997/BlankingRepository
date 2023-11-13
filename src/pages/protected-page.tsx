import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const ProtectedPage: React.FC<unknown> = () => {
  const { logout } = useAuth0();
  return (
    <>
      <div>Protected</div>
      <button onClick={() => void logout()}>Click to log out</button>
    </>
  );
};

export default ProtectedPage;
