import React from 'react';
import { NavLink } from 'react-router';

/**
 * RegisterScreen Component
 * 
 * This component represents a registration screen for the Trade Journal platform.
 * It features a centered registration card with fields for name, email, 
 * password, and confirm password, along with a shared footer.
 * 
 * Note: This component uses custom Tailwind CSS colors, fonts, and gradients defined 
 * in the project's tailwind.config.js.
 */
const RegisterScreen: React.FC = () => {
  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary selection:text-on-primary min-h-screen flex flex-col relative overflow-hidden bg-[#0e0e0e] text-[#ffffff]">
      {/* Background Grain/Texture (Subtle tonal shift) */}
      <div className="absolute inset-0 bg-surface-container-lowest opacity-40 z-0 pointer-events-none"></div>

      <main className="flex-grow flex items-center justify-center px-6 py-12 relative z-10">
        {/* Registration Canvas */}
        <div className="w-full max-w-[440px]">
          {/* Brand Anchor */}
          <div className="text-center mb-12">
            <h1 className="font-headline font-black text-3xl tracking-tighter text-primary uppercase">Trade Journal</h1>
            <p className="font-label text-on-surface-variant text-[0.75rem] tracking-widest mt-2">HIGH-PERFORMANCE QUANTITATIVE LOG</p>
          </div>

          {/* Registration Card */}
          <div className="bg-surface-container-high p-8 md:p-10 shadow-[0_0_32px_rgba(255,255,255,0.04)] rounded-lg border border-outline-variant/10">
            <div className="mb-8">
              <h2 className="font-headline font-bold text-2xl text-on-surface tracking-tight">Create Account</h2>
              <p className="text-on-surface-variant text-sm mt-1">Join the elite network of disciplined traders.</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {/* Full Name */}
              <div className="space-y-2">
                <label className="font-label text-[0.75rem] uppercase tracking-widest text-on-surface-variant block">Full Name</label>
                <input 
                  className="w-full bg-surface-container-lowest border border-gray-700 text-on-surface p-4 rounded focus:ring-1 focus:ring-primary/40 placeholder:text-outline-variant transition-all font-body text-sm" 
                  placeholder="ALEX RIVERA" 
                  type="text" 
                />
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="font-label text-[0.75rem] uppercase tracking-widest text-on-surface-variant block">Email Address</label>
                <input 
                  className="w-full bg-surface-container-lowest border border-gray-700 text-on-surface p-4 rounded focus:ring-1 focus:ring-primary/40 placeholder:text-outline-variant transition-all font-body text-sm" 
                  placeholder="TRADER@Trade Journal.IO" 
                  type="email" 
                />
              </div>

              {/* Password Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-label text-[0.75rem] uppercase tracking-widest text-on-surface-variant block">Password</label>
                  <input 
                    className="w-full bg-surface-container-lowest border border-gray-700 text-on-surface p-4 rounded focus:ring-1 focus:ring-primary/40 placeholder:text-outline-variant transition-all font-body text-sm" 
                    placeholder="••••••••" 
                    type="password" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label text-[0.75rem] uppercase tracking-widest text-on-surface-variant block">Confirm</label>
                  <input 
                    className="w-full bg-surface-container-lowest border border-gray-700 text-on-surface p-4 rounded focus:ring-1 focus:ring-primary/40 placeholder:text-outline-variant transition-all font-body text-sm" 
                    placeholder="••••••••" 
                    type="password" 
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <div className="flex items-center h-5">
                  <input 
                    className="w-4 h-4 rounded bg-surface-container-lowest border-outline-variant/20 text-primary focus:ring-primary/40 focus:ring-offset-surface" 
                    id="terms" 
                    type="checkbox" 
                  />
                </div>
                <label className="text-[0.8rem] text-on-surface-variant leading-tight" htmlFor="terms">
                  I agree to the <a className="text-on-surface hover:text-primary transition-colors underline decoration-outline-variant/30 underline-offset-4" href="#">Terms of Service</a> and <a className="text-on-surface hover:text-primary transition-colors underline decoration-outline-variant/30 underline-offset-4" href="#">Privacy Policy</a>.
                </label>
              </div>

              {/* Primary Action */}
              <button 
                className="w-full bg-gradient-to-br from-[#9cff93] to-[#00fc40] text-on-primary font-label font-bold text-[0.875rem] tracking-widest py-4 rounded active:scale-[0.98] transition-all hover:brightness-110 uppercase shadow-lg shadow-primary/10 text-[#201f1f]" 
                type="submit"
              >
                Create Account
              </button>
            </form>

            {/* Redirect Link */}
            <div className="mt-8 pt-8 border-t border-outline-variant/10 text-center">
              <p className="text-on-surface-variant text-sm">
                Already have an account? 
                <NavLink to="/login"><a className="text-primary font-bold ml-1 hover:underline underline-offset-4 transition-all" href="#">Login</a>
              </NavLink></p>
            </div>
          </div>

          {/* Footnote / Security */}
          <div className="mt-8 flex justify-center items-center gap-6 opacity-40 grayscale">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[1rem]">lock</span>
              <span className="font-label text-[0.65rem] uppercase tracking-[0.2em]">End-to-End Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[1rem]">verified_user</span>
              <span className="font-label text-[0.65rem] uppercase tracking-[0.2em]">SEC Compliant Archiving</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Component Integration (Minimal Variant) */}
      <footer className="w-full px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-4 bg-surface-container-lowest border-t border-outline-variant/10 relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold font-headline tracking-tighter uppercase">Trade Journal</span>
          <span className="text-on-surface-variant font-label text-[0.75rem] uppercase tracking-widest">© 2024 High-Performance Trade Journal. All rights reserved.</span>
        </div>
        <div className="flex gap-6">
          <a className="font-label text-[0.75rem] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#">Security</a>
          <a className="font-label text-[0.75rem] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#">Support</a>
          <a className="font-label text-[0.75rem] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy</a>
        </div>
      </footer>
    </div>
  );
};

export default RegisterScreen;