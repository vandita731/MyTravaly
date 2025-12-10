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
    borderRadius: "10px",
  };

  return (
    <div className="flex min-h-screen">
      
      {/* DESKTOP SIDEBAR */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r shadow-sm transition-all duration-300 
        ${sidebarOpen ? "w-64" : "w-20"}`}
      >
        {/* LOGO + TOGGLE */}
        <div className="flex justify-between items-center p-4 border-b">
          {sidebarOpen && (
            <h2 className="text-xl font-bold" style={{ color: PRIMARY_COLOR }}>
              MyTravaly
            </h2>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-200"
          >
            {sidebarOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* SIDEBAR LINKS */}
        <nav className="flex flex-col gap-2 p-3 font-medium mt-2">

          {/* DASHBOARD */}
          <Link
            to="/"
            style={location.pathname === "/" ? activeStyle : {}}
            className={`flex items-center gap-3 py-3 rounded-md transition 
            ${sidebarOpen ? "px-4 justify-start" : "px-0 justify-center"}`}
          >
            <Home size={22} />
            {sidebarOpen && "Dashboard"}
          </Link>

          {/* USERS */}
          <Link
            to="/users"
            style={location.pathname === "/users" ? activeStyle : {}}
            className={`flex items-center gap-3 py-3 rounded-md transition 
            ${sidebarOpen ? "px-4 justify-start" : "px-0 justify-center"}`}
          >
            <Users size={22} />
            {sidebarOpen && "Users"}
          </Link>

        </nav>
      </aside>



      {/* MOBILE NAV */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-sm py-3 px-4 flex justify-between items-center">
        <h2 className="text-xl font-bold" style={{ color: PRIMARY_COLOR }}>
          MyTravaly
        </h2>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <nav className="md:hidden absolute top-14 left-0 bg-white w-full p-4 shadow-lg z-50 flex flex-col gap-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            style={location.pathname === "/" ? activeStyle : {}}
            className="flex items-center gap-3 py-3 px-3 rounded-md"
          >
            <Home size={22} /> Dashboard
          </Link>

          <Link
            to="/users"
            onClick={() => setMobileMenuOpen(false)}
            style={location.pathname === "/users" ? activeStyle : {}}
            className="flex items-center gap-3 py-3 px-3 rounded-md"
          >
            <Users size={22} /> Users
          </Link>
        </nav>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-gray-50 p-6 mt-14 md:mt-0 overflow-auto">
        {children}
      </main>
    </div>
  );
}
