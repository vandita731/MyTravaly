import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Users } from "lucide-react";

const PRIMARY_COLOR = "#ff6f61";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const activeStyle = {
    background: PRIMARY_COLOR,
    color: "white",
    fontWeight: "600",
    boxShadow: "0 0 6px rgba(0,0,0,0.25)",
  };

  return (
    <div className="flex min-h-screen">

      {/* 🔥 Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col justify-between ${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white h-screen fixed top-0 left-0 border-r shadow-sm transition-all duration-300 p-4 z-40`}
      >
        <div>
          {/* HEADER + TOGGLE */}
          <div className="flex justify-between items-center mb-6">
            {sidebarOpen && (
              <h2 className="text-xl font-bold text-gray-800">MyTravaly</h2>
            )}

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* NAV LINKS */}
          <nav className="space-y-2 font-medium mt-2">
            <Link
              to="/"
              className="flex gap-3 items-center px-4 py-3 rounded-md"
              style={location.pathname === "/" ? activeStyle : {}}
            >
              <Home size={20} />
              {sidebarOpen && "Dashboard"}
            </Link>

            <Link
              to="/users"
              className="flex gap-3 items-center px-4 py-3 rounded-md"
              style={location.pathname === "/users" ? activeStyle : {}}
            >
              <Users size={20} />
              {sidebarOpen && "Users"}
            </Link>
          </nav>
        </div>

        <div className="text-xs text-gray-500 text-center pb-2">
          {sidebarOpen && "© MyTravaly"}
        </div>
      </aside>

      {/* 🔥 MOBILE NAVBAR */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow-md p-4 z-40 flex justify-between items-center">
        <h2 className="text-lg font-bold" style={{ color: PRIMARY_COLOR }}>
          MyTravaly
        </h2>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 border rounded-md"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 bg-white w-full shadow-lg p-5 z-40">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3 border-b"
            style={location.pathname === "/" ? activeStyle : {}}
          >
            Dashboard
          </Link>

          <Link
            to="/users"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3"
            style={location.pathname === "/users" ? activeStyle : {}}
          >
            Users
          </Link>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main
        className={`bg-gray-50 pt-2 px-6 overflow-auto w-full transition-all duration-300
        ${mobileMenuOpen ? "mt-16" : "mt-0"}
        ${sidebarOpen ? "md:ml-64" : "md:ml-20"}
      `}
      >
        {children}
      </main>
    </div>
  );
}
