import * as Tabs from "@radix-ui/react-tabs";
import { MapsIcon, LocationIcon, SettingIcon } from "@/assets/pole-view";

function MapPopup() {
  const tabs = ["overview", "Per-Blob", "High-res", "Audio", "Frequency"];

  return (
    <div className="ml-10 mt-10 flex w-full max-w-[292px] flex-col gap-0 rounded-sm bg-white shadow-pole-view">
      <div className="relative flex h-[214px] items-center justify-center">
        <img
          src="/images/popup.png"
          alt="Your Image Alt Text"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col items-start gap-2.5 px-5 pb-2.5 pt-3.5">
        <div className="flex w-full justify-between">
          <div className="flex gap-1">
            <div className="min-w-[38px] font-mont text-sm font-semibold leading-normal text-[#5B5B5B]">
              Pole
            </div>
            <div className="font-mont text-sm font-normal leading-normal text-[#5B5B5B]">
              1533. GS526
            </div>
          </div>
          <div className="mt-[-5px] flex items-center justify-center">
            <MapsIcon className="text-blue-400" />
          </div>
        </div>
        <div className="inline-flex items-center gap-[5px] py-1">
          <div className="mt-px h-2 w-2 shrink-0 rounded-full bg-[#DF4C2B]" />
          <div className="font-m text-[10px] font-normal leading-normal tracking-[-0.5px] text-[#161616]">
            Offline
          </div>
        </div>
      </div>
      <div className="mx-auto mb-8 w-full">
        <Tabs.Root defaultValue="overview">
          <Tabs.List className="flex gap-3.5 overflow-x-auto border-b border-solid border-[#d9d9d9] px-6">
            {tabs.map((tab) => {
              return (
                <Tabs.Trigger
                  key={tab}
                  value={tab}
                  className="whitespace-nowrap border-b border-solid border-transparent py-[7px] font-mont text-[8px] font-normal leading-[100%] text-[#5B5B5B] data-[state=active]:border-[#628fee] data-[state=active]:text-[#628fee]"
                >
                  {tab}
                </Tabs.Trigger>
              );
            })}
          </Tabs.List>

          <Tabs.Content value="overview">
            <div className="border-b border-solid border-[#d9d9d9] p-5">
              <div className="flex flex-col gap-2.5">
                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Pole
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    1f0010000c503041503041500c5
                  </div>
                </div>
                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Serial{" "}
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    GS00000526
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Deployment
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    Birmingham City
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Circuit
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    20123
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Network
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    Jazz
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Last seen
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    6/15/2023 9:50:55 AM
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b border-solid border-[#d9d9d9] p-5">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-[5px]">
                  <div className="flex h-3 w-3 items-center justify-center">
                    <LocationIcon />
                  </div>
                  <div className="font-mont text-[10px] font-normal capitalize leading-normal text-[#5B5B5B] underline">
                    Open in Google Map
                  </div>
                </div>

                <div className="flex items-center gap-[5px]">
                  <div className="flex h-3 w-3 items-center justify-center">
                    <SettingIcon />
                  </div>
                  <div className="font-mont text-[10px] font-normal leading-normal text-[#5B5B5B]">
                    Insulators, Transformers, Conductors
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b border-solid border-[#d9d9d9] p-5">
              <div className="flex flex-col gap-[3px]">
                <div className="font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                  Vegetarian
                </div>
                <div className="font-mont text-[10px] font-normal leading-normal text-[#5B5B5B]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                  itaque recusandae excepturi. Dicta repellat deserunt totam
                  dolor cum inventore culpa.
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="flex flex-col gap-0.5">
                <div className="font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                  Notes
                </div>
                <div className="flex gap-[11px]">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D9D9D9] font-mont text-[10px] font-semibold leading-normal text-black">
                    KC
                  </div>
                  <div className="font-mont text-[10px] font-normal leading-normal text-[#5B5B5B]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Debitis perferendis hic aperiam modi obcaecati facere
                    aliquam vero veniam culpa quasi!
                  </div>
                </div>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="Per-Blob">
            <div className="border-b border-solid border-[#d9d9d9] p-5">
              <div className="flex flex-col gap-2.5">
                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Pole
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    1f0010000c503041503041500c5
                  </div>
                </div>
                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Serial{" "}
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    GS00000526
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Deployment
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    Birmingham City
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Circuit
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    20123
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Network
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    Jazz
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Last seen
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    6/15/2023 9:50:55 AM
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b border-solid border-[#d9d9d9] p-5">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-[5px]">
                  <div className="flex h-3 w-3 items-center justify-center">
                    <LocationIcon />
                  </div>
                  <div className="font-mont text-[10px] font-normal capitalize leading-normal text-[#5B5B5B] underline">
                    Open in Google Map
                  </div>
                </div>

                <div className="flex items-center gap-[5px]">
                  <div className="flex h-3 w-3 items-center justify-center">
                    <SettingIcon />
                  </div>
                  <div className="font-mont text-[10px] font-normal leading-normal text-[#5B5B5B]">
                    Insulators, Transformers, Conductors
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b border-solid border-[#d9d9d9] p-5">
              <div className="flex flex-col gap-[3px]">
                <div className="font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                  Vegetarian
                </div>
                <div className="font-mont text-[10px] font-normal leading-normal text-[#5B5B5B]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                  itaque recusandae excepturi. Dicta repellat deserunt totam
                  dolor cum inventore culpa.
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="flex flex-col gap-0.5">
                <div className="font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                  Notes
                </div>
                <div className="flex gap-[11px]">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D9D9D9] font-mont text-[10px] font-semibold leading-normal text-black">
                    KC
                  </div>
                  <div className="font-mont text-[10px] font-normal leading-normal text-[#5B5B5B]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Debitis perferendis hic aperiam modi obcaecati facere
                    aliquam vero veniam culpa quasi!
                  </div>
                </div>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="High-res">
            <div className="border-b border-solid border-[#d9d9d9] p-5">
              <div className="flex flex-col gap-2.5">
                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Pole
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    1f0010000c503041503041500c5
                  </div>
                </div>
                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Serial{" "}
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    GS00000526
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Deployment
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    Birmingham City
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Circuit
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    20123
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Network
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    Jazz
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Last seen
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    6/15/2023 9:50:55 AM
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b border-solid border-[#d9d9d9] p-5">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-[5px]">
                  <div className="flex h-3 w-3 items-center justify-center">
                    <LocationIcon />
                  </div>
                  <div className="font-mont text-[10px] font-normal capitalize leading-normal text-[#5B5B5B] underline">
                    Open in Google Map
                  </div>
                </div>

                <div className="flex items-center gap-[5px]">
                  <div className="flex h-3 w-3 items-center justify-center">
                    <SettingIcon />
                  </div>
                  <div className="font-mont text-[10px] font-normal leading-normal text-[#5B5B5B]">
                    Insulators, Transformers, Conductors
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b border-solid border-[#d9d9d9] p-5">
              <div className="flex flex-col gap-[3px]">
                <div className="font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                  Vegetarian
                </div>
                <div className="font-mont text-[10px] font-normal leading-normal text-[#5B5B5B]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                  itaque recusandae excepturi. Dicta repellat deserunt totam
                  dolor cum inventore culpa.
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="flex flex-col gap-0.5">
                <div className="font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                  Notes
                </div>
                <div className="flex gap-[11px]">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D9D9D9] font-mont text-[10px] font-semibold leading-normal text-black">
                    KC
                  </div>
                  <div className="font-mont text-[10px] font-normal leading-normal text-[#5B5B5B]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Debitis perferendis hic aperiam modi obcaecati facere
                    aliquam vero veniam culpa quasi!
                  </div>
                </div>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="Audio">
            <div className="border-b border-solid border-[#d9d9d9] p-5">
              <div className="flex flex-col gap-2.5">
                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Pole
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    1f0010000c503041503041500c5
                  </div>
                </div>
                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Serial{" "}
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    GS00000526
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Deployment
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    Birmingham City
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Circuit
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    20123
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Network
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    Jazz
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Last seen
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    6/15/2023 9:50:55 AM
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b border-solid border-[#d9d9d9] p-5">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-[5px]">
                  <div className="flex h-3 w-3 items-center justify-center">
                    <LocationIcon />
                  </div>
                  <div className="font-mont text-[10px] font-normal capitalize leading-normal text-[#5B5B5B] underline">
                    Open in Google Map
                  </div>
                </div>

                <div className="flex items-center gap-[5px]">
                  <div className="flex h-3 w-3 items-center justify-center">
                    <SettingIcon />
                  </div>
                  <div className="font-mont text-[10px] font-normal leading-normal text-[#5B5B5B]">
                    Insulators, Transformers, Conductors
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b border-solid border-[#d9d9d9] p-5">
              <div className="flex flex-col gap-[3px]">
                <div className="font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                  Vegetarian
                </div>
                <div className="font-mont text-[10px] font-normal leading-normal text-[#5B5B5B]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                  itaque recusandae excepturi. Dicta repellat deserunt totam
                  dolor cum inventore culpa.
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="flex flex-col gap-0.5">
                <div className="font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                  Notes
                </div>
                <div className="flex gap-[11px]">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D9D9D9] font-mont text-[10px] font-semibold leading-normal text-black">
                    KC
                  </div>
                  <div className="font-mont text-[10px] font-normal leading-normal text-[#5B5B5B]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Debitis perferendis hic aperiam modi obcaecati facere
                    aliquam vero veniam culpa quasi!
                  </div>
                </div>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="Frequency">
            <div className="border-b border-solid border-[#d9d9d9] p-5">
              <div className="flex flex-col gap-2.5">
                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Pole
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    1f0010000c503041503041500c5
                  </div>
                </div>
                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Serial{" "}
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    GS00000526
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Deployment
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    Birmingham City
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Circuit
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    20123
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Network
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    Jazz
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="min-w-[62px] font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                    Last seen
                  </div>
                  <div className="text-left font-mont text-[10px] font-normal leading-normal text-[#474747]">
                    6/15/2023 9:50:55 AM
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b border-solid border-[#d9d9d9] p-5">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-[5px]">
                  <div className="flex h-3 w-3 items-center justify-center">
                    <LocationIcon />
                  </div>
                  <div className="font-mont text-[10px] font-normal capitalize leading-normal text-[#5B5B5B] underline">
                    Open in Google Map
                  </div>
                </div>

                <div className="flex items-center gap-[5px]">
                  <div className="flex h-3 w-3 items-center justify-center">
                    <SettingIcon />
                  </div>
                  <div className="font-mont text-[10px] font-normal leading-normal text-[#5B5B5B]">
                    Insulators, Transformers, Conductors
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b border-solid border-[#d9d9d9] p-5">
              <div className="flex flex-col gap-[3px]">
                <div className="font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                  Vegetarian
                </div>
                <div className="font-mont text-[10px] font-normal leading-normal text-[#5B5B5B]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                  itaque recusandae excepturi. Dicta repellat deserunt totam
                  dolor cum inventore culpa.
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="flex flex-col gap-0.5">
                <div className="font-mont text-[10px] font-semibold leading-normal text-[#5B5B5B]">
                  Notes
                </div>
                <div className="flex gap-[11px]">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D9D9D9] font-mont text-[10px] font-semibold leading-normal text-black">
                    KC
                  </div>
                  <div className="font-mont text-[10px] font-normal leading-normal text-[#5B5B5B]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Debitis perferendis hic aperiam modi obcaecati facere
                    aliquam vero veniam culpa quasi!
                  </div>
                </div>
              </div>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}

export default MapPopup;
