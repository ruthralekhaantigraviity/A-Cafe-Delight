# Cafe Billing & Table Booking System

A full-stack web application for managing cafe table bookings, orders, and billing.

## Tech Stack
- **Frontend**: React (Vite) + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MS SQL Server

## Prerequisites
- Node.js installed
- MS SQL Server installed and running

## Setup Instructions

### 1. Database Setup
1. Open SQL Server Management Studio (SSMS).
2. Connect to your SQL Server instance.
3. Open the `backend/schema.sql` file.
4. Execute the script to create the database and tables.

### 2. Run the Application
1. Install dependencies from the root directory:
   ```bash
   npm install
   npm run install-all
   ```
2. Start both frontend and backend specificially:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000` and frontend on `http://localhost:5173`.

## Features
- **Book Table**: Customers can book available tables.
- **Menu**: View menu items and place orders (requires Booking ID).
- **Admin**: Manage menu items, view sales, and generate bills.
