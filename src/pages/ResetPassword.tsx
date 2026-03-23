import React from "react";
// first, input email. second, acess reset link by mail.
function ResetPassword() {
  return (
    <div className="flex justify-center size-full items-center">
      <div className="bg-white rounded-[20px] w-[1000px] h-[700px] p-[10px] border flex flex-col items-center gap-[10px]">
        <form action="" className="p-5 size-full text-center border-b">
          <div className="w-full flex-col flex items-center justify-center px-[250px] py-[55px] ">
            <h1 className="font-['Inter:Regular',sans-serif] font-normal text-[31px] text-black text-center whitespace-nowrap mb-10">Reset Password</h1>
            <p className="text-sm">Enter your email to reset your password</p>
          </div>
          <div className="flex flex-col gap-3 justify-center items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-1 border text-center rounded-xl w-64"
            />
            <input
              type="password"
              placeholder="New password"
              className="p-1 border text-center rounded-xl w-64"
            />
            <input
              type="password"
              placeholder="Confirm password"
              className="p-1 border text-center rounded-xl w-64"
            />
          </div>
          <div className="p-5">
            <button
              className="border p-1 w-40 h-10 rounded-xl bg-white-300 hover:bg-gray-400 mt-5"
              type="submit"
            >
              Reset Password
            </button>
          </div>
        </form>
        <div className="my-5">
          <button className="p-1 underline my-auto" type="button">
            &ensp;Back to Login&ensp;
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
