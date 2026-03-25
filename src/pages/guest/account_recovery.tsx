import React from 'react';
import { NavLink } from 'react-router';

/**
 * AccountRecovery Component
 * 
 * This component represents an account recovery screen for the Ledger platform.
 * It features a focused recovery card where users can enter their email 
 * to receive a password reset link, along with a shared footer.
 * 
 * Note: This component uses custom Tailwind CSS colors, fonts, and gradients defined 
 * in the project's tailwind.config.js.
 */
const AccountRecovery: React.FC = () => {
  return (
    <div className="bg-[#0e0e0e] text-[#ffffff] bg-surface text-on-surface font-body selection:bg-primary selection:text-on-primary min-h-screen flex flex-col">
      {/* TopAppBar Suppressed for Transactional Focus */}
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        {/* Recovery Card */}
        <div className="w-full max-w-md bg-surface-container-high p-10 rounded-xl shadow-[0_0_32px_rgba(255,255,255,0.54)] relative overflow-hidden">
          {/* Decorative Accent */}
          <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
          <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-headline font-extrabold tracking-tighter text-on-surface uppercase">
                Trade Journal
              </h1>
              <h2 className="text-xl font-headline font-bold text-on-surface tracking-tight">
                Account Recovery
              </h2>
              <p className="text-on-surface-variant font-body text-sm leading-relaxed">
                Enter your email to receive a password reset link
              </p>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label className="font-label text-[0.75rem] uppercase tracking-widest text-on-surface-variant font-medium" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <input 
                    className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline-variant py-4 px-4 font-body focus:ring-2 focus:ring-primary/40 focus:outline-none rounded-lg transition-all border border-gray-700" 
                    id="email" 
                    name="email" 
                    placeholder="trader@ledger.io"
                    required 
                    type="email" 
                  />
                </div>
              </div>

              {/* CTA */}
              <button 
                className=" text-[#201f1f] bg-gradient-to-br from-[#9cff93] to-[#00fc40] text-on-primary font-label text-[0.875rem] font-bold py-4 rounded-lg uppercase tracking-wider hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/10" 
                type="submit"
              >
                Send Recovery Link
              </button>
            </form>

            {/* Footer Link */}
            <div className="flex justify-center pt-4">
              <NavLink to="/login"><a className="group flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors duration-200 font-label text-[0.75rem] uppercase tracking-widest" href="#">
                Back to Login
              </a></NavLink>
            </div>
          </div>
        </div>
      </main>

      {/* Shared Footer */}
      <footer className="bg-surface-container-lowest w-full px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-surface-variant/20">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-primary font-headline font-bold uppercase tracking-tight">Trade Journal</span>
          <p className="text-on-surface-variant font-label text-[0.75rem] uppercase tracking-widest">
            © 2024 High-Performance Trade Journal. All rights reserved.
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-6">
          <a className="text-on-surface-variant font-label text-[0.75rem] uppercase tracking-widest hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">Terms of Service</a>
          <a className="text-on-surface-variant font-label text-[0.75rem] uppercase tracking-widest hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">Privacy Policy</a>
          <a className="text-on-surface-variant font-label text-[0.75rem] uppercase tracking-widest hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">Security</a>
          <a className="text-on-surface-variant font-label text-[0.75rem] uppercase tracking-widest hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">Support</a>
        </nav>
      </footer>
    </div>
  );
};

export default AccountRecovery;