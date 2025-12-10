import React, { useEffect, useState } from "react";

const API_BASE = "https://mt-task.onrender.com";

export default function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    // 🔥 Using BOOKINGS API as mock user list (no users API exists)
    const res = await fetch(`${API_BASE}/api/bookings?days=30`);
    const data = await res.json();

    // Convert bookings into mock user dataset
    const formatted = data.data.map((item, i) => ({
      id: item.id,
      name: item.guestName,
      email: `${item.guestName.split(" ").join("").toLowerCase()}@gmail.com`,
      city: item.hotelName.split(" ")[1] ?? "India",
      lastBooking: item.bookingDate?.slice(0, 10),
    }));

    setUsers(formatted);
  };


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Users List</h1>

      <div className="bg-white shadow rounded-xl p-4">

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">User ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">City</th>
              <th className="p-3 border">Last Booking</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="p-3 border">{u.id}</td>
                <td className="p-3 border">{u.name}</td>
                <td className="p-3 border">{u.email}</td>
                <td className="p-3 border">{u.city}</td>
                <td className="p-3 border">{u.lastBooking}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}
