import { PageLoader } from "@/components";
import Header from "@/components/header/header";
import PoleViewTabGroup from "@/components/pole-view/pole-view-tab-group";
import { FilterArea } from "@/components/filters/filter-area";
import { withAuthenticationRequired } from "@auth0/auth0-react";

export const PoleViewPage = withAuthenticationRequired(
  () => {
    return (
      <div className="flex h-screen w-full flex-1 flex-col">
        <Header heading="Deployment" />

        <div className="flex ">
          <FilterArea />
          <PoleViewTabGroup />
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
