import { Tabs, Box, Text } from "@radix-ui/themes";

function MapPopup() {
  return (
    <div className="flex w-1/4 flex-col gap-0 bg-gray-500">
      <div className="relative h-full">
        <img
          src="/images/popup.png"
          alt="Your Image Alt Text"
          className="h-full w-full object-cover"
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

      <div className="flexp-4 mb-4">
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
      <div className="mx-auto mt-8 w-full">
        <Tabs.Root
          defaultValue="account"
          className="w-full  overflow-hidden rounded-md "
        >
          <Tabs.List className="flex w-full justify-center p-2">
            <Tabs.Trigger
              value="test"
              className="cursor-pointer border-b-2 border-transparent px-4 py-2 hover:border-blue-500"
            >
              <p>Account</p>
            </Tabs.Trigger>
            {/* <Tabs.Trigger
              value="documents"
              className="cursor-pointer border-b-2 border-transparent px-4 py-2 hover:border-blue-500"
            >
              test
            </Tabs.Trigger>
            <Tabs.Trigger
              value="settings"
              className="cursor-pointer border-b-2 border-transparent px-4 py-2 hover:border-blue-500"
            >
              Settings
            </Tabs.Trigger> */}
          </Tabs.List>

          {/* <Box px="4" pt="3" pb="2">
            <Tabs.Content value="account" className="text-gray-700">
              <Text size="2">
                <div className="flex justify-between">
                  <div>
                    <p>as</p>
                  </div>
                  <div>
                    <p>asd</p>
                  </div>
                </div>
              </Text>
            </Tabs.Content>

            <Tabs.Content value="documents" className="text-gray-700">
              <Text size="2">Access and update your documents.</Text>
            </Tabs.Content>

            <Tabs.Content value="settings" className="text-gray-700">
              <Text size="2">
                Edit your profile or update contact information.
              </Text>
            </Tabs.Content>
          </Box> */}
        </Tabs.Root>
      </div>
    </div>
  );
}

export default MapPopup;
