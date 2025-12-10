import React, { useState, useEffect } from 'react';
import {
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';

import {
  Calendar, TrendingUp, Users, DollarSign, Menu, X,
  Filter, RefreshCw, LogOut, Settings, Home
} from 'lucide-react';

const API_BASE = 'https://mt-task.onrender.com';

// BRAND COLORS
const PRIMARY_COLOR = "#ff6f61";
const SECONDARY_COLOR = "#111";

const COLORS = [
  PRIMARY_COLOR,
  "#000000",
  "#bfbfbf",
];

const StatCard = ({ title, value, subtitle, icon: Icon }) => (
  <div className="bg-white border shadow-sm hover:shadow-md rounded-xl p-5 transition duration-300">
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


// Single Booking UI card
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

    <div className="mt-4 space-y-1 text-sm">

      <div className="flex justify-between">
        <span className="text-gray-500 font-medium">Room:</span>
        <span className="font-semibold">{booking.roomType}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-500 font-medium">Check-in:</span>
        <span>{booking.checkIn}</span>
      </div>

      <div className="flex justify-between pb-2 border-b">
        <span className="text-gray-500 font-medium">Check-out:</span>
        <span>{booking.checkOut}</span>
      </div>

      <div className="flex justify-between pt-2">
        <span className="text-gray-500 font-medium">Amount:</span>
        <span className="font-bold text-lg">₹{booking.amount.toLocaleString()}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-500 font-medium">Payment:</span>
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
          booking.paymentStatus === 'paid' ? 'border-green-600 text-green-700 bg-green-50' : 'border-yellow-600 text-yellow-700 bg-yellow-50'
        }`}>
          {booking.paymentStatus}
        </span>
      </div>

    </div>
  </div>
);


export default function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [bookings, setBookings] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [trends, setTrends] = useState([]);

  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    days: 7,
    status: 'all',
    order: 'asc'
  });


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
    { name: "Cancelled", value: metrics.cancelled },
  ] : [];


  return (
    <div className="flex">

      {/* ----------- SIDEBAR --------- */}
      


      {/* -------- RIGHT SIDE UI -------- */}
      <div className="flex-1 min-h-screen bg-gray-100">

        {/* HEADER */}
        <header style={{ background: PRIMARY_COLOR }} className="shadow-md">
          <div className="max-w-7xl mx-auto py-4 px-6">
            <h1 className="text-white text-2xl font-bold">MyTravaly India</h1>
            <p className="text-white text-sm opacity-80">Welcome back! Here's what's happening today.</p>
          </div>
        </header>




        {/* Page Content */}
        <div className="max-w-7xl mx-auto p-6 space-y-6">


          {/* FILTER BAR */}
          <div className="bg-white border rounded-xl shadow p-4 flex flex-wrap gap-4 items-center">

            <div className="flex items-center gap-2">
              <Filter size={18}/>
              <span className="font-semibold text-sm">Filters:</span>
            </div>

            <select
              value={filters.days}
              onChange={(e) => setFilters({ ...filters, days: parseInt(e.target.value) })}
              className="px-4 py-2 border rounded-lg font-medium"
            >
              <option value={7}>Last 7 days</option>
              <option value={14}>Last 14 days</option>
              <option value={30}>Last 30 days</option>
            </select>

            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-4 py-2 border rounded-lg font-medium"
            >
              <option value="all">All</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={filters.order}
              onChange={(e) => setFilters({ ...filters, order: e.target.value })}
              className="px-4 py-2 border rounded-lg font-medium"
            >
              <option value="asc">Oldest First</option>
              <option value="desc">Newest First</option>
            </select>

            <button onClick={fetchData}
              className="ml-auto px-4 py-2 rounded-md font-semibold text-white"
              style={{ background: PRIMARY_COLOR }}
            >
              <div className="flex gap-2 items-center">
                <RefreshCw size={18}/>
                Refresh
              </div>
            </button>

          </div>


          {/* Stats */}
          {!loading && metrics ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

              <StatCard
                title="Total Bookings"
                value={metrics.totalBookings}
                subtitle={`${metrics.confirmed} confirmed`}
                icon={Calendar}
              />

              <StatCard
                title="Total Revenue"
                value={`₹${metrics.totalRevenue.toLocaleString()}`}
                subtitle={`Avg: ₹${metrics.averageBookingValue}`}
                icon={DollarSign}
              />

              <StatCard
                title="Occupancy Rate"
                value={`${metrics.occupancyRate}%`}
                icon={Users}
              />

              <StatCard
                title="Conversion Rate"
                value={`${metrics.conversionRate}%`}
                icon={TrendingUp}
              />

            </div>

          ) : (
  <div className="flex justify-center items-center gap-2 py-6">
    <div className="w-5 h-5 border-2 border-gray-300 border-t-[var(--primary)] animate-spin rounded-full"></div>
    <span className="text-gray-600 font-semibold">Loading...</span>
  </div>
)}



          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className="bg-white shadow rounded-xl p-4">
              <h3 className="font-semibold mb-2">Revenue Trend</h3>

              <ResponsiveContainer height={300}>
                <LineChart data={trends}>
                  <CartesianGrid stroke="#ddd"/>
                  <XAxis dataKey="month"/>
                  <YAxis/>
                  <Tooltip/>
                  <Line dataKey="revenue" stroke={PRIMARY_COLOR} strokeWidth={3}/>
                </LineChart>
              </ResponsiveContainer>
            </div>


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



          {/* BOOKINGS LIST */}
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>

            {!loading && bookings?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {bookings.map((item) => (
                  <BookingCard key={item.id} booking={item}/>
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-gray-500">No bookings found</p>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
