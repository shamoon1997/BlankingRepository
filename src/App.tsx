import { Route, Routes, useLocation } from "react-router-dom";
import {
  CallbackPage,
  DeploymentPage,
  HomePage,
  NotFoundPage,
  PoleViewPage,
} from "./pages";
import { useAuth0 } from "@auth0/auth0-react";
import { ErrorBoundary } from "react-error-boundary";
import { FallBackPage } from "./pages/fall-back-page.tsx";
import { HomeLoader, PageLoader, SideNavigation } from "./components";
import { AppRoutes } from "./utils/routes";
import { useShowSideBar } from "./hooks";

const RouteMappings = [
  {
    path: AppRoutes.root,
    element: <HomePage />,
  },
  {
    path: AppRoutes.callback,
    element: <CallbackPage />,
  },
  {
    path: AppRoutes.deployments,
    element: <DeploymentPage />,
  },
  {
    path: AppRoutes.poleView,
    element: <PoleViewPage />,
  },
  {
    path: AppRoutes.notFound,
    element: <NotFoundPage />,
  },
];

function App() {
  const { isLoading } = useAuth0();
  const location = useLocation();
  const showSideBar = useShowSideBar(RouteMappings);

  if (isLoading) {
    if (location.pathname === AppRoutes.root) {
      return <HomeLoader />;
    } else {
      return <PageLoader />;
    }
  }

  return (
    <div className={`${showSideBar ? "flex" : null}`}>
      {showSideBar && <SideNavigation />}
      <ErrorBoundary FallbackComponent={FallBackPage}>
        <Routes>
          {RouteMappings.map((mapping) => {
            return (
              <Route
                key={mapping.path}
                path={mapping.path}
                element={mapping.element}
              />
            );
          })}
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
