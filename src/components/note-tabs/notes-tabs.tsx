type NotesTabProps = {
  vegetationNotes: string;
  installationNotes: string;
};

const NoteTabs = ({ vegetationNotes, installationNotes }: NotesTabProps) => {
  return (
    <div className="mt-[10px] w-full">
      <div className="relative flex">
        <div className="w-full">
          <div className="overflow-x-auto overflow-y-hidden">
            <div className="mt-4 flex w-full justify-between gap-[30px] border-t-[1px] border-solid border-[#D9D9D9] pr-[248px]">
              <div className="relative whitespace-nowrap py-[11px] font-mont text-xs font-semibold leading-normal tracking-[-0.6px] text-[#628FEE] ">
                Vegetation Notes
              </div>
              <div className="relative whitespace-nowrap py-[11px] font-mont text-xs font-semibold leading-normal tracking-[-0.6px] text-[#628FEE] ">
                Installation Notes
              </div>
            </div>
          </div>

          <div className="font-mont text-xs font-normal leading-[normal] tracking-[-0.6px] text-[#161616]">
            {vegetationNotes}
          </div>

          <div className="font-mont text-xs font-normal leading-[normal] tracking-[-0.6px] text-[#161616]">
            {installationNotes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteTabs;
