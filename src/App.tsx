import { Route, Routes, useLocation } from "react-router-dom";
import { CallbackPage, DashboardPage, HomePage, NotFoundPage } from "./pages";
import { AuthenticationGuard } from "./hoc";

import { useAuth0 } from "@auth0/auth0-react";
import { HomeLoader, PageLoader } from "./components";

function App() {
  const { isLoading } = useAuth0();
  const location = useLocation();

  if (isLoading) {
    if (location.pathname === "/") {
      return <HomeLoader />;
    } else {
      return <PageLoader />;
    }
  }

  return (
    <>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/callback" element={<CallbackPage />} />

        {/* protected */}
        <Route
          path="/dashboard"
          element={<AuthenticationGuard component={DashboardPage} />}
        />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
