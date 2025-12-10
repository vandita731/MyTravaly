import React, { useEffect, useState } from "react";

const API_BASE = "https://mt-task.onrender.com";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/bookings?days=30`);
      const json = await res.json();
      setUsers(json.data || []);
    } catch (e) {
      console.error("Error fetching users", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full px-3 sm:px-6 py-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Users List</h2>

      {loading ? (
        <div className="text-center py-12 text-gray-500 text-base font-medium">
          Loading...
        </div>
      ) : (
        <div className="overflow-x-auto">
          {/* full-width table, mobile-first */}
          <table className="w-full border border-gray-300 text-left text-xs sm:text-sm border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-2 sm:px-3 border">User ID</th>
                <th className="py-2 px-2 sm:px-3 border">Name</th>
                <th className="py-2 px-2 sm:px-3 border">Hotel Name</th>
                <th className="py-2 px-2 sm:px-3 border">Last Booked</th>
              </tr>
            </thead>

            <tbody>
              {users.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-2 px-2 sm:px-3 border align-top">
                    {item.id}
                  </td>
                  <td className="py-2 px-2 sm:px-3 border align-top">
                    {item.guestName}
                  </td>
                  <td className="py-2 px-2 sm:px-3 border align-top whitespace-normal break-words">
                    {item.hotelName}
                  </td>
                  <td className="py-2 px-2 sm:px-3 border align-top">
                    {item.checkIn?.split("T")[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
