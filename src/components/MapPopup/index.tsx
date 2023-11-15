import * as Tabs from "@radix-ui/react-tabs";

function MapPopup() {
  const tabs = ["overview", "Per-Blob", "High-res", "Audio", "Frequency"];

  return (
    <div className="flex w-1/3 flex-col gap-0 bg-yellow-500">
      <div className="relative h-full">
        <img
          src="/images/popup.png"
          alt="Your Image Alt Text"
          className="h-50 w-full object-cover"
        />
      </div>
      <div className="mb-4 flex  p-4">
        <div className="flex w-1/2 justify-between">
          <div>
            <span className="px-2 py-1 text-left font-mont text-base font-bold leading-5 text-gray-700">
              Pole
            </span>
          </div>
          <div>
            <span className="px-2 py-1 text-left font-mont text-base font-bold leading-5 text-gray-700">
              1533. GS6
            </span>
          </div>
        </div>
        <div className="flex w-1/2 justify-end">
          <span>
            <img
              src="/icons/maps.svg"
              alt="maps"
              className="h-full w-full object-cover"
            />
          </span>
        </div>
      </div>

      <div className="mb-4 flex p-4">
        <div className="flex">
          <span className="h-5 w-5 rounded-full">
            <img
              src="/icons/offline.svg"
              alt="maps"
              className="h-full w-full object-cover"
            />
          </span>
          <span className="px-2 py-1 text-left text-xs font-semibold leading-3 tracking-tight text-gray-900">
            Offline
          </span>
        </div>
      </div>
      <div className="mx-auto mb-8 w-full">
        <Tabs.Root defaultValue="overview">
          <div className="">
            <Tabs.List className="ml-4 mr-4 flex justify-between">
              {tabs.map((tab) => {
                return <Tabs.Trigger value={tab}>{tab}</Tabs.Trigger>;
              })}
            </Tabs.List>
            <div className="w-292 border-t-0.5 h-0.5 border-gray-700 bg-gray-300" />
          </div>

          <div className="mt-8">
            <Tabs.Content value="overview">
              <div>
                <div className="flex flex-col">
                  <div className="mx-4 mb-2 flex justify-between">
                    <div className="text-10">Pole</div>
                    <div className="text-10 ">
                      1f0010000c503041503041500c503
                    </div>
                  </div>
                  <div className="mx-4 mb-2 flex justify-between">
                    <div className="text-10">Serial </div>
                    <div className="text-10 mr-40">GS00000526</div>
                  </div>

                  <div className="mx-4 mb-2 flex justify-between">
                    <div className="text-10">Deployment</div>
                    <div className="text-10 mr-36">Birmingham City</div>
                  </div>

                  <div className="mx-4 mb-2 flex justify-between">
                    <div className="text-10">Circuit</div>
                    <div className="text-10 mr-52">20123</div>
                  </div>

                  <div className="mx-4 mb-2 flex justify-between">
                    <div className="text-10">Network</div>
                    <div className="text-10 mr-56">Jazz</div>
                  </div>

                  <div className="mx-4 mb-2 flex justify-between">
                    <div className="text-10">Last seen</div>
                    <div className="text-10 mr-24">6/15/2023 9:50:55 AM</div>
                  </div>

                  <div className="w-292 border-t-0.5 h-0.5 border-gray-700 bg-gray-300" />

                  <div className="mb-8 mt-8 flex flex-col">
                    <div className="mx-4 mb-2 flex ">
                      <div className="flex">
                        <img src="/icons/location.svg" alt="" />
                      </div>
                      <div className="ml-4">Open in Google Map</div>
                    </div>

                    <div className="mx-4 mb-2 flex">
                      <div className="flex">
                        <img src="/icons/settings.svg" alt="" />
                      </div>
                      <div className="ml-4">
                        Insulators, Transformers, Conductors
                      </div>
                    </div>
                  </div>

                  <div className="w-292 border-t-0.5 h-0.5 border-gray-700 bg-gray-300" />
                  <div className="mb-8 mt-8 flex flex-col">
                    <div className="mx-4 mb-2 flex flex-col">
                      <div className="flex">Vegetarian</div>
                      <div className="mt-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sunt itaque recusandae excepturi. Dicta repellat
                        deserunt totam dolor cum inventore culpa.
                      </div>
                    </div>
                  </div>

                  <div className="w-292 border-t-0.5 h-0.5 border-gray-700 bg-gray-300" />
                  <div className="m-4 mb-4 flex">
                    <div className="flex flex-col">
                      <div>Notes</div>
                      <div className="mt-2">
                        <img src="/icons/notes.svg" alt="" />
                      </div>
                    </div>
                    <div>
                      <div className="mt-8">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Debitis perferendis hic aperiam modi obcaecati
                        facere aliquam vero veniam culpa quasi!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="Per-Blob">
              <p>Access and update your documents.</p>
            </Tabs.Content>

            <Tabs.Content value="High-res">
              <p>Edit your profile or update contact information.</p>
            </Tabs.Content>
          </div>
        </Tabs.Root>
      </div>
    </div>
  );
}

export default MapPopup;
