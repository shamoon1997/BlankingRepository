export const AreaSummary = () => {
  return (
    <div className="border-b-solid border-b-[0.5px] border-b-[#D9D9D9]  pb-4 pl-4 pr-4">
      <p className="mb-4 font-semibold text-[#161616]">Area Summary</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        <p className="text-primary flex  justify-between text-xs font-semibold">
          <p>Total devices</p>
          <p>49</p>
        </p>

        <p className="text-primary flex justify-between text-xs font-semibold">
          <p>Alert</p>
          <p>2</p>
        </p>

        <p className="text-primary flex justify-between text-xs font-semibold">
          <p>Online</p>
          <p>40</p>
        </p>

        <p className="text-primary flex justify-between text-xs font-semibold">
          <p>Lora</p>
          <p>34</p>
        </p>

        <p className="text-primary flex justify-between text-xs font-semibold">
          <p>Offline</p>
          <p>23</p>
        </p>

        <p className="text-primary flex justify-between text-xs font-semibold">
          <p>Cellular</p>
          <p>35</p>
        </p>
      </div>
    </div>
  );
};
