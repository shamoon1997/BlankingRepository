import { PageLoader } from "@/components";
import Header from "@/components/header/header";
import PoleViewTabGroup from "@/components/pole-view/pole-view-tab-group";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { FallBackPage } from "@/pages/fall-back-page.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { AreaSummary } from "@/components/filters/filter-area/area-summary.tsx";
import { ListSorter } from "@/components/filters/filter-area/list-sorter.tsx";
import { PolesList } from "@/components/filters/filter-area/poles-list.tsx";
import { PoleMiniFilter } from "@/components/filters/filter-area/pole-mini-filter.tsx";
import { MiniBaseMap } from "@/components/map";
import { useMiniFilter } from "@/hooks/mini-side-filter";
import { useState } from "react";
import { TimeField } from "@/components/filters/calendar/time-field";
import { useReadFromTo } from "@/hooks/calendar";
import { DateField } from "@/components/filters/calendar/date-field";

export const PoleViewPage = withAuthenticationRequired(
  () => {
    const {
      sortBy,
      setSortOrder,
      setSortBy,
      sortOrder,
      isError,
      isSuccess,
      data,
    } = useMiniFilter();
    const fromTo = useReadFromTo();

    const [showCalendar, setShowCalendar] = useState(false);
    console.log(fromTo);

    return (
      <div className="flex h-screen w-full flex-1 flex-col bg-[#EDEDED]">
        <Header heading="Pole View" />
        <ErrorBoundary FallbackComponent={FallBackPage}>
          <div className="mx-6  mt-5 flex flex-1 gap-[15px] overflow-hidden">
            <div className="mb-5 flex w-[300px] shrink-0 flex-col overflow-hidden rounded-[5px] bg-white shadow-tab">
              <PoleMiniFilter
                isCalendarActive={showCalendar}
                onCalendarButtonClick={() => setShowCalendar(!showCalendar)}
              />
              <div
                className={
                  "mini-map-container relative mb-2 h-[200px] w-full shrink-0 border-b-[0.5px] border-t-[0.5px] border-b-[#BFBFBF] border-t-[#BFBFBF]"
                }
              >
                <MiniBaseMap />
                {showCalendar && (
                  <div
                    className={
                      "relative z-50 h-full w-full bg-white bg-opacity-95"
                    }
                  >
                    <div
                      className={
                        "flex w-full items-end justify-center gap-[10px] px-[9px] py-[20px]"
                      }
                    >
                      <DateField
                        granularity={"day"}
                        value={fromTo.fromInAriaFormat}
                        label={"From"}
                        hideTimeZone={true}
                        shouldForceLeadingZeros
                      />
                      <TimeField
                        value={fromTo.fromInAriaFormat}
                        aria-label={"label"}
                        shouldForceLeadingZeros
                        hideTimeZone={true}
                        hourCycle={12}
                        granularity={"minute"}
                        onChange={(v) => {
                          console.log(v);
                        }}
                      />

                      <DateField
                        granularity={"day"}
                        value={fromTo.toInAriaFormat}
                        label={"To"}
                        hideTimeZone={true}
                        shouldForceLeadingZeros
                      />
                      <TimeField
                        value={fromTo.toInAriaFormat}
                        aria-label={"label"}
                        shouldForceLeadingZeros
                        hideTimeZone={true}
                        hourCycle={12}
                        granularity={"minute"}
                        onChange={(v) => {
                          console.log(v);
                        }}
                      />
                    </div>
                    <p
                      className={
                        "text-center font-mont text-[9px] text-[#5283ED]"
                      }
                    >
                      Default Options
                    </p>
                  </div>
                )}
              </div>

              <AreaSummary data={data} />
              <ListSorter
                sortBy={sortBy}
                setSortBy={setSortBy}
                setSortOrder={setSortOrder}
                sortingOrder={sortOrder}
              />
              <PolesList
                data={data}
                sortBy={sortBy}
                sortingOrder={sortOrder}
                isSuccess={isSuccess}
                isError={isError}
              />
            </div>

            <div className="flex-1">
              <PoleViewTabGroup />
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
