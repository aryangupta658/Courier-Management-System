import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Box, Menu, X } from "lucide-react";

const PublicNavbar = () => {
  const [open, setOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `font-bold transition relative ${
      isActive ? "text-blue-700" : "text-slate-900 hover:text-blue-700"
    }`;

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="h-20 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Box size={27} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Courier<span className="text-blue-700">MS</span>
            </h1>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            <NavLink to="/" className={navClass}>
              {({ isActive }) => (
                <>
                  Home
                  {isActive && (
                    <span className="absolute -bottom-7 left-0 right-0 h-1 bg-blue-700 rounded-full" />
                  )}
                </>
              )}
            </NavLink>

            <NavLink to="/features" className={navClass}>
              {({ isActive }) => (
                <>
                  Features
                  {isActive && (
                    <span className="absolute -bottom-7 left-0 right-0 h-1 bg-blue-700 rounded-full" />
                  )}
                </>
              )}
            </NavLink>

            <NavLink to="/how-it-works" className={navClass}>
              {({ isActive }) => (
                <>
                  How It Works
                  {isActive && (
                    <span className="absolute -bottom-7 left-0 right-0 h-1 bg-blue-700 rounded-full" />
                  )}
                </>
              )}
            </NavLink>

            <NavLink to="/about" className={navClass}>
              {({ isActive }) => (
                <>
                  About Us
                  {isActive && (
                    <span className="absolute -bottom-7 left-0 right-0 h-1 bg-blue-700 rounded-full" />
                  )}
                </>
              )}
            </NavLink>

            <NavLink to="/contact" className={navClass}>
              {({ isActive }) => (
                <>
                  Contact
                  {isActive && (
                    <span className="absolute -bottom-7 left-0 right-0 h-1 bg-blue-700 rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          </nav>

          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Link
              to="/login"
              className="px-5 lg:px-7 py-3 rounded-xl border-2 border-blue-700 text-blue-700 font-bold hover:bg-blue-50 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 lg:px-7 py-3 rounded-xl bg-blue-700 text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-800 transition"
            >
              Register
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="lg:hidden w-11 h-11 rounded-xl border border-slate-200 flex items-center justify-center text-slate-900"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden pb-5">
            <nav className="bg-white rounded-2xl border border-slate-200 p-3 shadow-sm space-y-1">
              <MobileNavLink to="/" label="Home" onClick={closeMenu} />
              <MobileNavLink
                to="/features"
                label="Features"
                onClick={closeMenu}
              />
              <MobileNavLink
                to="/how-it-works"
                label="How It Works"
                onClick={closeMenu}
              />
              <MobileNavLink to="/about" label="About Us" onClick={closeMenu} />
              <MobileNavLink
                to="/contact"
                label="Contact"
                onClick={closeMenu}
              />

              <div className="grid grid-cols-2 gap-3 pt-3 sm:hidden">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="text-center px-4 py-3 rounded-xl border-2 border-blue-700 text-blue-700 font-bold"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="text-center px-4 py-3 rounded-xl bg-blue-700 text-white font-bold"
                >
                  Register
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

const MobileNavLink = ({ to, label, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block px-4 py-3 rounded-xl font-bold ${
          isActive
            ? "bg-blue-50 text-blue-700"
            : "text-slate-700 hover:bg-slate-50"
        }`
      }
    >
      {label}
    </NavLink>
  );
};

export default PublicNavbar;
