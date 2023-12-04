import { BaseMap, PageLoader } from "@/components";
import Header from "@/components/header/header";
import { FilterArea } from "@/components/filters";
import { withAuthenticationRequired } from "@auth0/auth0-react";

export const DeploymentPage = withAuthenticationRequired(
  () => {
    return (
      <div className="flex h-screen w-full flex-1 flex-col">
        {/* NAVBAR */}
        <Header heading="Deployment" />

        {/*  add boundary here */}
        <div className="flex flex-1 overflow-auto">
          <FilterArea />
          <div className="relative w-full">
            <BaseMap />
          </div>
        </div>
      </div>
    );
  },
  {
    onRedirecting() {
      return <PageLoader />;
    },
  },
);
