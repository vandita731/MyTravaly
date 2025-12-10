import React, { useState, useEffect } from 'react';
import {
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';

import {
  Calendar, TrendingUp, Users, DollarSign, Filter,
  RefreshCw
} from 'lucide-react';

const API_BASE = 'https://mt-task.onrender.com';
const PRIMARY_COLOR = "#ff6f61";
const COLORS = [PRIMARY_COLOR, "#000000", "#bfbfbf"];


// Reusable Stat Card
const StatCard = ({ title, value, subtitle, icon: Icon }) => (
  <div className="bg-white border shadow-sm hover:shadow-md rounded-xl p-5 transition">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-600 font-medium">{title}</p>
        <h3 className="text-3xl font-bold mt-1">{value}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div className="p-2 border rounded-lg bg-gray-50">
        <Icon className="w-6 h-6" color={PRIMARY_COLOR} />
      </div>
    </div>
  </div>
);


// Booking Card
const BookingCard = ({ booking }) => (
  <div className="bg-white border rounded-xl shadow-sm hover:shadow-md p-4 transition">

    <div className="flex justify-between items-center mb-3">
      <h3 className="font-semibold">{booking.guestName}</h3>

      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
        booking.status === 'confirmed' ? 'border-green-600 text-green-700 bg-green-50' :
        booking.status === 'pending' ? 'border-yellow-600 text-yellow-700 bg-yellow-50' :
        'border-red-600 text-red-700 bg-red-50'
      }`}>
        {booking.status}
      </span>
    </div>

    <p className="text-gray-500 text-sm">{booking.hotelName}</p>
  </div>
);



export default function Dashboard() {

  const [bookings, setBookings] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    days: 7,
    status: 'all',
    order: 'asc'
  });

  // Fetch Data
  const fetchData = async () => {
    setLoading(true);
    const statusParam = filters.status === "all" ? "" : `&status=${filters.status}`;

    try {
      const bookingsRes = await fetch(`${API_BASE}/api/bookings?days=${filters.days}${statusParam}&order=${filters.order}`);
      const metricsRes = await fetch(`${API_BASE}/api/metrics?days=${filters.days}`);
      const trendsRes = await fetch(`${API_BASE}/api/trends?months=6`);

      const bookingsData = await bookingsRes.json();
      const metricsData = await metricsRes.json();
      const trendsData = await trendsRes.json();

      setBookings(bookingsData.data);
      setMetrics(metricsData.data);
      setTrends(trendsData.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);


  const statusData = metrics ? [
    { name: "Confirmed", value: metrics.confirmed },
    { name: "Pending", value: metrics.pending },
    { name: "Cancelled", value: metrics.cancelled }
  ] : [];


  return (
    <div className="flex-1 min-h-screen bg-gray-100">

      {/* TOP NAV BAR */}
      <header style={{ background: PRIMARY_COLOR }} className="shadow-md w-full">
        <div className="flex gap-4 items-center py-4 px-6">

          {/* FINAL LOGO DESIGN */}
          <div className="w-14 h-14 rounded-md shadow-md border flex items-center justify-center"
            style={{
              background: PRIMARY_COLOR,
              borderColor: "white",
              borderWidth: "2px",
              fontWeight: "bold",
              fontSize: "20px",
              color: "white"
            }}>
            MT
          </div>

          <div>
            <h1 className="text-white text-2xl p-1 font-bold leading-none">MyTravaly India</h1>
            
            <p className="text-white text-sm opacity-80 -mt-1">Welcome back! Here's what's happening today.</p>
          </div>

        </div>
      </header>



      <div className="max-w-7xl mx-auto p-6 space-y-6">

        {/* Filter Bar */}
        <div className="bg-white border rounded-xl shadow p-4 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter size={18}/>
            <span className="font-semibold text-sm">Filters:</span>
          </div>

          <select value={filters.days}
            onChange={(e) => setFilters({ ...filters, days: parseInt(e.target.value) })}
            className="px-4 py-2 border rounded-lg font-medium">
            <option value={7}>Last 7 days</option>
            <option value={14}>Last 14 days</option>
            <option value={30}>Last 30 days</option>
          </select>

          <select value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-2 border rounded-lg font-medium">
            <option value="all">All</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select value={filters.order}
            onChange={(e) => setFilters({ ...filters, order: e.target.value })}
            className="px-4 py-2 border rounded-lg font-medium">
            <option value="asc">Oldest First</option>
            <option value="desc">Newest First</option>
          </select>

          <button onClick={fetchData}
            className="ml-auto px-4 py-2 rounded-md font-semibold text-white"
            style={{ background: PRIMARY_COLOR }}>
            <div className="flex gap-2 items-center">
              <RefreshCw size={18}/>
              Refresh
            </div>
          </button>

        </div>


        {/* Metrics */}
        {!loading && metrics ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard title="Total Bookings" value={metrics.totalBookings} subtitle={`${metrics.confirmed} confirmed`} icon={Calendar}/>
            <StatCard title="Total Revenue" value={`₹${metrics.totalRevenue.toLocaleString()}`} subtitle={`Avg: ₹${metrics.averageBookingValue}`} icon={DollarSign}/>
            <StatCard title="Occupancy Rate" value={`${metrics.occupancyRate}%`} icon={Users}/>
            <StatCard title="Conversion Rate" value={`${metrics.conversionRate}%`} icon={TrendingUp}/>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500 font-medium">Loading data...</div>
        )}


        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Revenue */}
          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="font-semibold mb-2">Revenue Trend</h3>
            <ResponsiveContainer height={320}>
              <LineChart data={trends}>
                <CartesianGrid stroke="#ddd"/>
                <XAxis dataKey="month"/>
                <YAxis/>
                <Tooltip/>
                <Line dataKey="revenue" stroke={PRIMARY_COLOR} strokeWidth={3}/>
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Booking Status */}
          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="font-semibold mb-2">Booking Status</h3>
            <ResponsiveContainer height={300}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" outerRadius={100} dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}>
                  {statusData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>


        {/* Bookings Cards */}
        {/* BOOKINGS LIST */}
<div className="bg-white shadow rounded-xl p-6">
  <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>

  {!loading && bookings?.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {bookings.map((b) => (
        <div
          key={b.id}
          className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition duration-300"
        >

          {/* Top Header Row */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg text-gray-800">{b.guestName}</h3>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border
                ${
                  b.status === "confirmed"
                    ? "border-green-600 text-green-700 bg-green-50"
                    : b.status === "pending"
                    ? "border-yellow-600 text-yellow-700 bg-yellow-50"
                    : "border-red-600 text-red-700 bg-red-50"
                }`}
            >
              {b.status}
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-2">{b.hotelName}</p>

          <hr className="my-2" />

          {/* Booking Details */}
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Room:</span>
              <span className="font-semibold">{b.roomType}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Check-in:</span>
              <span>{b.checkIn}</span>
            </div>

            <div className="flex justify-between pb-2 border-b">
              <span className="text-gray-500 font-medium">Check-out:</span>
              <span>{b.checkOut}</span>
            </div>

            <div className="flex justify-between pt-2">
              <span className="text-gray-500 font-medium">Amount:</span>
              <span className="font-bold text-lg text-gray-800">₹{b.amount.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Payment:</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border
                ${
                  b.paymentStatus === "paid"
                    ? "border-green-600 text-green-700 bg-green-50"
                    : "border-yellow-600 text-yellow-700 bg-yellow-50"
                }`}
              >
                {b.paymentStatus}
              </span>
            </div>

          </div>

        </div>
      ))}
    </div>
  ) : (
    <p className="text-center py-8 text-gray-500">No bookings found</p>
  )}
</div>

      </div>

    </div>
  );
}
