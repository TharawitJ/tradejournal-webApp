import React from "react";

/**
 * ResetPassword Component
 *
 * This component represents a security credential reset screen for the Ledger platform.
 * It features a focused journey with a central reset card, password fields,
 * security requirements, and a shared footer.
 *
 * Note: This component uses custom Tailwind CSS colors, fonts, and gradients defined
 * in the project's tailwind.config.js and global styles.
 */
//  React.FC --> just to tell type(React.FunctionComponent) to typescript
const ResetPassword: React.FC = () => {
  return (
    <div className="bg-[#0e0e0e] bg-background text-on-surface font-body selection:bg-primary selection:text-on-primary min-h-screen flex flex-col text-[#ffffff]">
      <main className="flex-1 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Abstract Background Detail */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-secondary-container rounded-full blur-[120px]"></div>
        </div>

        <div className="w-full max-w-md z-10">
          {/* Brand Anchor */}
          <div className="flex justify-center mb-12">
            <span className="font-headline font-black text-3xl tracking-tighter text-primary uppercase">
              Trade Journal
            </span>
          </div>

          {/* Central Reset Card */}
          <div className="bg-surface-container-high p-8 md:p-10 rounded-xl shadow-[0_0_32px_rgba(255,255,255,0.04)] border border-outline-variant/10">
            <header className="mb-8">
              <h1 className="font-headline font-bold text-2xl tracking-tight mb-2 text-on-surface">
                Reset Security Credentials
              </h1>
              <p className="font-body text-sm text-on-surface-variant">
                Update your account access protocols to maintain
                high-performance security.
              </p>
            </header>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {/* New Password Field */}
              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant flex justify-between">
                  New Password
                  <span className="material-symbols-outlined text-[14px] text-on-surface-variant">
                    lock
                  </span>
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-md py-4 px-4 text-on-surface font-label placeholder:text-outline-variant focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/40 transition-all duration-200"
                    placeholder="••••••••••••"
                    type="password"
                  />
                </div>
              </div>

              {/* Confirm New Password Field */}
              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant flex justify-between">
                  Confirm New Password
                  <span className="material-symbols-outlined text-[14px] text-on-surface-variant">
                    verified_user
                  </span>
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-md py-4 px-4 text-on-surface font-label placeholder:text-outline-variant focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/40 transition-all duration-200"
                    placeholder="••••••••••••"
                    type="password"
                  />
                </div>
              </div>

              {/* Security Requirements */}
              <div className="bg-surface-container-lowest/50 p-4 rounded border border-outline-variant/5">
                <h4 className="font-label text-[10px] uppercase tracking-tighter text-on-surface-variant mb-2">
                  Protocol Requirements
                </h4>
                <ul className="space-y-1">
                  <li className="flex items-center gap-2 text-[11px] font-label text-on-surface-variant">
                    <span className="material-symbols-outlined text-[12px] text-primary">
                      check_circle
                    </span>
                    Minimum 12 characters
                  </li>
                  <li className="flex items-center gap-2 text-[11px] font-label text-on-surface-variant">
                    <span className="material-symbols-outlined text-[12px] text-primary">
                      check_circle
                    </span>
                    Alphanumeric & Special character mix
                  </li>
                </ul>
              </div>

              {/* Primary Action */}
              <button
                className="w-full bg-gradient-to-br from-[#9cff93] to-[#00fc40] text-on-primary font-label font-bold py-4 rounded-md tracking-widest uppercase text-sm hover:brightness-110 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/10 text-[#201f1f]"
                type="submit"
              >
                Confirm
              </button>
            </form>

            <div className="mt-8 flex justify-center">
              <a
                className="font-label text-[11px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"
                href="#"
              >
                <span className="material-symbols-outlined text-[16px]">
                  arrow_back
                </span>
                Back to Authentication
              </a>
            </div>
          </div>

          {/* Contextual Note */}
          <p className="mt-8 text-center font-label text-[10px] text-outline-variant uppercase tracking-widest max-w-xs mx-auto leading-relaxed">
            Updating security access will terminate all existing active sessions
            for this account.
          </p>
        </div>
      </main>

      {/* Shared Component: Footer */}
      <footer className="w-full px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-4 bg-surface-container-lowest border-t border-outline-variant/10">
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold font-headline tracking-tighter">
            LEDGER
          </span>
          <span className="font-label text-[0.75rem] uppercase tracking-widest text-on-surface-variant">
            © 2024 High-Performance Ledger. All rights reserved.
          </span>
        </div>
        <div className="flex gap-6">
          <a
            className="font-label text-[0.75rem] uppercase tracking-widest text-[#adaaaa] hover:text-primary transition-colors transition-opacity opacity-80 hover:opacity-100"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="font-label text-[0.75rem] uppercase tracking-widest text-[#adaaaa] hover:text-primary transition-colors transition-opacity opacity-80 hover:opacity-100"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="font-label text-[0.75rem] uppercase tracking-widest text-[#adaaaa] hover:text-primary transition-colors transition-opacity opacity-80 hover:opacity-100"
            href="#"
          >
            Security
          </a>
          <a
            className="font-label text-[0.75rem] uppercase tracking-widest text-[#adaaaa] hover:text-primary transition-colors transition-opacity opacity-80 hover:opacity-100"
            href="#"
          >
            Support
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ResetPassword;
