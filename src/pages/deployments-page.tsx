import { BaseMap, PageLoader } from "@/components";
import { FilterArea } from "@/components/filters";
import { withAuthenticationRequired } from "@auth0/auth0-react";

export const DeploymentPage = withAuthenticationRequired(
  () => {
    return (
      <div className="flex">
        <FilterArea />
        <BaseMap />
      </div>
    );
  },
  {
    onRedirecting() {
      return <PageLoader />;
    },
  },
);
