import React from "react";

function Login() {
  return (
    <div className="p-5 bg-amber-200 text-center text-amber-900">
      <form action="" className="p-5 bg-amber-200 text-center">
        <div className="flex flex-col gap-3 justify-center items-center">
          <input type="text" placeholder="username" className="p-1 border text-center rounded-xl" />
          <input type="text" placeholder="password" className="p-1 border text-center rounded-xl" />
        </div>
        <div className="p-5 border-b">
          <button className="border p-1 w-30 rounded-xl" type="submit">Login</button>
        </div>
      </form>
      <div>
        <button className="p-1 underline"  type="button">&ensp;Register&ensp; </button>
      </div>
    </div>
  );
}

export default Login;
