import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <button onClick={() => void loginWithRedirect()}>Log In</button>
    </>
  );
};

export default LoginPage;
