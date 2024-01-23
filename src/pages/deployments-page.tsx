import { BaseMap, PageLoader } from "@/components";
import Header from "@/components/header/header";
import { FilterArea } from "@/components/filters";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { FallBackPage } from "@/pages/fall-back-page.tsx";
import { ErrorBoundary } from "react-error-boundary";

export const DeploymentPage = withAuthenticationRequired(
  () => {
    return (
      <div className="flex h-screen w-full flex-1 flex-col">
        <Header heading="Deployment" />

        <ErrorBoundary FallbackComponent={FallBackPage}>
          <div className="flex flex-1 overflow-auto">
            <FilterArea />
            <div className="relative w-full">
              <BaseMap />
            </div>
          </div>
        </ErrorBoundary>
      </div>
    );
  },
  {
    onRedirecting() {
      return <PageLoader />;
    },
  },
);
