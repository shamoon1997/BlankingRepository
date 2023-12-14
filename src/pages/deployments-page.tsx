import { BaseMap, PageLoader } from "@/components";
import Header from "@/components/header/header";
import { ViewStateChangeEvent } from "react-map-gl";
import { FilterArea } from "@/components/filters";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useMemo, useState } from "react";
import { useGetNetworkLayer } from "@/api/hooks/maps/use-get-network-layer.ts";
import { CommonLayerPostBody } from "@/api/types/types.ts";
import debounce from "lodash/debounce";
import mapboxgl from "mapbox-gl";
import { useMapUrlState } from "@/hooks";

export const DeploymentPage = withAuthenticationRequired(
  () => {
    const { searchParams, setSearchParams, validatedMapUrlState } =
      useMapUrlState();

    const [bbox, setBbox] = useState<CommonLayerPostBody | null>(null);

    // network calls for all the layers
    const { dataWithLagBuffer, isError, isLoading, isRefetching, isSuccess } =
      useGetNetworkLayer(bbox);

    const setDebouncedBbox = useMemo(
      () =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        debounce(
          (e: mapboxgl.MapboxEvent<undefined> | ViewStateChangeEvent) => {
            const bounds = e.target.getBounds();
            const northWest = bounds.getNorthWest();
            const southEast = bounds.getSouthEast();

            setBbox({
              lat1: northWest.lat,
              lon1: northWest.lng,
              lat2: southEast.lat,
              lon2: southEast.lng,
            });
          },
          600,
        ),
      [],
    );

    return (
      <div className="flex h-screen w-full flex-1 flex-col">
        {/* NAVBAR */}
        <Header heading="Deployment" />

        <div className="flex flex-1 overflow-auto">
          <FilterArea dataWithLagBuffer={dataWithLagBuffer} />
          <div className="relative w-full">
            <BaseMap
              setDebouncedBbox={setDebouncedBbox}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              validatedMapUrlState={validatedMapUrlState}
              dataWithLagBuffer={dataWithLagBuffer}
              isLoading={isLoading}
              isError={isError}
              isRefetching={isRefetching}
              isSuccess={isSuccess}
            />
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
