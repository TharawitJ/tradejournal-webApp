import React from 'react';
import { NavLink } from 'react-router';
import useUserStore from '../../stores/userStore';
// import RegisterForm from '@/components/RegisterForm'
import { loginSchema } from '../../validations/user.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const LoginScreen: React.FC = () => {

  // const user = useUserStore(state=>state.user)
  const login = useUserStore(state=>state.login)
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit'
  })
  const { errors, isSubmitting, isValid } = formState

  const onSubmit = async (body) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const resp = await login(body)
      toast.success(resp.data.message)
    } catch (err) {
      console.dir(err)
      const errMsg = err.response?.data.message || err.message
      toast.error(errMsg)
    }
  }

  return (
    <div className="bg-[#0e0e0e] text-[#ffffff] font-body selection:bg-primary selection:text-on-primary min-h-screen flex flex-col relative overflow-hidden">
      {/* Asymmetric Background Elements (Intentional Asymmetry) */}
      <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-[100px] pointer-events-none"></div>

      <main className="flex-grow flex items-center justify-center px-6 py-12 relative z-10">
        {/* Login Card: Quantitative Editorial Style */}
        <div className="w-full max-w-md">
          <div className="mb-12 text-center md:text-left">
            <h1 className="font-headline font-black text-4xl tracking-tighter text-primary uppercase mb-2">
              Trade Journal
            </h1>
            <p className="font-label text-on-surface-variant tracking-widest text-[0.75rem] uppercase">
              Institutional Precision / Personal Insight
            </p>
          </div>

          <div className="bg-surface-container-high p-8 md:p-10 rounded-lg shadow-[0_0_32px_rgba(255,255,255,0.04)] border border-outline-variant/10">
            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div className="space-y-2">
                <label className="font-label text-on-surface-variant text-[0.75rem] uppercase tracking-widest block px-1" htmlFor="identity">
                  Email or Username
                </label>
                <div className="relative">
                  <input 
                    className="w-full bg-surface-container-lowest border border-gray-700 text-on-surface px-4 py-4 focus:ring-1 focus:ring-primary/40 transition-all font-body text-sm" 
                    id="identity" 
                    placeholder="Email or Username" 
                    required 
                    {...register('identity')}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="font-label text-on-surface-variant text-[0.75rem] uppercase tracking-widest block" htmlFor="password">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input 
                    className="w-full bg-surface-container-lowest border border-gray-700 text-on-surface px-4 py-4 focus:ring-1 focus:ring-primary/40 transition-all font-body text-sm" 
                    id="password" 
                    placeholder="••••••••" 
                    required 
                    type="password" 
                    {...register('password')}
                  />
                </div>
                <div className="flex justify-end pt-1">
                  <NavLink to="/account_recovery">
                  <a className="font-label text-[0.75rem] text-on-surface-variant hover:underline transition-colors uppercase tracking-widest" href="#">
                    Forgot Password?
                  </a></NavLink>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <button 
                  className="w-full bg-gradient-to-br from-[#9cff93] to-[#00fc40] text-on-primary font-label font-bold text-[1rem] py-4 rounded-md uppercase tracking-widest active:scale-[0.98] transition-all hover:brightness-110 shadow-lg shadow-primary/10 text-[#201f1f]" 
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>

            <div className="mt-10 pt-8 border-t border-outline-variant/10 text-center">
              <p className="font-body text-sm text-on-surface-variant">
                No account? 
                <NavLink to="/register">
                <a className="underline text-primary font-label text-[0.75rem] uppercase tracking-widest ml-2 hover:text-[0.9rem]" href="#">
                  Register
                </a>
                </NavLink>
              </p>
            </div>
          </div>

          {/* Footer Meta for Login */}
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 px-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[14px]">shield</span>
              <span className="font-label text-[0.6rem] text-on-surface-variant uppercase tracking-[0.2em]">End-to-End Encryption Active</span>
            </div>
            <div className="flex gap-6">
              <a className="font-label text-[0.6rem] text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors" href="#">Terms</a>
              <a className="font-label text-[0.6rem] text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors" href="#">Security</a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer: Shared Component Execution */}
      <footer className="w-full px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-4 bg-surface-container-lowest border-t border-surface-variant/20">
        <div className="flex items-center gap-4">
          <span className="text-primary font-bold font-headline uppercase tracking-tighter">Trade Journal</span>
          <span className="hidden md:block h-4 w-[1px] bg-outline-variant/30"></span>
          <p className="font-label text-[0.75rem] uppercase tracking-widest text-on-surface-variant">© 2024 High-Performance Trade Journal. All rights reserved.</p>
        </div>
        <div className="flex gap-8">
          <a className="font-label text-[0.75rem] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
          <a className="font-label text-[0.75rem] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="font-label text-[0.75rem] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#">Security</a>
          <a className="font-label text-[0.75rem] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#">Support</a>
        </div>
      </footer>
    </div>
  );
};

export default LoginScreen;