import React from 'react';

const InputGroup = ({ 
  label, 
  placeholder, 
  type = 'text' 
}: { 
  label: string; 
  placeholder: string; 
  type?: string; 
}) => (
  <div className="flex flex-col items-center justify-end w-[100%]">
    <label className="text-[31px] text-black font-normal text-center w-[100%] mb-[8%]">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-[100%] border border-[#cac4d0] rounded-[8px] py-[6%] px-[4%] text-[24px] text-[#777272] text-center placeholder:text-[#777272] focus:outline-none focus:border-gray-500 bg-white"
    />
  </div>
);

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center w-[100%] min-h-[100vh] bg-[#c9c9c9] p-[5%]">
      <div className="bg-white rounded-[20px] w-[80%] flex flex-col p-[6%] justify-between gap-[8%]">
        
        <h1 className="text-[64px] text-black font-normal text-center w-[100%] m-[0%]">
          Register
        </h1>

        <div className="grid grid-cols-3 w-[100%] gap-y-[10%] gap-x-[5%] items-end">
          <InputGroup label="Username" placeholder="Username is require" />
          <InputGroup label="Email" placeholder="Email is require" type="email" />
          <InputGroup label="Start Fund" placeholder="Start Fund is optional" />

          <InputGroup label="Password" placeholder="Password is require" type="password" />
          <InputGroup label="Confirm Password" placeholder="Confirm Password is require" type="password" />

          <div className="flex flex-col items-center justify-end w-[100%] h-[100%]">
            <button className="border border-black rounded-[20px] w-[30%] py-[2%] mt-[0%] text-[31px] text-black font-normal text-center hover:bg-gray-100 transition-colors cursor-pointer">
              Clear
            </button>
          </div>
        </div>

        <div className="flex justify-center w-[100%] mt-[8%]">
          <button className="border border-black rounded-[20px] w-[20%] py-[1%] text-[31px] text-black font-normal text-center hover:bg-gray-100 transition-colors cursor-pointer">
            Confirm
          </button>
        </div>

      </div>
    </div>
  );
}
