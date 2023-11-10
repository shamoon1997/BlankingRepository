import { AuthenticationGuard } from "../hoc";
import { ProtectedPage } from "../pages";
import React from "react";
import { Route, Routes } from "react-router-dom";

const ProtectedRouter: React.FC = () => {
  return (
    <>
      <Routes>
        <Route
          path="/protected"
          element={<AuthenticationGuard component={ProtectedPage} />}
        />
      </Routes>
    </>
  );
};

export default ProtectedRouter;
