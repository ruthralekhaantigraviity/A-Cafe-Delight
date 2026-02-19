-- Create Database
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'CafeSystemDB')
BEGIN
    CREATE DATABASE CafeSystemDB;
END
GO

USE CafeSystemDB;
GO

-- Create Tables Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Tables')
CREATE TABLE Tables (
    TableId INT IDENTITY(1,1) PRIMARY KEY,
    TableNumber INT NOT NULL UNIQUE,
    Capacity INT NOT NULL,
    Status NVARCHAR(20) DEFAULT 'Available' CHECK (Status IN ('Available', 'Booked'))
);
GO

-- Create Customers Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Customers')
CREATE TABLE Customers (
    CustomerId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Phone NVARCHAR(20) NOT NULL
);
GO

-- Create Bookings Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Bookings')
CREATE TABLE Bookings (
    BookingId INT IDENTITY(1,1) PRIMARY KEY,
    CustomerId INT FOREIGN KEY REFERENCES Customers(CustomerId),
    TableId INT FOREIGN KEY REFERENCES Tables(TableId),
    BookingDate DATE NOT NULL,
    BookingTime TIME NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO

-- Create Menu Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Menu')
CREATE TABLE Menu (
    ItemId INT IDENTITY(1,1) PRIMARY KEY,
    ItemName NVARCHAR(100) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    Category NVARCHAR(50),
    IsAvailable BIT DEFAULT 1
);
GO

-- Create Orders Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Orders')
CREATE TABLE Orders (
    OrderId INT IDENTITY(1,1) PRIMARY KEY,
    BookingId INT FOREIGN KEY REFERENCES Bookings(BookingId),
    ItemId INT FOREIGN KEY REFERENCES Menu(ItemId),
    Quantity INT NOT NULL,
    TotalPrice DECIMAL(10, 2) NOT NULL,
    OrderTime DATETIME DEFAULT GETDATE()
);
GO

-- Create Billing Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Billing')
CREATE TABLE Billing (
    BillId INT IDENTITY(1,1) PRIMARY KEY,
    BookingId INT UNIQUE FOREIGN KEY REFERENCES Bookings(BookingId),
    GrandTotal DECIMAL(10, 2) NOT NULL,
    BillDate DATETIME DEFAULT GETDATE(),
    PaymentMethod NVARCHAR(50) DEFAULT 'Cash'
);
GO

-- Insert Default Tables
IF NOT EXISTS (SELECT * FROM Tables)
BEGIN
    INSERT INTO Tables (TableNumber, Capacity, Status) VALUES 
    (1, 2, 'Available'),
    (2, 2, 'Available'),
    (3, 4, 'Available'),
    (4, 4, 'Available'),
    (5, 6, 'Available'),
    (6, 8, 'Available');
END
GO

-- Insert Default Menu Items
IF NOT EXISTS (SELECT * FROM Menu)
BEGIN
    INSERT INTO Menu (ItemName, Price, Category) VALUES
    ('Cappuccino', 4.50, 'Beverage'),
    ('Espresso', 3.00, 'Beverage'),
    ('Latte', 4.00, 'Beverage'),
    ('Croissant', 3.50, 'Food'),
    ('Club Sandwich', 8.50, 'Food'),
    ('Cheesecake', 5.00, 'Dessert');
END
GO
