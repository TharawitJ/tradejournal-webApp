
export default function ConfirmResetPW() {
  return (
    <div className="flex justify-center size-full items-center">
      {/* Background with image overlay */}
      <div aria-hidden="true" className="flex justify-center pointer-events-none">
        <div className=" flex justify-center bg-[#c9c9c9]" />
        {/* <img 
          alt="" 
          className="absolute max-w-none object-cover opacity-30 size-full" 
          src={imgRootResetPassword} 
        /> */}
      </div>

      {/* Main content card */}
      <div className="bg-white rounded-[20px] w-70% h-60%0 p-[10px] border flex flex-col items-center gap-[10px]">
        
        {/* Header - Reset Password */}
        <div className="w-full flex items-center justify-center px-[250px] py-[95px]">
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[31px] text-black text-center whitespace-nowrap">
            Reset Password
          </p>
        </div>

        {/* Input field - Username or Email */}
        <div className="w-full flex items-center justify-center h-[76px]">
          <input className="font-['Inter:Regular',sans-serif] font-normal text-[28px] text-[#000000] text-center whitespace-nowrap w-[600px] h-[60px] rounded-[8px] border border-black border-solid flex items-center justify-center size-full px-[12px] py-[6px]" placeholder="Username or Email">
          </input>
        </div>

        {/* Spacer to push button down */}
        <div className="flex-1" />

        {/* Confirm button */}
        <div className="w-full flex items-center justify-center pb-[20px]">
          <button className="hover:bg-cyan-300 flex items-center justify-center px-[50px] py-[20px] mb-[70px] w-[300px] rounded-[20px] border border-black border-solid">
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[31px] text-black text-center whitespace-nowrap">
                Confirm
              </p>
          </button>
        </div>

      </div>
    </div>
  );
}
