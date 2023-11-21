import { Route, Routes, useLocation } from "react-router-dom";
import { CallbackPage, DashboardPage, HomePage, NotFoundPage } from "./pages";
import { AuthenticationGuard } from "./hoc";

import { useAuth0 } from "@auth0/auth0-react";
import { HomeLoader, PageLoader, Legend } from "./components";
import { AppRoutes } from "./utils/routes";

function App() {
  const { isLoading } = useAuth0();
  const location = useLocation();

  if (isLoading) {
    if (location.pathname === AppRoutes.root) {
      return <HomeLoader />;
    } else {
      return <PageLoader />;
    }
  }

  return (
    <>
      <Legend />
      <Routes>
        {/* public routes */}
        <Route path={AppRoutes.root} element={<HomePage />} />
        <Route path={AppRoutes.callback} element={<CallbackPage />} />

        {/* protected */}
        <Route
          path={AppRoutes.dashboard}
          element={<AuthenticationGuard component={DashboardPage} />}
        >
          <Route path="deployments" element={<h1>Yo bro</h1>} />
        </Route>

        {/* 404 */}
        <Route path={AppRoutes.notFound} element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
