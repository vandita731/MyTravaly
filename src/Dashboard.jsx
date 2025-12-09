import React, { useState, useEffect } from 'react';
import {
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import {
  Calendar, TrendingUp, Users, DollarSign,
  Filter, RefreshCw
} from 'lucide-react';

const API_BASE = 'https://mt-task.onrender.com';

// BRAND LOOK COLORS
const PRIMARY_COLOR = "#ff6f61";
const SECONDARY_COLOR = "#111";  

const COLORS = [
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  "#bbbbbb",
];

const StatCard = ({ title, value, subtitle, icon: Icon }) => (
  <div className="bg-white border shadow-sm hover:shadow-lg rounded-xl p-6 transition duration-300">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-600 font-medium">{title}</p>
        <h3 className="text-3xl font-bold mt-2">{value}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>

      <div className="p-3 border rounded-lg bg-gray-50">
        <Icon className="w-6 h-6" color={SECONDARY_COLOR} />
      </div>
    </div>
  </div>
);


// Booking Card UI
const BookingCard = ({ booking }) => (
  <div className="bg-white border rounded-xl shadow-sm hover:shadow-md p-5 transition">

    <div className="flex justify-between items-center mb-3">
      <h3 className="font-semibold text-lg">{booking.guestName}</h3>

      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
        booking.status === 'confirmed'
          ? 'border-green-500 text-green-700 bg-green-50'
          : booking.status === 'pending'
          ? 'border-yellow-500 text-yellow-700 bg-yellow-50'
          : 'border-red-500 text-red-700 bg-red-50'
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
          booking.paymentStatus === 'paid'
            ? 'border-green-500 text-green-700 bg-green-50'
            : 'border-orange-500 text-orange-700 bg-orange-50'
        }`}>
          {booking.paymentStatus}
        </span>

      </div>

    </div>
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
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <header style={{ background: PRIMARY_COLOR }} className="shadow-md mb-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">


          {/* Logo + Name */}
          <div className="flex items-center gap-3">

            <div style={{
              backgroundColor: PRIMARY_COLOR,
              width: 48,
              height: 48,
              borderRadius: 10,
              border: "2px solid white",
              boxShadow: "0 0 8px rgba(0,0,0,0.3)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "18px",
              color: "white"
            }}>
              MT
            </div>

            <div>
              <h1 className="text-white text-2xl font-bold">MyTravaly India</h1>
              <p className="text-white text-xs opacity-90">Hotel Booking Dashboard</p>
            </div>

          </div>


        </div>
      </header>




      {/* PAGE CONTENT */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">



        {/* FILTER BAR */}
        <div className="bg-white border rounded-xl shadow p-4 flex flex-wrap gap-4 items-center">

          <div className="flex items-center gap-2">
            <Filter size={18} color={SECONDARY_COLOR} />
            <span className="font-semibold text-sm">Filters:</span>
          </div>

          {/* Days */}
          <select
            value={filters.days}
            onChange={(e) => setFilters({ ...filters, days: parseInt(e.target.value) })}
            className="px-4 py-2 border rounded-lg font-medium"
          >
            <option value={7}>Last 7 days</option>
            <option value={14}>Last 14 days</option>
            <option value={30}>Last 30 days</option>
          </select>

          {/* Status */}
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

          {/* Order */}
          <select
            value={filters.order}
            onChange={(e) => setFilters({ ...filters, order: e.target.value })}
            className="px-4 py-2 border rounded-lg font-medium"
          >
            <option value="asc">Oldest First</option>
            <option value="desc">Newest First</option>
          </select>

          <button onClick={fetchData}
            className="ml-auto bg-[var(--orange)] px-4 py-2 rounded-md font-semibold text-white"
            style={{ background: PRIMARY_COLOR }}
          >
            <div className="flex gap-2 items-center">
              <RefreshCw size={18} />
              Refresh
            </div>
          </button>

        </div>


        {/* Stats cards */}
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

        ) : <p className="text-center text-gray-600">Loading...</p>}



        {/* GRAPH SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


          {/* REVENUE LINE CHART */}
          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="font-semibold text-black mb-2">Revenue Trend</h3>
            <ResponsiveContainer height={300}>
              <LineChart data={trends}>
                <CartesianGrid stroke="#ddd" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />

                <Line
                  type="monotone"
                  stroke={PRIMARY_COLOR}
                  strokeWidth={3}
                  dataKey="revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>



          {/* STATUS PIE */}
          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="font-semibold text-black mb-2">Booking Status</h3>

            {statusData.every(item => item.value === 0) ? (
              <p className="text-center text-gray-500 py-20">No booking status available</p>
            ) : (
              <ResponsiveContainer height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

        </div>




        {/* RECENT BOOKINGS */}
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>

          {!loading && bookings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bookings.map((b) => (
                <BookingCard key={b.id} booking={b} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No bookings found</p>
          )}
        </div>


      </div>
    </div>
  );
}
