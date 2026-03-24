import { useState } from "react";
import { NavLink } from "react-router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.SubmitEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { username, password });
  };

  const handleRegister = () => {
    // Handle register logic here
    console.log("Register clicked");
  };

  const handleResetPassword = () => {
    // Handle reset password logic here
    console.log("Reset password clicked");
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#c9c9c9] p-[5%] font-sans">
      <div className="bg-white border-2 border-black rounded-[2rem] w-full sm:w-[80%] md:w-[60%] lg:w-[45%] xl:w-[40%] p-[6%] flex flex-col items-center gap-6 sm:gap-8">
        <input
          type="text"
          placeholder="Username"
          className="w-full border border-[#cac4d0] rounded-lg p-[3%] sm:p-[4%] text-center text-lg sm:text-xl text-[#777272] outline-none focus:ring-2 focus:ring-[#cac4d0] transition-shadow"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-[#cac4d0] rounded-lg p-[3%] sm:p-[4%] text-center text-lg sm:text-xl text-[#777272] outline-none focus:ring-2 focus:ring-[#cac4d0] transition-shadow"
        />

        <button className="w-full bg-[#c7f9ff] border border-[#2c2c2c] rounded-lg p-[3%] sm:p-[4%] text-xl sm:text-2xl text-black hover:bg-[#b0f0f8] transition-colors">
          Login
        </button>
        <NavLink to="/reset_password">
          <button className="text-black text-sm sm:text-base hover:underline my-[2%]">
            reset password
          </button>
        </NavLink>

        <hr className="w-full border-t border-[#C2C2C2]" />

        <NavLink to="/register">
          <button className="w-[full] bg-[rgba(99,157,170,0.65)] rounded-lg p-[15%]  text-xl  text-black hover:bg-[rgba(99,157,170,0.8)] transition-colors">
            Register
          </button>
        </NavLink>
      </div>
    </div>
  );
}
