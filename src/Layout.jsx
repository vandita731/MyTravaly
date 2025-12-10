import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Settings, LogOut, Users } from "lucide-react";

const PRIMARY_COLOR = "#ff6f61";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const activeStyle = {
    background: PRIMARY_COLOR,
    color: "white",
    fontWeight: "600",
    boxShadow: "0 0 6px rgba(0,0,0,0.25)",
  };

  return (
    <div className="flex">

      {/* SIDEBAR */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-white min-h-screen border-r shadow-sm transition-all duration-300 p-4 sticky top-0`}
      >
        {/* LOGO & TOGGLE */}
        <div className="flex justify-between items-center mb-7">
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              <div
                style={{
                  background: PRIMARY_COLOR,
                  width: 50,
                  height: 50,
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "bold"
                }}
              >
                MT
              </div>

              <h2 className="font-bold text-xl">MyTravaly</h2>
            </div>
          )}

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            {sidebarOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* LINKS */}
        <nav className="space-y-2 font-medium">

          {/* DASHBOARD */}
          <Link
            to="/"
            className="flex gap-3 items-center px-4 py-2 rounded-md transition"
            style={location.pathname === "/" ? activeStyle : {}}
          >
            <Home size={20} />
            {sidebarOpen && "Dashboard"}
          </Link>

          {/* USERS */}
          <Link
            to="/users"
            className="flex gap-3 items-center px-4 py-2 rounded-md transition"
            style={location.pathname === "/users" ? activeStyle : {}}
          >
            <Users size={20} />
            {sidebarOpen && "Users"}
          </Link>

          

        </nav>

       
      </aside>

      {/* CONTENT */}
      <main className="flex-1 bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  );
}
