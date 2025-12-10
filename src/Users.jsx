import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const response = await fetch("https://mt-task.onrender.com/api/bookings?days=30");
    const data = await response.json();
    setUsers(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="text-center font-semibold py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="font-bold text-xl mb-4">Users</h2>

      <div className="overflow-x-auto border rounded-lg shadow bg-white">
        <table className="table-auto w-full text-left text-sm">
          <thead className="bg-gray-100 font-semibold">
            <tr>
              <th className="px-4 py-2 border">User ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Hotel Name</th>
              <th className="px-4 py-2 border">Last Booked</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{u.id}</td>
                <td className="border px-4 py-2">{u.guestName}</td>
                <td className="border px-4 py-2">{u.hotelName}</td>
                <td className="border px-4 py-2">{u.checkIn}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
