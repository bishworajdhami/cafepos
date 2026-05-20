# Cafe System — UML & System Diagrams

> **Tool:** All diagrams use [Mermaid](https://mermaid.js.org/) syntax.  
> **Render:** [mermaid.live](https://mermaid.live) · VS Code extension **"Markdown Preview Mermaid Support"** (Mermaid v10+).

---

## Table of Contents

1. [System Overview Diagrams](#1-system-overview-diagrams)
2. [Use Case Diagrams](#2-use-case-diagrams)
3. [Activity Diagrams](#3-activity-diagrams)
4. [Sequence Diagrams](#4-sequence-diagrams)
5. [ERD — Entity Relationship Diagrams](#5-erd--entity-relationship-diagrams)
6. [Class Diagrams](#6-class-diagrams)
7. [Project Management](#7-project-management)

---

## 1. System Overview Diagrams

### 1.1 — Functional Decomposition Diagram (FDD)

```mermaid
---
title: "Functional Decomposition Diagram — Café Management System"
---
%%{init: {"flowchart": {"curve": "step", "nodeSpacing": 80, "rankSpacing": 100}} }%%
graph TD
    classDef system   fill:#7c3aed,stroke:#5b21b6,color:#fff,font-weight:bold
    classDef subsys   fill:#1e40af,stroke:#1d4ed8,color:#fff,font-weight:bold
    classDef module   fill:#0e7490,stroke:#0891b2,color:#fff
    classDef support  fill:#059669,stroke:#047857,color:#fff

    CMS["Café Management System"]:::system

    S1["Subsystem 1:<br/>Authentication & User Management"]:::subsys
    S2["Subsystem 2:<br/>Order, Table & Payment Management"]:::subsys
    S3["Subsystem 3:<br/>Stock, Reporting & System Configuration"]:::subsys

    A1["User Login & Authentication"]:::module
    A2["OTP Email Verification"]:::module
    A3["Password Reset"]:::module
    A4["Staff Account Management"]:::module
    A5["Role & Permission Management"]:::module

    O1["Order Management"]:::module
    O2["Kitchen Display System"]:::module
    O3["Table Session Management"]:::module
    O4["Table Booking System"]:::module
    O5["Payment Processing"]:::module
    O6["Bill Splitting & Refunds"]:::module
    O7["Cash Shift Closing"]:::module

    R1["Stock Management"]:::module
    R2["Business Insights & Reports"]:::module
    R3["Menu & Category Management"]:::module
    R4["Discount Engine"]:::module
    R5["System Settings Configuration"]:::module

    API["ASP.NET Core Web API (C#)"]:::support
    DB["SQL Server Database"]:::support
    CACHE["Real-time Communication (SignalR)"]:::support
    FE["React.js Frontend"]:::support

    CMS --> S1 & S2 & S3
    S1 --> A1 & A2 & A3 & A4 & A5
    S2 --> O1 & O2 & O3 & O4 & O5 & O6 & O7
    S3 --> R1 & R2 & R3 & R4 & R5

    S1 & S2 & S3 --> API
    API --> DB & CACHE
    CACHE --> FE
```

---

### 1.2 — System Architecture Overview

```mermaid
---
title: "System Architecture — Café Management System"
---
%%{init: {"flowchart": {"curve": "step", "nodeSpacing": 70, "rankSpacing": 100}} }%%
graph TB
    classDef frontend fill:#ec4899,stroke:#be185d,color:#fff,font-weight:bold
    classDef api      fill:#3b82f6,stroke:#1d4ed8,color:#fff,font-weight:bold
    classDef service  fill:#10b981,stroke:#059669,color:#fff,font-weight:bold
    classDef database fill:#f59e0b,stroke:#d97706,color:#fff,font-weight:bold
    classDef external fill:#8b5cf6,stroke:#6d28d9,color:#fff,font-weight:bold

    Browser["Web Browser<br/>(Manager/Cashier/Chef/Waiter)"]:::frontend

    React["React.js Frontend<br/>(TypeScript/JSX)<br/>- Routing (react-router)<br/>- State Management (Context)<br/>- HTTP Client (axios)<br/>- SignalR Client (@microsoft/signalr)"]:::frontend

    CORS["CORS Configuration<br/>& JWT Token Handling"]:::api

    API["ASP.NET Core Web API<br/>(C# .NET 6+)<br/>- Controllers (REST endpoints)<br/>- JWT Authentication<br/>- Authorization Middleware<br/>- SignalR Hubs"]:::api

    EFC["Entity Framework Core<br/>(ORM Layer)<br/>- Code-First Migrations<br/>- LINQ Queries<br/>- Change Tracking"]:::service

    SignalR["SignalR Hub<br/>(Real-time Communication)<br/>- Order Updates<br/>- Kitchen Notifications<br/>- Payment Events<br/>- Group Broadcasting"]:::service

    EmailService["Email Service<br/>(SMTP)<br/>- OTP Delivery<br/>- Password Reset Tokens"]:::external

    MSSQL["SQL Server Database<br/>- Users & Roles<br/>- Orders & OrderItems<br/>- Payments & Refunds<br/>- MenuItems & Categories<br/>- Stock & Batches<br/>- TableSessions & Bookings<br/>- CashClosing & Transactions<br/>- Discounts & Settings"]:::database

    Browser <--> |HTTP & WebSocket| React
    React <--> |AJAX/REST| CORS
    CORS <--> |Requests/Responses| API
    API <--> |Connection String| EFC
    EFC <--> |SQL Queries| MSSQL
    API <--> |Hub Protocol| SignalR
    SignalR <--> |Server Push| React
    API <--> |SMTP| EmailService

    style Browser fill:#f3f4f6,stroke:#9ca3af,color:#1f2937
```

---

## 2. Use Case Diagrams

### 2.1 — Authentication (All Roles)

```mermaid
---
title: "Use Case Diagram — Authentication (All Roles)"
---
%%{init: {"flowchart": {"curve": "step", "nodeSpacing": 60, "rankSpacing": 80}} }%%
flowchart TD
    classDef actor   fill:#7c3aed,stroke:#5b21b6,color:#fff,font-weight:bold
    classDef usecase fill:#1e40af,stroke:#1d4ed8,color:#fff
    classDef extend  fill:#0e7490,stroke:#0891b2,color:#fff

    M([Manager]):::actor
    C([Cashier]):::actor
    Ch([Chef]):::actor
    W([Waiter]):::actor

    UC1[Login with Email and Password]:::usecase
    UC2[First-Login OTP Verification]:::extend
    UC3[Set New Password]:::extend
    UC4[Forgot Password]:::usecase
    UC5[Enter Reset OTP]:::extend
    UC6[Reset Password]:::extend

    M & C & Ch & W --> UC1
    UC1 -->|first login| UC2
    UC2 --> UC3
    UC1 -->|forgot password| UC4
    UC4 --> UC5
    UC5 --> UC6
```

---

### 2.2 — Manager Use Cases

```mermaid
---
title: "Use Case Diagram — Manager"
---
%%{init: {"flowchart": {"curve": "step", "nodeSpacing": 60, "rankSpacing": 80}} }%%
flowchart TD
    classDef actor   fill:#7c3aed,stroke:#5b21b6,color:#fff,font-weight:bold
    classDef usecase fill:#1e40af,stroke:#1d4ed8,color:#fff

    M([Manager]):::actor

    subgraph SM["Staff Management"]
        UC1[Create Staff Account]:::usecase
        UC2[Edit Staff Details]:::usecase
        UC3[Set Staff Permissions]:::usecase
        UC4[Reset Staff Password]:::usecase
    end

    subgraph MD["Menu and Discounts"]
        UC5[Add and Edit Menu Items]:::usecase
        UC6[Manage Categories]:::usecase
        UC7[Configure Discounts]:::usecase
        UC8[Toggle Item Availability]:::usecase
    end

    subgraph RF["Reports and Finance"]
        UC9[View Business Insights]:::usecase
        UC10[View Cash Closing Records]:::usecase
        UC11[Manage Cash Transactions]:::usecase
    end

    subgraph SC["System Configuration"]
        UC12[Configure System Settings]:::usecase
        UC13[Manage Stock Items]:::usecase
        UC14[View Stock Levels]:::usecase
    end

    M --> UC1 & UC2 & UC3 & UC4
    M --> UC5 & UC6 & UC7 & UC8
    M --> UC9 & UC10 & UC11
    M --> UC12 & UC13 & UC14
```

---

### 2.3 — Cashier Use Cases

```mermaid
---
title: "Use Case Diagram — Cashier"
---
%%{init: {"flowchart": {"curve": "step", "nodeSpacing": 60, "rankSpacing": 80}} }%%
flowchart TD
    classDef actor   fill:#7c3aed,stroke:#5b21b6,color:#fff,font-weight:bold
    classDef usecase fill:#1e40af,stroke:#1d4ed8,color:#fff

    C([Cashier]):::actor
    Cust([Customer]):::actor

    subgraph OM["Order Management"]
        UC1[Take Dine-in Order]:::usecase
        UC2[Take Takeaway Order]:::usecase
        UC3[Apply Discount to Order]:::usecase
        UC4[Add Special Request to Item]:::usecase
    end

    subgraph TB["Table and Booking"]
        UC5[Open Table Session]:::usecase
        UC6[Close Table Session]:::usecase
        UC7[Create Table Booking]:::usecase
        UC8[Link Order to Booking]:::usecase
    end

    subgraph PR["Payment and Refund"]
        UC9[Process Cash Payment]:::usecase
        UC10[Process Card Payment]:::usecase
        UC11[Process Mobile Payment]:::usecase
        UC12[Split Bill Among Payers]:::usecase
        UC13[Process Full Refund]:::usecase
        UC14[Process Partial Refund]:::usecase
    end

    subgraph SH["Shift"]
        UC15[Close Cash Shift]:::usecase
        UC16[Enter Cash Drawer Count]:::usecase
    end

    C --> UC1 & UC2 & UC3 & UC4
    C --> UC5 & UC6 & UC7 & UC8
    C --> UC9 & UC10 & UC11 & UC12 & UC13 & UC14
    C --> UC15 & UC16
    Cust --> UC1 & UC2 & UC7
```

---

### 2.4 — Chef & Waiter Use Cases

```mermaid
---
title: "Use Case Diagram — Chef and Waiter"
---
%%{init: {"flowchart": {"curve": "step", "nodeSpacing": 60, "rankSpacing": 80}} }%%
flowchart TD
    classDef actor   fill:#7c3aed,stroke:#5b21b6,color:#fff,font-weight:bold
    classDef usecase fill:#1e40af,stroke:#1d4ed8,color:#fff

    Ch([Chef]):::actor
    W([Waiter]):::actor

    subgraph CK["Kitchen — Chef"]
        UC1[View Kitchen Order Queue]:::usecase
        UC2[Mark Order as Preparing]:::usecase
        UC3[Mark Order as Ready]:::usecase
        UC4[Track Stock Levels]:::usecase
        UC5[Configure Kitchen Settings]:::usecase
        UC6[View Low Stock Alerts]:::usecase
    end

    subgraph WT["Service — Waiter"]
        UC7[View Assigned Orders]:::usecase
        UC8[Update Order Status]:::usecase
        UC9[Notify Cashier — Order Ready]:::usecase
    end

    Ch --> UC1 & UC2 & UC3 & UC4 & UC5 & UC6
    W --> UC7 & UC8 & UC9
```

---

## 3. Activity Diagrams

### 3.1 — Authentication Flow

```mermaid
---
title: "Activity Diagram — Authentication Flow"
---
%%{init: {"flowchart": {"curve": "step", "nodeSpacing": 60, "rankSpacing": 80}} }%%
flowchart TD
    classDef startEnd fill:#059669,stroke:#047857,color:#fff,font-weight:bold
    classDef process  fill:#1e40af,stroke:#1d4ed8,color:#fff
    classDef decision fill:#b45309,stroke:#92400e,color:#fff
    classDef redirect fill:#0e7490,stroke:#0891b2,color:#fff

    Start([User Opens App]):::startEnd
    A[Enter Email and Password]:::process
    B{Credentials Valid?}:::decision
    C[Show Error Message]:::process
    D{Is First Login?}:::decision
    E[Send OTP to Email]:::process
    F[User Enters OTP]:::process
    G{OTP Valid?}:::decision
    H[Show OTP Error]:::process
    I[Prompt Set New Password]:::process
    J[User Sets Password]:::process
    K[Mark IsFirstLogin = false]:::process
    L[Generate JWT Token]:::process
    M{Check Role}:::decision
    N[/manager]:::redirect
    O[/cashier]:::redirect
    P[/chef]:::redirect
    Q[/waiter]:::redirect

    Start --> A --> B
    B -- No --> C --> A
    B -- Yes --> D
    D -- Yes --> E --> F --> G
    G -- No --> H --> F
    G -- Yes --> I --> J --> K --> L
    D -- No --> L
    L --> M
    M -- Manager --> N
    M -- Cashier --> O
    M -- Chef --> P
    M -- Waiter --> Q
```

---

### 3.2 — Forgot / Reset Password Flow

```mermaid
---
title: "Activity Diagram — Forgot and Reset Password"
---
%%{init: {"flowchart": {"curve": "step", "nodeSpacing": 60, "rankSpacing": 80}} }%%
flowchart TD
    classDef startEnd fill:#059669,stroke:#047857,color:#fff,font-weight:bold
    classDef process  fill:#1e40af,stroke:#1d4ed8,color:#fff
    classDef decision fill:#b45309,stroke:#92400e,color:#fff
    classDef error    fill:#dc2626,stroke:#b91c1c,color:#fff

    Start([Login Page]):::startEnd
    A[Click Forgot Password]:::process
    B[Enter Registered Email]:::process
    C{Email Exists?}:::decision
    D[Show Not Found Error]:::error
    E[Send Reset OTP to Email]:::process
    F[User Enters OTP]:::process
    G{OTP Valid and Not Expired?}:::decision
    H[Show OTP Error]:::error
    I[Enter New Password]:::process
    J[Confirm New Password]:::process
    K{Passwords Match?}:::decision
    L[Show Mismatch Error]:::error
    M[Save Hashed Password]:::process
    End([Redirect to Login]):::startEnd

    Start --> A --> B --> C
    C -- No --> D --> B
    C -- Yes --> E --> F --> G
    G -- No --> H --> F
    G -- Yes --> I --> J --> K
    K -- No --> L --> I
    K -- Yes --> M --> End
```

---

### 3.3 — Order Creation (Part A)

```mermaid
---
title: "Activity Diagram — Order Creation (Part A)"
---
%%{init: {"flowchart": {"curve": "step", "nodeSpacing": 60, "rankSpacing": 80}} }%%
flowchart TD
    classDef startEnd fill:#059669,stroke:#047857,color:#fff,font-weight:bold
    classDef process  fill:#1e40af,stroke:#1d4ed8,color:#fff
    classDef decision fill:#b45309,stroke:#92400e,color:#fff
    classDef system   fill:#0e7490,stroke:#0891b2,color:#fff

    Start([Customer Arrives]):::startEnd
    A[Cashier Opens Order Screen]:::process
    B{Order Type?}:::decision
    C[Select Floor and Table Number]:::process
    D[Skip Table Selection]:::process
    E{Existing Booking?}:::decision
    F[Link Session to Booking]:::process
    G[Create Walk-in Table Session]:::process
    H[Browse Menu Items]:::process
    I[Add Items to Cart]:::process
    J{More Items?}:::decision
    K{Apply Discount?}:::decision
    L[Select Discount Code or Offer]:::process
    M[Skip Discount]:::process
    N[Review Order Summary]:::process
    O[Submit Order]:::process
    P[Order Status: Pending]:::system
    End([Kitchen Notified via SignalR]):::startEnd

    Start --> A --> B
    B -- Dine-in --> C --> E
    B -- Takeaway --> D
    E -- Yes --> F
    E -- No --> G
    F & G & D --> H --> I --> J
    J -- Yes --> H
    J -- No --> K
    K -- Yes --> L
    K -- No --> M
    L & M --> N --> O --> P --> End
```

---

### 3.4 — Kitchen & Payment (Part B)

```mermaid
---
title: "Activity Diagram — Kitchen and Payment (Part B)"
---
%%{init: {"flowchart": {"curve": "step", "nodeSpacing": 60, "rankSpacing": 80}} }%%
flowchart TD
    classDef startEnd fill:#059669,stroke:#047857,color:#fff,font-weight:bold
    classDef process  fill:#1e40af,stroke:#1d4ed8,color:#fff
    classDef decision fill:#b45309,stroke:#92400e,color:#fff
    classDef system   fill:#0e7490,stroke:#0891b2,color:#fff
    classDef refund   fill:#dc2626,stroke:#b91c1c,color:#fff

    Start([Kitchen Receives Order]):::startEnd
    A[Chef Views Order in Queue]:::process
    B[Chef Clicks Start Preparing]:::process
    C[Order Status: Preparing]:::system
    D[Chef Completes Dish]:::process
    E[Chef Clicks Mark Ready]:::process
    F[Order Status: Ready]:::system
    G[Cashier and Waiter Notified via SignalR]:::system
    H{Payment Method?}:::decision
    I[Process Full Payment]:::process
    J[Enter No. of Payers]:::process
    K[Collect Each Split Amount]:::process
    L[Generate Receipt]:::process
    M{Refund Requested?}:::decision
    N{Full or Partial?}:::decision
    O[Refund Entire Order]:::refund
    P[Refund Selected Items]:::refund
    Q[Record Refund Entry]:::process
    R[Close Table Session]:::process
    End([Session Complete]):::startEnd

    Start --> A --> B --> C --> D --> E --> F --> G --> H
    H -- Single --> I
    H -- Split --> J --> K --> I
    I --> L --> M
    M -- Yes --> N
    N -- Full --> O
    N -- Partial --> P
    O & P --> Q --> R
    M -- No --> R
    R --> End
```

---

### 3.5 — Cash Closing (Shift End)

```mermaid
---
title: "Activity Diagram — Cash Closing (Shift End)"
---
%%{init: {"flowchart": {"curve": "step", "nodeSpacing": 60, "rankSpacing": 80}} }%%
flowchart TD
    classDef startEnd fill:#059669,stroke:#047857,color:#fff,font-weight:bold
    classDef process  fill:#1e40af,stroke:#1d4ed8,color:#fff
    classDef decision fill:#b45309,stroke:#92400e,color:#fff
    classDef warning  fill:#dc2626,stroke:#b91c1c,color:#fff

    Start([End of Shift]):::startEnd
    A[Cashier Opens Cash Closing Dashboard]:::process
    B[System Fetches Today Sales Summary]:::process
    C[Display: Sales / Orders / Payment Breakdown]:::process
    D[Cashier Counts Physical Cash in Drawer]:::process
    E[Enter Cash in Drawer Amount]:::process
    F[Enter Cash Expenses]:::process
    G[System Calculates Expected vs Actual]:::process
    H{Discrepancy Found?}:::decision
    I[Show Variance Warning]:::warning
    J[Cashier Reviews and Adds Notes]:::process
    K[Cashier Submits Cash Closing]:::process
    L[System Records CashClosing Entry]:::process
    M[Manager Views Record in Reports]:::process
    End([Shift Closed]):::startEnd

    Start --> A --> B --> C --> D --> E --> F --> G --> H
    H -- Yes --> I --> J
    H -- No --> J
    J --> K --> L --> M --> End
```

---

## 4. Sequence Diagrams

### 4.1 — Login & Authentication

```mermaid
---
title: "Sequence Diagram — Login and Authentication"
---
sequenceDiagram
    actor User
    participant FE as React Frontend
    participant API as ASP.NET Core API
    participant DB as SQL Database

    User->>FE: Enter email & password
    FE->>API: POST /api/login {email, password}
    API->>DB: SELECT User WHERE Email = ?
    DB-->>API: User record
    API->>API: Verify bcrypt password hash
    alt Invalid credentials
        API-->>FE: 401 Unauthorized
    else First Login
        API->>DB: Generate & store OTP
        API-->>FE: 200 — Redirect to /first-login-otp
        User->>FE: Enter OTP
        FE->>API: POST /api/login/verify-otp {otp}
        API->>DB: Validate OTP & expiry
        API-->>FE: 200 — Redirect to /set-new-password
    else Normal Login
        API->>API: Generate JWT Token (role, userId)
        API-->>FE: 200 OK {token, role}
        FE->>FE: Store token in localStorage
        FE-->>User: Redirect to role dashboard
    end
```

---

### 4.2 — Cashier Places an Order

```mermaid
---
title: "Sequence Diagram — Cashier Places an Order"
---
sequenceDiagram
    actor Cashier
    participant FE as React Frontend
    participant API as ASP.NET Core API
    participant DB as SQL Database
    participant Hub as SignalR Hub
    actor Chef

    Cashier->>FE: Open new order form
    FE->>API: GET /api/cashier/menu
    API->>DB: SELECT MenuItems WHERE IsDeleted=false
    DB-->>API: Menu items
    API-->>FE: 200 OK — Menu JSON

    Cashier->>FE: Add items & submit order
    FE->>API: POST /api/cashierorders {items, tableNo, type}
    API->>DB: INSERT Order + OrderItems
    DB-->>API: New Order ID
    API->>Hub: Broadcast OrderCreated {orderId}
    Hub-->>Chef: Real-time new order notification
    API-->>FE: 201 Created — Order details
```

---

### 4.3 — Kitchen Status Update

```mermaid
---
title: "Sequence Diagram — Kitchen Status Update"
---
sequenceDiagram
    actor Chef
    participant FE as React Frontend
    participant API as ASP.NET Core API
    participant DB as SQL Database
    participant Hub as SignalR Hub
    actor Cashier

    Chef->>FE: Click "Start Preparing"
    FE->>API: PATCH /api/kitchen/{orderId}/status {status:"Preparing"}
    API->>DB: UPDATE Order SET Status="Preparing"
    API->>Hub: Broadcast OrderStatusUpdated
    Hub-->>Cashier: Status update notification

    Chef->>FE: Click "Mark Ready"
    FE->>API: PATCH /api/kitchen/{orderId}/status {status:"Ready"}
    API->>DB: UPDATE Order SET Status="Ready", ReadyAt=NOW()
    API->>Hub: Broadcast OrderReady {orderId}
    Hub-->>Cashier: Order ready notification
```

---

### 4.4 — Payment Processing

```mermaid
---
title: "Sequence Diagram — Payment Processing"
---
sequenceDiagram
    actor Cashier
    participant FE as React Frontend
    participant API as ASP.NET Core API
    participant DB as SQL Database

    Cashier->>FE: Open payment screen for order
    FE->>API: GET /api/cashierorders/{orderId}
    API-->>FE: Order total & breakdown

    alt Single Payment
        Cashier->>FE: Select method (Cash/Card/Mobile) & confirm
        FE->>API: POST /api/cashierpayments {orderId, amount, method}
        API->>DB: INSERT Payment
        API->>DB: UPDATE Order.PaymentStatus = "paid"
        API-->>FE: 200 OK — Receipt data
    else Split Bill
        Cashier->>FE: Enter split count & each payer amount
        FE->>API: POST /api/cashierpayments {isSplit:true, splits[]}
        API->>DB: INSERT Payment + BillSplit records
        API->>DB: UPDATE Order.PaymentStatus = "paid"
        API-->>FE: 200 OK — Receipt data
    end
    FE-->>Cashier: Display receipt
```

---

### 4.5 — Table Booking Flow

```mermaid
---
title: "Sequence Diagram — Table Booking"
---
sequenceDiagram
    actor Cashier
    participant FE as React Frontend
    participant API as ASP.NET Core API
    participant DB as SQL Database

    Cashier->>FE: Open booking screen
    FE->>API: GET /api/tablebooking/available-seats
    API->>DB: SELECT TableSeat WHERE Status="Available"
    DB-->>API: Available seats
    API-->>FE: Seat list

    Cashier->>FE: Select seat, customer name, time & duration
    FE->>API: POST /api/tablebooking {floor, table, seat, customer, startTime, duration}
    API->>DB: INSERT TableBooking
    API->>DB: UPDATE TableSeat.Status = "Reserved"
    API-->>FE: 201 Created — Booking details
    FE-->>Cashier: Booking confirmation
```

---

## 5. ERD — Entity Relationship Diagrams

### 5.1 — Users & Authentication

```mermaid
---
title: "ERD — Users and Authentication"
---
erDiagram
    USER {
        int Id PK
        string Email
        string Password
        string Role
        string Name
        bool EmailVerified
        string OTP
        datetime OTPExpiry
        bool IsFirstLogin
        string TemporaryPassword
        string ProfilePictureUrl
        string Permissions
    }
    SETTING {
        int Id PK
        string Key
        string Value
        datetime UpdatedAt
    }
```

---

### 5.2 — Orders & Payments

```mermaid
---
title: "ERD — Orders and Payments"
---
erDiagram
    ORDER {
        int Id PK
        int UserId FK
        int TableSessionId FK
        int BookingId FK
        string OrderType
        string TableNumber
        string Status
        decimal Subtotal
        decimal Tax
        decimal ServiceCharge
        decimal Total
        string PaymentStatus
        datetime CreatedAt
        datetime ReadyAt
    }
    ORDER_ITEM {
        int Id PK
        int OrderId FK
        int MenuItemId FK
        string Name
        int Quantity
        decimal Price
        string SpecialRequest
    }
    PAYMENT {
        int Id PK
        int OrderId FK
        int TableSessionId FK
        decimal Amount
        string Method
        string MobilePaymentApp
        bool IsSplit
        int SplitCount
        datetime PaymentDate
    }
    BILL_SPLIT {
        int Id PK
        int PaymentId FK
        decimal Amount
        string Payer
    }
    REFUND {
        int Id PK
        int OrderId FK
        decimal TotalAmount
        string RefundType
        string Reason
        datetime RefundDate
    }
    REFUND_ITEM {
        int Id PK
        int RefundId FK
        int OrderItemId FK
        string Name
        int Quantity
        decimal Amount
    }

    ORDER ||--o{ ORDER_ITEM : "contains"
    ORDER ||--o{ PAYMENT : "paid via"
    ORDER ||--o{ REFUND : "refunded by"
    PAYMENT ||--o{ BILL_SPLIT : "split into"
    REFUND ||--o{ REFUND_ITEM : "contains"
    ORDER_ITEM ||--o{ REFUND_ITEM : "refunded as"
```

---

### 5.3 — Menu & Discounts

```mermaid
---
title: "ERD — Menu and Discounts"
---
erDiagram
    MENU_ITEM {
        int Id PK
        string Name
        decimal Price
        string Category
        bool IsAvailable
        bool IsVatExempt
        bool IsDeleted
    }
    CATEGORY {
        int Id PK
        string Name
        datetime CreatedAt
    }
    DISCOUNT {
        int Id PK
        string Name
        string Description
        string DiscountType
        string OfferType
        decimal Value
        datetime StartDate
        datetime EndDate
        decimal MinPurchaseAmount
        bool Active
        datetime CreatedAt
    }
    DISCOUNT_MENU_ITEM {
        int Id PK
        int DiscountId FK
        int MenuItemId FK
        datetime CreatedAt
    }

    MENU_ITEM }o--|| CATEGORY : "belongs to"
    DISCOUNT ||--o{ DISCOUNT_MENU_ITEM : "applies to"
    MENU_ITEM ||--o{ DISCOUNT_MENU_ITEM : "included in"
```

---

### 5.4 — Tables, Sessions & Bookings

```mermaid
---
title: "ERD — Tables, Sessions and Bookings"
---
erDiagram
    TABLE_SESSION {
        int Id PK
        string FloorName
        string TableNumber
        string Status
        string CustomerName
        string CustomerPhone
        int BookingId FK
        int CurrentOrderId FK
        datetime OpenedAt
        datetime ClosedAt
    }
    TABLE_SESSION_CHARGE {
        int Id PK
        int TableSessionId FK
        string Type
        decimal Amount
        string Status
        datetime CreatedAt
        datetime PaidAt
    }
    TABLE_BOOKING {
        int Id PK
        string FloorName
        string TableNumber
        int SeatNumber
        string CustomerName
        string CustomerPhone
        datetime StartTime
        datetime EndTime
        int DurationMinutes
        string Status
        int OrderId FK
    }
    TABLE_SEAT {
        int Id PK
        string FloorName
        string TableNumber
        int SeatNumber
        string Status
        int OrderId FK
        int BookingId FK
        datetime OccupiedAt
        datetime AutoReleaseAt
    }

    TABLE_SESSION ||--o{ TABLE_SESSION_CHARGE : "has charges"
    TABLE_SESSION }o--o| TABLE_BOOKING : "originated from"
    TABLE_BOOKING ||--o{ TABLE_SEAT : "reserves"
```

---

### 5.5 — Stock & Cash Management

```mermaid
---
title: "ERD — Stock and Cash Management"
---
erDiagram
    STOCK_ITEM {
        int Id PK
        string Name
        decimal CurrentStock
        decimal MinStock
        string Unit
        string Category
        bool LowStock
        decimal DailyDecayRate
        datetime LastDecayUpdate
    }
    STOCK_BATCH {
        int Id PK
        int StockItemId FK
        decimal Quantity
        decimal CostPerUnit
        datetime ExpiryDate
        datetime CreatedAt
    }
    STOCK_TRANSACTION {
        int Id PK
        int StockItemId FK
        string TransactionType
        decimal Quantity
        string Reason
        datetime CreatedAt
    }
    CASH_CLOSING {
        int Id PK
        datetime Date
        decimal TotalSales
        int TotalOrders
        decimal CashInDrawer
        decimal OpeningCash
        decimal CashExpenses
        decimal CashSales
        decimal CardSales
        decimal MobileSales
        int SubmittedByUserId FK
        datetime ClosedAt
    }
    CASH_TRANSACTION {
        int Id PK
        datetime Date
        string Type
        decimal Amount
        string Reason
        int UserId FK
    }

    STOCK_ITEM ||--o{ STOCK_BATCH : "stocked via"
    STOCK_ITEM ||--o{ STOCK_TRANSACTION : "tracked by"
```

---

## 6. Class Diagrams

### 6.1 — User Role Hierarchy

```mermaid
---
title: "Class Diagram — User Role Hierarchy"
---
classDiagram
    class User {
        +int Id
        +string Email
        +string Password
        +string Role
        +string Name
        +bool EmailVerified
        +string OTP
        +DateTime OTPExpiry
        +bool IsFirstLogin
        +string ProfilePictureUrl
        +string Permissions
    }
    class Manager {
        +ManageStaff()
        +SetPermissions()
        +ConfigureSettings()
        +ViewReports()
        +ManageMenu()
        +ManageStock()
        +ManageDiscounts()
        +ManageCash()
    }
    class Cashier {
        +PlaceOrder()
        +ProcessPayment()
        +SplitBill()
        +ProcessRefund()
        +ManageTableSession()
        +CreateBooking()
        +CloseShift()
    }
    class Chef {
        +ViewOrders()
        +MarkPreparing()
        +MarkReady()
        +TrackStock()
        +ConfigureKitchen()
    }
    class Waiter {
        +ViewOrders()
        +UpdateOrderStatus()
        +NotifyCashier()
    }

    User <|-- Manager
    User <|-- Cashier
    User <|-- Chef
    User <|-- Waiter
```

---

### 6.2 — Order & Payment Classes

```mermaid
---
title: "Class Diagram — Order and Payment"
---
classDiagram
    class Order {
        +int Id
        +int UserId
        +int TableSessionId
        +string OrderType
        +string TableNumber
        +string Status
        +decimal Subtotal
        +decimal Tax
        +decimal ServiceCharge
        +decimal Total
        +string PaymentStatus
        +DateTime CreatedAt
        +DateTime ReadyAt
        +List~OrderItem~ Items
    }
    class OrderItem {
        +int Id
        +int OrderId
        +int MenuItemId
        +string Name
        +int Quantity
        +decimal Price
        +string SpecialRequest
    }
    class Payment {
        +int Id
        +int OrderId
        +decimal Amount
        +string Method
        +string MobilePaymentApp
        +bool IsSplit
        +int SplitCount
        +DateTime PaymentDate
    }
    class BillSplit {
        +int Id
        +int PaymentId
        +decimal Amount
        +string Payer
    }
    class Refund {
        +int Id
        +int OrderId
        +decimal TotalAmount
        +string RefundType
        +string Reason
        +DateTime RefundDate
        +List~RefundItem~ RefundItems
    }
    class RefundItem {
        +int Id
        +int RefundId
        +int OrderItemId
        +string Name
        +int Quantity
        +decimal Amount
    }

    Order "1" --> "many" OrderItem
    Order "1" --> "many" Payment
    Order "1" --> "many" Refund
    Payment "1" --> "many" BillSplit
    Refund "1" --> "many" RefundItem
    OrderItem "1" --> "many" RefundItem
```

---

### 6.3 — Menu, Category & Discount Classes

```mermaid
---
title: "Class Diagram — Menu, Category and Discount"
---
classDiagram
    class MenuItem {
        +int Id
        +string Name
        +decimal Price
        +string Category
        +bool IsAvailable
        +bool IsVatExempt
        +bool IsDeleted
    }
    class Category {
        +int Id
        +string Name
        +DateTime CreatedAt
    }
    class Discount {
        +int Id
        +string Name
        +string DiscountType
        +string OfferType
        +decimal Value
        +DateTime StartDate
        +DateTime EndDate
        +decimal MinPurchaseAmount
        +bool Active
        +List~DiscountMenuItem~ DiscountMenuItems
    }
    class DiscountMenuItem {
        +int Id
        +int DiscountId
        +int MenuItemId
        +DateTime CreatedAt
    }

    MenuItem --> Category : "belongs to"
    Discount "1" --> "many" DiscountMenuItem
    MenuItem "1" --> "many" DiscountMenuItem
```

---

### 6.4 — Table Session & Booking Classes

```mermaid
---
title: "Class Diagram — Table Session and Booking"
---
classDiagram
    class TableSession {
        +int Id
        +string FloorName
        +string TableNumber
        +string Status
        +string CustomerName
        +string CustomerPhone
        +int BookingId
        +DateTime OpenedAt
        +DateTime ClosedAt
    }
    class TableSessionCharge {
        +int Id
        +int TableSessionId
        +string Type
        +decimal Amount
        +string Status
        +DateTime CreatedAt
        +DateTime PaidAt
    }
    class TableBooking {
        +int Id
        +string FloorName
        +string TableNumber
        +int SeatNumber
        +string CustomerName
        +string CustomerPhone
        +DateTime StartTime
        +DateTime EndTime
        +string Status
        +int OrderId
    }
    class TableSeat {
        +int Id
        +string FloorName
        +string TableNumber
        +int SeatNumber
        +string Status
        +int OrderId
        +int BookingId
        +DateTime OccupiedAt
        +DateTime AutoReleaseAt
    }

    TableSession "1" --> "many" TableSessionCharge
    TableSession --> TableBooking : "originated from"
    TableBooking "1" --> "many" TableSeat
```

---

### 6.5 — Stock & Cash Classes

```mermaid
---
title: "Class Diagram — Stock and Cash"
---
classDiagram
    class StockItem {
        +int Id
        +string Name
        +decimal CurrentStock
        +decimal MinStock
        +string Unit
        +string Category
        +bool LowStock
        +decimal DailyDecayRate
        +DateTime LastDecayUpdate
    }
    class StockBatch {
        +int Id
        +int StockItemId
        +decimal Quantity
        +decimal CostPerUnit
        +DateTime ExpiryDate
        +DateTime CreatedAt
    }
    class StockTransaction {
        +int Id
        +int StockItemId
        +string TransactionType
        +decimal Quantity
        +string Reason
        +DateTime CreatedAt
    }
    class CashClosing {
        +int Id
        +DateTime Date
        +decimal TotalSales
        +int TotalOrders
        +decimal CashInDrawer
        +decimal OpeningCash
        +decimal CashExpenses
        +decimal CashSales
        +decimal CardSales
        +decimal MobileSales
        +int SubmittedByUserId
        +DateTime ClosedAt
    }
    class CashTransaction {
        +int Id
        +DateTime Date
        +string Type
        +decimal Amount
        +string Reason
        +int UserId
    }
    class Setting {
        +int Id
        +string Key
        +string Value
        +DateTime UpdatedAt
    }
    class Report {
        +int Id
        +string Type
        +DateTime GeneratedAt
        +string Data
    }

    StockItem "1" --> "many" StockBatch
    StockItem "1" --> "many" StockTransaction
```

---

## 7. Project Management

### 7.1 — Development Timeline (Gantt Chart)

```mermaid
---
title: "Gantt Chart — Café Management System Development (Sprint Schedule)"
---
gantt
    title Project Timeline — 17 Weeks
    dateFormat YYYY-MM-DD
    
    section Planning & Setup
    Project Setup & Planning :setup, 2025-01-06, 14d
    Database Schema Design :dbdesign, 2025-01-06, 21d
    Architecture & Tech Stack :arch, 2025-01-13, 14d
    
    section Sprint 1
    Sprint 1: Auth & User Mgmt :sprint1, 2025-01-20, 21d
    - API Endpoints Dev :s1api, 2025-01-20, 14d
    - JWT & Auth Flow :s1jwt, 2025-01-22, 12d
    - OTP Email System :s1otp, 2025-01-27, 9d
    - React Login UI :s1ui, 2025-01-20, 14d
    - Integration Testing :s1test, 2025-02-03, 5d
    
    section Sprint 2
    Sprint 2: Orders & Kitchen :sprint2, 2025-02-10, 21d
    - Menu API Dev :s2menu, 2025-02-10, 10d
    - Order Creation API :s2order, 2025-02-12, 12d
    - SignalR Hub Setup :s2signal, 2025-02-17, 9d
    - Kitchen UI :s2kdsui, 2025-02-10, 14d
    - Real-time Testing :s2test, 2025-02-24, 5d
    
    section Sprint 3
    Sprint 3: Tables & Payments :sprint3, 2025-03-03, 21d
    - Table Session API :s3table, 2025-03-03, 12d
    - Booking System :s3book, 2025-03-10, 10d
    - Payment Processing :s3payment, 2025-03-12, 12d
    - Refund Flows :s3refund, 2025-03-17, 10d
    - UI Integration :s3ui, 2025-03-03, 14d
    - Concurrent Testing :s3test, 2025-03-17, 5d
    
    section Sprint 4
    Sprint 4: Reporting & Cash :sprint4, 2025-03-24, 21d
    - Cash Closing Module :s4cash, 2025-03-24, 12d
    - Business Insights API :s4insights, 2025-03-31, 12d
    - Discount Engine :s4discount, 2025-03-28, 10d
    - Manager Dashboard :s4manager, 2025-03-24, 14d
    - Report Testing :s4test, 2025-04-07, 5d
    
    section Sprint 5
    Sprint 5: Stock & Polish :sprint5, 2025-04-14, 21d
    - Stock Management API :s5stock, 2025-04-14, 12d
    - Batch & Expiry Tracking :s5batch, 2025-04-21, 10d
    - Stock Decay Simulation :s5decay, 2025-04-24, 8d
    - System Settings :s5settings, 2025-04-28, 7d
    - UI Polish & UX :s5ui, 2025-04-14, 14d
    - UAT Testing :s5test, 2025-04-28, 7d
    
    section Sprint 6
    Sprint 6: Finalization :sprint6, 2025-05-05, 14d
    - Bug Fixes & QA :s6bugs, 2025-05-05, 7d
    - Performance Optimization :s6perf, 2025-05-08, 5d
    - Deployment Config (Azure) :s6deploy, 2025-05-10, 5d
    - Documentation :s6docs, 2025-05-05, 10d
    - Final Testing & Sign-off :s6final, 2025-05-12, 7d
    
    section Milestones
    Sprint 1 Complete :crit, ms1, 2025-02-10, 1d
    Sprint 2 Complete :crit, ms2, 2025-03-03, 1d
    Sprint 3 Complete :crit, ms3, 2025-03-24, 1d
    Sprint 4 Complete :crit, ms4, 2025-04-14, 1d
    Sprint 5 Complete :crit, ms5, 2025-05-05, 1d
    Project Completion :crit, ms6, 2025-05-19, 1d
```

---

*Generated for the Cafe Management System — ASP.NET Core + React.*
