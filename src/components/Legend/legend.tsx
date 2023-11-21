function Legend() {
  return (
    <div className="max-w-150 max-h-117 absolute bottom-12 right-10">
      <div className="h-117 w-full flex-shrink-0 rounded-md border border-solid border-gray-500 border-opacity-50 bg-white shadow-md">
        <div className="flex flex-col gap-1.5 p-4">
          <div className="flex items-center justify-evenly">
            <div className="h-2 w-2 rounded-full bg-gray-700" />

            <div className="font-mont text-sm font-normal leading-normal tracking-tighter text-gray-900">
              Undetermined
            </div>
          </div>

          <div className="flex items-center justify-evenly">
            <div className="h-2 w-2 rounded-full bg-purple-700" />

            <div className="font-mont text-sm font-normal leading-normal tracking-tighter text-gray-900">
              To be investigated
            </div>
          </div>

          <div className="flex items-center justify-evenly">
            <div className="h-2 w-2 rounded-full bg-red-600" />
            <div className="font-mont text-sm font-normal leading-normal tracking-tighter text-gray-900">
              To-do
            </div>
          </div>

          <div className="flex items-center justify-evenly">
            <div className="h-2 w-2 rounded-full bg-yellow-400" />
            <div className="font-mont text-sm font-normal leading-normal tracking-tighter text-gray-900">
              In-progress
            </div>
          </div>

          <div className="flex justify-center">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <div className="font-mont text-sm font-normal leading-normal tracking-tighter text-gray-900">
              Reported To Customer
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Legend;
