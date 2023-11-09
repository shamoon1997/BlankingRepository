import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { CallbackPage } from "./pages";
import { AuthenticationGuard } from "./hoc";

const ProtectedPage: React.FC<unknown> = () => {
  return <div>Protected</div>;
};

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Sherlock V2 Scaffolding</h1>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route
          path="/yo"
          element={
            <AuthenticationGuard
              component={(<ProtectedPage />) as unknown as FC<unknown>}
            />
          }
        />
        <Route path="/callback" element={<CallbackPage />} />
      </Routes>
    </>
  );
}

export default App;
