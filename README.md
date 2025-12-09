MyTravaly Dashboard – Documentation

This project is a dynamic hotel booking dashboard that consumes live API data and visualizes analytics using interactive UI elements and charts.

Project Overview

The objective of this dashboard is to display real-time booking data, provide analytical insights, and visualize metrics through meaningful charts. The API returns dynamically changing data on each request, which simulates real-world booking changes.

The dashboard includes:

Summary statistics

Monthly trends

Recent bookings

Status distribution

Interactive filtering

Architectural Decisions
Component Structure

The application is implemented using a component-based architecture to improve clarity, maintainability, and scalability.

Major UI sections include:

Dashboard view

Stat cards for metrics

Booking cards for latest booking records

Filtering UI

Charts for visual analytics

Each UI section is logically separated to ensure clean management and state updates.

State Management

React hooks are used for managing internal state:

useState → Stores bookings, metrics, trends, filters, and loading state

useEffect → Performs API calls whenever filters change

This ensures automatic UI rendering whenever new responses arrive.

API Integration Strategy

Three API endpoints are used:

1. Bookings

GET /api/bookings?days=7&status=confirmed&order=asc
Used for listing recent bookings and applying filters.

Displayed fields include:

guestName

hotelName

amount

status

paymentStatus

roomType

checkIn / checkOut dates

2. Metrics

GET /api/metrics?days=30
Used to derive summary insights such as:

Total bookings

Revenue

Conversion rate

Occupancy rate

Average booking value

These values populate the stat cards.

3. Trends

GET /api/trends?months=6
Used to display time-series analytics such as:

Revenue changes by month

Booking count changes

Rendered using line and bar charts.

Filtering and Data Refresh

The dashboard includes filters for:

Days range (7, 14, 30)

Status type (confirmed, pending, cancelled, all)

Sorting order (ascending, descending)

When a filter value changes:

New API request is made

State gets updated

UI re-renders with updated results

A manual "Refresh" button is also provided to fetch new randomized data.

Responsive Layout

Tailwind CSS utility classes are used extensively to ensure responsiveness:

Examples include:

Responsive grid columns

Auto scaling spacing

Mobile-first layout

The layout adapts for:

Desktop screens

Tablets

Mobile displays

Loading Indicators and Empty State Handling

When data is being fetched:

Skeleton or placeholder layouts appear

Charts and booking lists show fallback text

If no bookings exist after filtering:

A message such as "No bookings found" is shown

This prevents UI glitches and improves usability.

Visual Design and Branding

A consistent theme is used throughout:

Primary color: Orange (#ff6f61)
Secondary color: Black (#111111)

Used in:

Headers

Buttons

Status labels

Highlights

Charts

This creates a uniform brand identity matching the company.

Summary

The dashboard fulfills all core requirements:

API-based dynamic content rendering

Real-time analytics visualization

Filters affecting UI output

Loading and empty states handled

Mobile-friendly responsive layout

Clean branding and organized UI

The architecture is scalable, easy to extend, and practical for real-world analytics dashboards.