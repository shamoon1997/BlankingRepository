import { Route, Routes, useLocation } from "react-router-dom";
import { CallbackPage, DeploymentPage, HomePage, NotFoundPage } from "./pages";
import { useAuth0 } from "@auth0/auth0-react";
import { HomeLoader, PageLoader, SideNavigation } from "./components";
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

  const isDashboardPath = location.pathname.startsWith("/dashboard");

  return (
    <div className={`${isDashboardPath ? "flex" : ""}`}>
      {isDashboardPath && <SideNavigation />}
      <Routes>
        {/* public routes */}
        <Route path={AppRoutes.root} element={<HomePage />} />
        <Route path={AppRoutes.callback} element={<CallbackPage />} />

        {/* protected routes i.e always wrapped with withAuthenticationRequired  */}
        <Route path={AppRoutes.deployments} element={<DeploymentPage />} />

        {/* 404 */}
        <Route path={AppRoutes.notFound} element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
