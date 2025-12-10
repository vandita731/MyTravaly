import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Users } from "lucide-react";

const PRIMARY_COLOR = "#ff6f61";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [mobileView, setMobileView] = useState(window.innerWidth < 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth < 768);
      setSidebarOpen(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeStyle = {
    background: PRIMARY_COLOR,
    color: "white",
    fontWeight: "600",
    boxShadow: "0 0 6px rgba(0,0,0,0.25)",
  };

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* MOBILE TOP NAV BAR */}
      {mobileView && (
        <div className="fixed top-0 left-0 right-0 bg-white shadow-lg px-4 py-3 flex justify-between items-center z-20">
          <h2 className="font-bold text-lg" style={{ color: PRIMARY_COLOR }}>
            MyTravaly
          </h2>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <Menu size={26} color={PRIMARY_COLOR} />
          </button>
        </div>
      )}

      {/* SIDEBAR */}
      {sidebarOpen && (
        <aside
          className={`${
            mobileView ? "fixed top-0 left-0 z-30 h-screen" : "relative"
          } w-64 bg-white border-r shadow-md p-4 transition-all duration-300`}
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-7">
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
              {!mobileView && <h2 className="font-bold text-xl">MyTravaly</h2>}
            </div>

            {/* CLOSE BUTTON MOBILE */}
            {mobileView && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-md"
              >
                <X size={22} />
              </button>
            )}
          </div>

          {/* NAVIGATION */}
          <nav className="space-y-2 font-medium">
            <Link
              to="/"
              className="flex gap-3 items-center px-4 py-2 rounded-md text-sm"
              style={location.pathname === "/" ? activeStyle : {}}
              onClick={() => mobileView && setSidebarOpen(false)}
            >
              <Home size={18} />
              Dashboard
            </Link>

            <Link
              to="/users"
              className="flex gap-3 items-center px-4 py-2 rounded-md text-sm"
              style={location.pathname === "/users" ? activeStyle : {}}
              onClick={() => mobileView && setSidebarOpen(false)}
            >
              <Users size={18} />
              Users
            </Link>
          </nav>
        </aside>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 pt-4 md:pt-0">
        {mobileView ? <div className="pt-14" /> : null}
        {children}
      </main>
    </div>
  );
}
