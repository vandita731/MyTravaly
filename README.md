MyTravaly Dashboard – Documentation

This project is a dynamic hotel booking analytics dashboard built using React and Tailwind CSS. It consumes live API data and presents analytics with a clean and interactive UI.

Project Overview

The objective of this dashboard is to visualize changing booking activity in real-time.
The backend API returns randomized data on each request, simulating real booking trends.

The dashboard provides:

Summary metrics

Monthly trends visualization

Live recent booking records

Status-wise analytics

Filtering and sorting features

Architecture and Key Design Decisions
Application Structure

The application is organized using a clear component-based approach.
Major component groups include:

Dashboard visual layout

Stat cards representing analytics KPIs

Booking card components showing individual booking details

Tabular layout for a users list

Filters and UI controls

Chart components for analytics

This separation improves readability, scalability, and maintenance.

State Management Approach

React hooks are used to manage UI and data state.

useState is used for storing:

Bookings data

Metrics

Trend analytics

Loading state

Applied filters

useEffect is called whenever filters change.
This triggers fresh API calls and ensures automatic UI updates.

API Integration Strategy

The dashboard communicates with three API endpoints:

1. Bookings Endpoint

GET /api/bookings?days=7&status=confirmed&order=asc

Used to list recent bookings and apply filters.

Data used includes:

Guest Name

Hotel Name

Room Type

Amount

Payment Status

Check-in and Check-out dates

2. Metrics Endpoint

GET /api/metrics?days=30

Used to populate summary cards with values such as:

Total Bookings

Total Revenue

Average Booking Value

Occupancy Rate

Conversion Rate

3. Trends Endpoint

GET /api/trends?months=6

Used for month-based visual analytics:

Revenue trend

Booking count trend

Displayed using line/pie charts.

Filtering and Refresh Logic

The dashboard supports multiple filters:

Time period (7, 14, 30 days)

Booking status (confirmed, pending, cancelled, all)

Sorting order (ascending or descending)

When a filter changes:

API request is re-triggered

State updates

UI auto-refreshes

A manual refresh button is also available to fetch latest values.

Responsive Layout

Tailwind CSS utilities provide responsiveness without custom CSS.

The UI adapts smoothly for:

Large displays

Laptop screens

Tablets

Mobile screens

Layout adjustments include:

Automatic column resizing

Collapsible sidebar

Responsive charts

Loading and Empty State Handling

When API requests are in progress:

A loading message is displayed

When booking results are empty:

Proper placeholder message is shown

This ensures better usability and avoids UI breaking.

Visual Design and Branding Strategy

Consistent theme applied throughout the dashboard:

Primary theme color: Orange (#ff6f61)
Secondary text color: Black (#111111)

Used for:

Top navigation

Action buttons

Highlights inside cards

Chart appearance

This produces a uniform brand identity.