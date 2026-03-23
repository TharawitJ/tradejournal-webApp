import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.SubmitEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { username, password });
  };

  const handleRegister = () => {
    // Handle register logic here
    console.log('Register clicked');
  };

  const handleResetPassword = () => {
    // Handle reset password logic here
    console.log('Reset password clicked');
  };

  return (
    <div className="content-stretch flex flex-col min-h-screen items-center justify-center px-4 py-8 relative w-full" data-name="Root Login">
      {/* Background with image overlay */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#c9c9c9] inset-0" />
        {/* Background */}
        {/* <img alt="" className="absolute max-w-none object-cover opacity-30 size-full" /> */}
      </div>

      {/* Login form card */}
      <div className="bg-white relative rounded-[35px] w-full max-w-[687px] z-10">
        <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
          <form onSubmit={handleLogin} className="content-stretch flex flex-col gap-[36px] items-center justify-center px-[30px] py-[34px] relative w-full">
            
            {/* Username input */}
            <div className="relative w-full max-w-[627px]">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full h-[50px] px-[12px] py-[6px] rounded-[8px] border border-[#cac4d0] font-['Inter:Regular',sans-serif] text-[24px] text-[#777272] placeholder:text-[#777272] focus:outline-none focus:border-[#2c2c2c] transition-colors"
              />
            </div>

            {/* Password input */}
            <div className="relative w-full max-w-[627px]">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full h-[50px] px-[12px] py-[6px] rounded-[8px] border border-[#cac4d0] font-['Inter:Regular',sans-serif] text-[24px] text-[#777272] placeholder:text-[#777272] focus:outline-none focus:border-[#2c2c2c] transition-colors"
              />
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="bg-[#c7f9ff] h-[45px] w-full max-w-[627px] rounded-[8px] border border-[#2c2c2c] font-['Inter:Regular',sans-serif] text-[25px] text-black hover:bg-[#b0e8ef] transition-colors"
            >
              Login
            </button>

            {/* Reset password link */}
            <button
              type="button"
              onClick={handleResetPassword}
              className="font-['Inter:Regular',sans-serif] text-[15px] text-black hover:underline transition-all"
            >
              reset password
            </button>

            {/* Divider line */}
            <div className="h-0 w-full max-w-[627px]">
              <div className="relative">
                <svg className="block w-full h-[1px]" fill="none" preserveAspectRatio="none" viewBox="0 0 627 1">
                  <line stroke="#C2C2C2" x2="627" y1="0.5" y2="0.5" />
                </svg>
              </div>
            </div>

            {/* Register button */}
            <button
              type="button"
              onClick={handleRegister}
              className="bg-[rgba(99,157,170,0.65)] h-[45px] w-full max-w-[505px] rounded-[8px] font-['Inter:Regular',sans-serif] text-[25px] text-black hover:bg-[rgba(99,157,170,0.8)] transition-colors"
            >
              Register
            </button>
          </form>
        </div>
        
        {/* Card border */}
        <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-0 pointer-events-none rounded-[35px]" />
      </div>
    </div>
  );
}
