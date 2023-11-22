import { BaseMap, PageLoader } from "@/components";
import { FilterArea } from "@/components/filters";
import { withAuthenticationRequired } from "@auth0/auth0-react";

export const DeploymentPage = withAuthenticationRequired(
  () => {
    return (
      <div className="flex flex-1">
        <div>
          <FilterArea />
        </div>
        <div className="relative w-full">
          <BaseMap />
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
