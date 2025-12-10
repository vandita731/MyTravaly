import React, { useEffect, useState } from "react";

const API_BASE = "https://mt-task.onrender.com";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);

    const response = await fetch(`${API_BASE}/api/bookings?days=30`);
    const json = await response.json();

    setUsers(json.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Users List</h2>

      {loading ? (
        <p className="text-lg text-gray-500 font-medium">Loading...</p>
      ) : (
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">User ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Hotel Name</th>
              <th className="py-2 px-4 border">Last Booked</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border">{item.id}</td>
                <td className="py-2 px-4 border">{item.guestName}</td>
                <td className="py-2 px-4 border">{item.hotelName}</td>
                <td className="py-2 px-4 border">
                  {item.checkIn?.split("T")[0]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
