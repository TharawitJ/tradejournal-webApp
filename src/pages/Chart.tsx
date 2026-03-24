function Frame1() {
  return <div className="bg-[#e9ed7d] w-[82px] h-full" />;
}

function Frame() {
  return (
    <div className="flex items-center gap-4 overflow-clip">
      <Frame1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic text-[30px] text-black whitespace-nowrap">Tharawit</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic text-[17px] text-black whitespace-nowrap ml-auto">Log Out</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-white flex shrink-0 border border-black border-solid">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[10px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic shrink-0 text-[31px] text-black whitespace-nowrap">Record Journal</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-center justify-between overflow-clip px-2 shrink-0 w-[90%]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic shrink-0 text-[31px] text-black whitespace-nowrap">Asset</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic shrink-0 text-[31px] text-black whitespace-nowrap">Assets List</p>
      <Frame2 />
    </div>
  );
}

function Frame3() {
  return <div className="bg-white h-[70%] shrink-0 w-[90%]" />;
}

export default function ChartIndex() {
  return (
    <div className="bg-[#c9c9c9] content-stretch flex flex-col gap-[30px] items-center pb-[30px] w-full h-full" data-name="Chart : Index">
      <div className="bg-[#a8a8a8] h-[25%] overflow-clip shrink-0 w-full flex flex-col justify-between py-4 px-8">
        <Frame />
        <div className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic text-[31px] text-black whitespace-nowrap flex justify-center gap-8" data-name="Home | Chart | Dashboard | Journal | Help">
          <p>Home</p>
          <p>Chart</p>
          <p>Journal</p>
          <p>Dashboard</p>
          <p>Help</p>
        </div>
      </div>
      <Frame4 />
      <Frame3 />
    </div>
  );
}