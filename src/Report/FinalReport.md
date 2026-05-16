---

# CAFÉ MANAGEMENT SYSTEM

### A Final Year Project Report

**Submitted in partial fulfilment of the requirements for the**
**Bachelor of Science (Hons) in Computing**

---

**Student Name:** Bishworaj Dhami
**Student ID:** 85240198
**Supervisor:**
**Academic Year:** 2025 – 2026
**Institution:** Islington College (Affiliated with London Metropolitan University)

---

---

## DECLARATION

I hereby declare that this Final Year Project report is my own original work and has not been submitted for any other academic award. All sources of information have been properly cited and referenced.

**Signature:** ___________________________
**Date:** 16 May 2026

---

## ABSTRACT

The rapid digitalisation of the food service sector has created an urgent need for integrated, intelligent management systems that can replace fragmented, manual workflows. This report presents the design, development, and evaluation of a full-stack **Café Management System** — a role-based web application built with **ASP.NET Core** on the backend and **React.js** on the frontend, communicating via real-time **SignalR** WebSocket connections.

The system addresses four core operational roles — **Manager, Cashier, Chef, and Waiter** — each with a dedicated dashboard tailored to their responsibilities. Key features include JWT-authenticated role-based access control, real-time kitchen order display, table session and booking management, multi-method payment processing (cash, card, mobile), bill splitting, full and partial refunds, stock tracking with batch management and decay simulation, business insight reporting, and a configurable discount engine.

The academic question explored is: *"How can a real-time, role-based digital system improve operational efficiency and reduce manual error in a small-to-medium café environment?"* The project follows an **Agile (Scrum)** methodology with iterative deliverables across three subsystems. Findings demonstrate that the system significantly streamlines café operations by eliminating paper-based order tickets, reducing payment discrepancies, and providing managers with consolidated financial analytics.

---

## TABLE OF CONTENTS

1. Introduction
   - 1.1 Project Briefing
   - 1.2 Aims
   - 1.3 Objectives
   - 1.4 Artefact
   - 1.5 Academic Question
   - 1.6 Scope and Limitations
   - 1.7 Report Structure
2. Literature Review
3. Project Methodology
4. Technologies and Tools
5. Artefact Designs
   - 5.1 Subsystem 1 — Authentication & User Management
   - 5.2 Subsystem 2 — Order, Table & Payment Management
   - 5.3 Subsystem 3 — Stock, Reporting & System Configuration
6. Conclusion
7. Critical Evaluation
8. Evidence of Project Management
9. References
10. Appendices

---

## TABLE OF FIGURES

| Figure | Description |
|--------|-------------|
| Figure 1 | Functional Decomposition Diagram (FDD) |
| Figure 2 | System Architecture Overview |
| Figure 3 | Use Case Diagram — Authentication |
| Figure 4 | Use Case Diagram — Manager |
| Figure 5 | Use Case Diagram — Cashier |
| Figure 6 | Use Case Diagram — Chef & Waiter |
| Figure 7 | Activity Diagram — Authentication Flow |
| Figure 8 | Activity Diagram — Forgot / Reset Password |
| Figure 9 | Activity Diagram — Order Creation |
| Figure 10 | Activity Diagram — Kitchen & Payment |
| Figure 11 | Activity Diagram — Cash Closing |
| Figure 12 | Sequence Diagram — Login & Authentication |
| Figure 13 | Sequence Diagram — Cashier Places an Order |
| Figure 14 | Sequence Diagram — Kitchen Status Update |
| Figure 15 | Sequence Diagram — Payment Processing |
| Figure 16 | Sequence Diagram — Table Booking |
| Figure 17 | ERD — Users & Authentication |
| Figure 18 | ERD — Orders & Payments |
| Figure 19 | ERD — Menu & Discounts |
| Figure 20 | ERD — Tables, Sessions & Bookings |
| Figure 21 | ERD — Stock & Cash Management |
| Figure 22 | Class Diagram — User Role Hierarchy |
| Figure 23 | Class Diagram — Order & Payment |
| Figure 24 | Class Diagram — Menu, Category & Discount |
| Figure 25 | Class Diagram — Table Session & Booking |
| Figure 26 | Class Diagram — Stock & Cash |
| Figure 27 | Login Page — Wireframe / Screenshot |
| Figure 28 | Manager Dashboard — Screenshot |
| Figure 29 | Cashier Dashboard — Screenshot |
| Figure 30 | Chef Kitchen Display — Screenshot |
| Figure 31 | Waiter Dashboard — Screenshot |
| Figure 32 | Gantt Chart |

---

## 1. INTRODUCTION

### 1.1 Project Briefing

The café and restaurant industry continues to rely heavily on manual, paper-based workflows for order taking, payment collection, and inventory tracking. These analogue processes introduce a range of operational inefficiencies: miscommunication between front-of-house and kitchen staff, inaccurate cash reconciliation, poor stock visibility, and an inability to extract meaningful business analytics from daily operations.

The **Café Management System** is a full-stack, role-based digital platform that acts as a technical solution to these problems. The system provides real-time coordination between all café stakeholders — **Manager, Cashier, Chef, and Waiter** — through dedicated, permission-controlled dashboards and live WebSocket communication. Customers interact indirectly through the cashier and waiter interfaces for ordering and booking.

The backend is a RESTful **ASP.NET Core Web API** connected to a **SQL Server** database via **Entity Framework Core**. The frontend is built with **React.js**, consuming the API over HTTP and maintaining a persistent **SignalR** connection for push notifications. Authentication is handled via **JWT (JSON Web Tokens)** with a first-login OTP email verification flow, ensuring secure access for staff accounts created by the manager.

> **[Figure 1 — Functional Decomposition Diagram]**
> *(Insert FDD here)*

> **[Figure 2 — System Architecture Overview]**
> *(Insert architecture diagram here)*

---

### 1.2 Aims

The aim of this project is to design and develop a comprehensive, real-time café management system that digitises and integrates the core operational workflows of a small-to-medium café, thereby improving staff coordination, payment accuracy, and business decision-making.

---

### 1.3 Objectives

1. To implement a secure, role-based authentication system with JWT tokens, OTP email verification, and first-login password enforcement.
2. To enable real-time order placement and status tracking between cashier, kitchen, and waiter roles via SignalR WebSockets.
3. To develop a full table and booking management system supporting dine-in sessions, seat reservations, and booking charges.
4. To provide a multi-method payment engine supporting cash, card, and mobile payments with split billing and refund capabilities.
5. To implement a stock management module with batch tracking, low-stock alerts, and configurable daily decay simulation.
6. To generate business insights and analytics reports accessible to the manager, including sales breakdowns, cash closing reconciliation, and inventory summaries.
7. To deliver a configurable discount engine supporting percentage and fixed-value discounts applicable to individual items or combo offers.

---

### 1.4 Artefact

The artefact is a multi-role, real-time web application consisting of three core subsystems:

**Subsystem 1 — Authentication & User Management**
Handles secure login, first-login OTP verification, password reset flows, staff account creation, and role/permission management. The manager creates staff accounts with temporary passwords; staff are forced to change their password on first login after OTP verification.

**Subsystem 2 — Order, Table & Payment Management**
Covers the full operational workflow from order creation to payment. Cashiers place dine-in and takeaway orders, manage table sessions and bookings, process payments (including split bills), handle refunds, and close daily cash shifts. Chefs and waiters receive real-time order notifications and update status through their dashboards.

**Subsystem 3 — Stock, Reporting & System Configuration**
Enables the manager to maintain stock items with batch-level tracking and expiry dates, view low-stock alerts, access business insights (revenue, order trends, payment method breakdowns), configure system settings (VAT rate, service charge, café details, QR codes), and manage menu categories and discounts.

> **[Figure 1 — FDD]**
> *(Insert FDD here)*

---

### 1.5 Academic Question

**"How can a real-time, role-based digital system improve operational efficiency and reduce manual error in a small-to-medium café environment?"**

This question examines the extent to which digitisation of café workflows — specifically through live communication between roles and centralised data management — can quantifiably reduce the types of errors (incorrect orders, cash discrepancies, stock mismanagement) that plague manual operations. The literature review, system design, and evaluation all contribute to answering this question.

---

### 1.6 Scope and Limitations

**In Scope:**
- Role-based dashboards for Manager, Cashier, Chef, and Waiter
- Real-time order notification via SignalR
- Table session and booking management
- Cash, card, and mobile payment processing with split billing
- Full and partial refunds
- Stock tracking with batch management and daily decay
- Business insights and cash closing reports
- Configurable discounts, menu, and system settings
- JWT authentication with OTP email verification

**Out of Scope:**
- Customer-facing self-ordering kiosk or mobile app
- Integration with third-party POS hardware (receipt printers, cash drawers)
- Online delivery or aggregator platform integration (e.g., Uber Eats)
- Multi-branch or franchise management
- AI-based demand forecasting (considered as a future enhancement)

**Limitations:**
- The system has been tested in a local development environment; production deployment to Azure was configured but live performance under high concurrency was not benchmarked.
- The email OTP system relies on SMTP configuration and may have delivery delays depending on the email provider.
- Stock decay simulation uses a configurable daily rate but does not account for real-time sensor input.

---

### 1.7 Report Structure

This report is structured as follows:

- **Section 2 (Literature Review)** examines existing research on digital transformation in the restaurant sector, point-of-sale systems, and real-time analytics.
- **Section 3 (Project Methodology)** justifies the choice of Agile Scrum and details the iterative development plan.
- **Section 4 (Technologies and Tools)** justifies the technology stack selected for the project.
- **Section 5 (Artefact Designs)** presents the SRS, UML diagrams, wireframes, and testing evidence for each subsystem.
- **Section 6 (Conclusion)** reflects on the aims, objectives, and academic question.
- **Section 7 (Critical Evaluation)** provides self-reflection on the project process and outcomes.
- **Section 8 (Evidence of Project Management)** contains log sheets and the Gantt chart.
- **Section 9 (References)** lists all cited sources.
- **Section 10 (Appendices)** provides supplementary materials.

---

## 2. LITERATURE REVIEW

### 2.1 Overview

This section examines key literature relevant to the academic question: *how real-time, role-based digital systems can improve operational efficiency and reduce manual error in small-to-medium café environments*. The review draws on research into digital transformation in the food service sector, point-of-sale system design, and the broader adoption of digital tools by small and medium enterprises (SMEs).

---

### 2.2 Digital Transformation in the Restaurant Industry

Alt (2021) provides a foundational analysis of digital transformation trends in the restaurant industry, identifying three dominant forces: platform digitalisation (aggregator apps), operational digitalisation (internal tools and POS systems), and data-driven decision making. Alt argues that while large chains have largely adopted integrated digital platforms, small-to-medium restaurants — including cafés — lag significantly behind, often operating with isolated, paper-based processes. This supports the motivation for the Café Management System: it directly addresses the operational digitalisation gap that Alt identifies, providing an integrated platform where order, payment, stock, and reporting functions are unified under one system.

Critically, Alt (2021) also notes that digital transformation must be *role-aware* — that is, different stakeholders (front-of-house, kitchen, management) have fundamentally different informational needs. This insight directly shaped the architecture of the proposed system, where each role (Manager, Cashier, Chef, Waiter) has a dedicated, purpose-built dashboard rather than a single shared interface.

---

### 2.3 Point-of-Sale Systems for Cafés

Dewi et al. (2021) present a case study of a point-of-sale (POS) system for a café, developed using Agile methodology. Their findings highlight that a POS system implemented in a café context must support: rapid order entry, clear menu categorisation, real-time status tracking, and payment flexibility. The authors report that adopting a digital POS eliminated an estimated 60% of order-taking errors compared to the previous paper-based system.

The Café Management System extends the traditional POS model significantly. While Dewi et al. (2021) focus primarily on the cashier and payment functions, this project incorporates live kitchen coordination via SignalR, a table and booking management layer, and a manager analytics suite — moving beyond a simple POS into a holistic operational platform. Furthermore, the Agile methodology applied by Dewi et al. validates the choice of Scrum for this project, confirming its suitability for iterative, user-facing software in this domain.

---

### 2.4 Technology Adoption in SMEs

Faruque et al. (2024) conducted a systematic review of technology adoption in small businesses, identifying three key barriers: cost, technical complexity, and lack of trained staff. They found that cloud-based, SaaS-style tools with low setup overhead are the most successfully adopted technologies in the SME sector. The authors advocate for systems that offer role-specific interfaces and minimal training requirements.

The Café Management System addresses all three barriers. It is a web-based application requiring no client-side installation, uses a familiar browser interface across all roles, and is designed with role-specific dashboards that allow each staff member to operate within a narrow, well-defined interface rather than needing to understand the entire system. Faruque et al. (2024) also note the growing importance of mobile-compatible interfaces — the system's responsive CSS design partially addresses this, though a native mobile application remains a future scope item.

---

### 2.5 Digital Economy and SME Competitiveness

Jangjarat and Jewjinda (2023) examine the impact of digital economy adoption on SME competitiveness, finding that businesses which adopt digital operational tools experience measurable improvements in customer satisfaction scores (due to faster service) and profit margins (due to waste reduction and better stock management). Their study of 320 SMEs in Thailand found that real-time data availability — particularly around inventory and sales — was the most cited driver of improved decision-making.

This finding strongly supports the business insights and stock management modules of the Café Management System. By providing the manager with daily sales breakdowns, payment method analytics, and low-stock alerts, the system delivers exactly the real-time data visibility that Jangjarat and Jewjinda (2023) identify as transformative. Their work also highlights the risk of *partial digitalisation* — where only some workflows are digitised, creating new integration pain points. The holistic scope of this project mitigates this risk by ensuring all core workflows are covered in a single system.

---

### 2.6 Restaurant Analytics and Operational Data

Roy, Spiliotopoulou, and de Vries (2022) provide a comprehensive review of the emerging field of restaurant analytics, noting that even basic digital data collection (order timestamps, item popularity, payment method distribution) can yield significant operational insights when aggregated and visualised. They identify three tiers of restaurant analytics maturity: descriptive (what happened), diagnostic (why it happened), and predictive (what will happen). Most restaurant systems, they argue, operate at the descriptive tier.

The business insights module of the Café Management System operates primarily at the descriptive tier, providing the manager with revenue totals, order counts, peak-hour analysis, and refund tracking. Roy et al. (2022) suggest that even this level of analytics, when absent from a manual operation, represents a substantial operational improvement. Their work also highlights the value of cash reconciliation tools — a direct parallel to the cash closing module, which captures the daily gap between system-calculated and physically-counted cash.

---

### 2.7 Summary

The literature consistently identifies four themes relevant to this project: (1) the need for operational digitalisation in small food-service businesses, (2) the importance of role-aware interfaces, (3) the transformative impact of real-time data access, and (4) the barriers to SME adoption that must be minimised through accessible design. The Café Management System is grounded in and responds to each of these themes, as elaborated in the design and evaluation sections that follow.

---

## 3. PROJECT METHODOLOGY

### 3.1 Choice of Methodology: Agile Scrum

The project adopts an **Agile Scrum** framework. The decision was driven by the nature of the system being developed rather than by the definition of Scrum itself. Three specific characteristics of this project make Scrum the most appropriate choice:

**1. Evolving Requirements:** In a café operational context, requirements are not fully knowable at the outset. For example, the need for split billing, booking charges, and a daily stock decay simulation only became clearly defined after initial stakeholder discussion. Scrum's iterative sprint structure allows such requirements to be incorporated into future sprints without disrupting already-completed work, unlike a Waterfall model where late requirement changes are costly.

**2. Parallel Multi-Subsystem Development:** The system is decomposed into three subsystems (Authentication, Order/Payment, Stock/Reporting), each of which can be independently developed, tested, and delivered as a working increment. Scrum's sprint-based cadence supports this incremental delivery model and allows each subsystem to be demonstrated and validated before the next begins.

**3. Risk Reduction Through Early Integration Testing:** Because the system involves a React frontend communicating with an ASP.NET Core API via both HTTP and SignalR WebSockets, integration risks are high. Scrum encourages working software at the end of each sprint, which forces integration issues to surface early (e.g., CORS configuration, JWT token propagation, SignalR hub authentication) rather than at the end of the project.

### 3.2 Sprint Overview

| Sprint | Duration | Deliverable |
|--------|----------|-------------|
| Sprint 1 | Weeks 1–3 | Project setup, database schema, authentication API, login UI |
| Sprint 2 | Weeks 4–6 | Menu management, order placement, kitchen display (SignalR) |
| Sprint 3 | Weeks 7–9 | Table sessions, bookings, payment processing, bill splitting |
| Sprint 4 | Weeks 10–12 | Refunds, cash closing, manager reporting, discount engine |
| Sprint 5 | Weeks 13–15 | Stock management, system settings, UI polish, testing |
| Sprint 6 | Weeks 16–17 | Bug fixing, deployment configuration, documentation |

> **[Figure 32 — Gantt Chart]**
> *(Insert Gantt chart here)*

---

## 4. TECHNOLOGIES AND TOOLS

### 4.1 Backend: ASP.NET Core Web API (C#)

ASP.NET Core was chosen over alternatives such as Node.js (Express) or Django because it provides native support for strongly-typed models, built-in dependency injection, and Entity Framework Core ORM — all of which reduce boilerplate code in a data-heavy application. More importantly, **ASP.NET Core is the only mainstream backend framework that ships with SignalR as a first-class library**, eliminating the need for third-party WebSocket libraries. Given that real-time kitchen notifications are a core system requirement, this was the decisive factor.

### 4.2 Frontend: React.js

React was selected over Angular or Vue.js because its component-based architecture is particularly well-suited to multi-role dashboards where distinct UI sections (order panel, menu grid, table map, kitchen queue) need to be independently managed and updated. React's unidirectional data flow and hooks-based state management (useState, useEffect, useContext) also simplify the management of real-time data arriving from SignalR without requiring a full state management library like Redux.

### 4.3 Real-Time Communication: SignalR

SignalR provides the WebSocket layer for push notifications between the server and connected clients. It was preferred over raw WebSockets or third-party services (e.g., Pusher, Firebase) because it integrates directly with the ASP.NET Core authentication middleware, meaning JWT-authenticated connections can be established without additional token management. SignalR's automatic fallback to long-polling also ensures compatibility with restrictive network environments.

### 4.4 Database: SQL Server with Entity Framework Core

SQL Server was chosen for its robust support of relational data with complex foreign key relationships (Orders → OrderItems → Refunds, TableSessions → Bookings → Seats). Entity Framework Core provides Code-First migrations, which allowed the schema to evolve incrementally across sprints without manual SQL scripting. The soft-delete pattern (`IsDeleted` flag on `MenuItem`) was implemented to preserve historical order data integrity.

### 4.5 Authentication: JWT + BCrypt + OTP Email

JWT (JSON Web Tokens) provides stateless authentication, which is essential for a system where multiple role-specific clients connect simultaneously. BCrypt is used for password hashing. The OTP email flow uses SMTP via the `MailKit` library. This combination ensures that staff credentials are never stored in plaintext and that first-login enforcement is cryptographically sound.

### 4.6 IDE and Version Control

**Visual Studio 2022** was used for backend development (ASP.NET Core) and **Visual Studio Code** for the React frontend. The project is version-controlled with **Git**, hosted on **GitHub**, using a feature-branch workflow where each sprint's features were developed on named branches and merged to `main` after review.

### 4.7 Package Managers

- **NPM** (Node Package Manager) — manages React frontend dependencies including `react-router-dom`, `@microsoft/signalr`, `axios`, `recharts`
- **NuGet** — manages .NET backend packages including `Microsoft.EntityFrameworkCore`, `Microsoft.AspNetCore.SignalR`, `BCrypt.Net-Next`, `MailKit`

---
## 5. ARTEFACT DESIGNS

---

### 5.1 Subsystem 1 — Authentication & User Management

#### 5.1.1 Software Requirements Specification (SRS)

**Functional Requirements:**

| ID | Requirement |
|----|-------------|
| FR-01 | The system shall allow staff to log in using an email and password |
| FR-02 | The system shall enforce OTP email verification on first login |
| FR-03 | The system shall require staff to set a new password after OTP verification |
| FR-04 | The system shall provide a Forgot Password flow with OTP-based reset |
| FR-05 | The system shall issue a JWT token on successful authentication |
| FR-06 | The system shall redirect users to their role-specific dashboard |
| FR-07 | The manager shall be able to create, edit, and delete staff accounts |
| FR-08 | The manager shall be able to assign granular permissions to staff |

**Non-Functional Requirements:**

| ID | Requirement |
|----|-------------|
| NFR-01 | Passwords shall be stored as BCrypt hashes (min cost factor 12) |
| NFR-02 | OTP codes shall expire after 10 minutes |
| NFR-03 | JWT tokens shall expire after 8 hours |
| NFR-04 | All API endpoints (except /api/login) shall require a valid JWT |

#### 5.1.2 Design Diagrams

> **[Figure 3 — Use Case Diagram: Authentication]**
> *(Insert diagram here — see SystemDiagrams.md, Section 1.1)*

> **[Figure 7 — Activity Diagram: Authentication Flow]**
> *(Insert diagram here — see SystemDiagrams.md, Section 2.1)*

> **[Figure 8 — Activity Diagram: Forgot / Reset Password]**
> *(Insert diagram here — see SystemDiagrams.md, Section 2.2)*

> **[Figure 12 — Sequence Diagram: Login & Authentication]**
> *(Insert diagram here — see SystemDiagrams.md, Section 3.1)*

> **[Figure 17 — ERD: Users & Authentication]**
> *(Insert diagram here — see SystemDiagrams.md, Section 4.1)*

> **[Figure 22 — Class Diagram: User Role Hierarchy]**
> *(Insert diagram here — see SystemDiagrams.md, Section 5.1)*

> **[Figure 27 — Login Page Screenshot / Wireframe]**
> *(Insert screenshot here)*

> **[Figure 28 — Manager Dashboard Screenshot]**
> *(Insert screenshot here)*

#### 5.1.3 Testing

| Test ID | Test Case | Input | Expected Output | Result |
|---------|-----------|-------|-----------------|--------|
| T-01 | Login with valid credentials | Correct email & password | JWT token issued, redirect to dashboard | PASS |
| T-02 | Login with invalid password | Wrong password | 401 Unauthorized | PASS |
| T-03 | First login OTP flow | Valid OTP within 10 mins | Redirect to set-new-password | PASS |
| T-04 | Expired OTP rejection | OTP after 10 min expiry | Error: OTP expired | PASS |
| T-05 | Forgot password flow | Valid registered email | Reset OTP sent | PASS |
| T-06 | Role-based redirect | Manager token | Redirect to /manager | PASS |
| T-07 | Access without token | No JWT header | 401 Unauthorized | PASS |
| T-08 | Wrong role access | Cashier token on /manager | Redirect to /dashboard | PASS |

---

### 5.2 Subsystem 2 — Order, Table & Payment Management

#### 5.2.1 Software Requirements Specification (SRS)

**Functional Requirements:**

| ID | Requirement |
|----|-------------|
| FR-09 | Cashier shall be able to place dine-in and takeaway orders |
| FR-10 | Cashier shall be able to add special requests to order items |
| FR-11 | Cashier shall be able to apply discounts to an order |
| FR-12 | Orders shall be broadcast to the kitchen display in real time via SignalR |
| FR-13 | Chef shall be able to update order status (Preparing, Ready) |
| FR-14 | Status updates shall be broadcast to cashier and waiter in real time |
| FR-15 | Cashier shall be able to open and close table sessions |
| FR-16 | Cashier shall be able to create advance table bookings with seat selection |
| FR-17 | System shall support cash, card, and mobile payment methods |
| FR-18 | System shall support bill splitting among multiple payers |
| FR-19 | Cashier shall be able to process full and partial refunds |
| FR-20 | Cashier shall be able to close the daily cash shift with reconciliation |

**Non-Functional Requirements:**

| ID | Requirement |
|----|-------------|
| NFR-05 | SignalR notifications shall be delivered within 500ms of the triggering event |
| NFR-06 | Table session status shall update atomically to prevent double-booking |
| NFR-07 | Payment records shall be immutable once committed |

#### 5.2.2 Design Diagrams

> **[Figure 4 — Use Case Diagram: Manager]**
> *(Insert diagram here — see SystemDiagrams.md, Section 1.2)*

> **[Figure 5 — Use Case Diagram: Cashier]**
> *(Insert diagram here — see SystemDiagrams.md, Section 1.3)*

> **[Figure 6 — Use Case Diagram: Chef & Waiter]**
> *(Insert diagram here — see SystemDiagrams.md, Section 1.4)*

> **[Figure 9 — Activity Diagram: Order Creation (Part A)]**
> *(Insert diagram here — see SystemDiagrams.md, Section 2.3)*

> **[Figure 10 — Activity Diagram: Kitchen & Payment (Part B)]**
> *(Insert diagram here — see SystemDiagrams.md, Section 2.4)*

> **[Figure 13 — Sequence Diagram: Cashier Places an Order]**
> *(Insert diagram here — see SystemDiagrams.md, Section 3.2)*

> **[Figure 14 — Sequence Diagram: Kitchen Status Update]**
> *(Insert diagram here — see SystemDiagrams.md, Section 3.3)*

> **[Figure 15 — Sequence Diagram: Payment Processing]**
> *(Insert diagram here — see SystemDiagrams.md, Section 3.4)*

> **[Figure 16 — Sequence Diagram: Table Booking Flow]**
> *(Insert diagram here — see SystemDiagrams.md, Section 3.5)*

> **[Figure 18 — ERD: Orders & Payments]**
> *(Insert diagram here — see SystemDiagrams.md, Section 4.2)*

> **[Figure 20 — ERD: Tables, Sessions & Bookings]**
> *(Insert diagram here — see SystemDiagrams.md, Section 4.4)*

> **[Figure 23 — Class Diagram: Order & Payment]**
> *(Insert diagram here — see SystemDiagrams.md, Section 5.2)*

> **[Figure 25 — Class Diagram: Table Session & Booking]**
> *(Insert diagram here — see SystemDiagrams.md, Section 5.4)*

> **[Figure 29 — Cashier Dashboard Screenshot]**
> *(Insert screenshot here)*

> **[Figure 30 — Chef Kitchen Display Screenshot]**
> *(Insert screenshot here)*

> **[Figure 31 — Waiter Dashboard Screenshot]**
> *(Insert screenshot here)*

#### 5.2.3 Testing

| Test ID | Test Case | Input | Expected Output | Result |
|---------|-----------|-------|-----------------|--------|
| T-09 | Place dine-in order | Items + table number | Order created, kitchen notified via SignalR | PASS |
| T-10 | Place takeaway order | Items, no table | Order created, kitchen notified | PASS |
| T-11 | Kitchen receives notification | Order placed | Chef sees order within 500ms | PASS |
| T-12 | Chef marks order Preparing | Click Preparing | Status updated, cashier notified | PASS |
| T-13 | Chef marks order Ready | Click Ready | Status updated, ReadyAt timestamp set | PASS |
| T-14 | Process single cash payment | Amount = order total | Payment recorded, order marked paid | PASS |
| T-15 | Split bill 3 ways | Split count = 3 | 3 BillSplit records created | PASS |
| T-16 | Full refund | Order ID | Refund recorded, order status updated | PASS |
| T-17 | Partial refund | Selected items | RefundItems created for selected lines | PASS |
| T-18 | Create table booking | Floor, table, seat, customer | Booking created, seat reserved | PASS |
| T-19 | Close cash shift | Cash drawer count + expenses | CashClosing record created | PASS |
| T-20 | Apply discount to order | Discount code | Discount deducted from order total | PASS |

---

### 5.3 Subsystem 3 — Stock, Reporting & System Configuration

#### 5.3.1 Software Requirements Specification (SRS)

**Functional Requirements:**

| ID | Requirement |
|----|-------------|
| FR-21 | Manager shall be able to add, edit, and delete stock items |
| FR-22 | Manager shall be able to record stock batches with expiry dates and cost |
| FR-23 | System shall flag stock items below minimum threshold as low stock |
| FR-24 | System shall apply daily decay to stock quantities based on configured rate |
| FR-25 | Manager shall be able to view daily, weekly, and monthly sales reports |
| FR-26 | Manager shall be able to view payment method breakdown (cash/card/mobile) |
| FR-27 | Manager shall be able to configure VAT rate, service charge, and café details |
| FR-28 | Manager shall be able to manage menu categories |
| FR-29 | Manager shall be able to create discounts tied to specific menu items |
| FR-30 | Manager shall be able to upload café logo and QR code images |

**Non-Functional Requirements:**

| ID | Requirement |
|----|-------------|
| NFR-08 | Stock decay shall be processed server-side on a scheduled basis |
| NFR-09 | Report data shall be accurate to the current day's completed transactions |
| NFR-10 | All uploaded images shall be stored in Azure Blob Storage |

#### 5.3.2 Design Diagrams

> **[Figure 19 — ERD: Menu & Discounts]**
> *(Insert diagram here — see SystemDiagrams.md, Section 4.3)*

> **[Figure 21 — ERD: Stock & Cash Management]**
> *(Insert diagram here — see SystemDiagrams.md, Section 4.5)*

> **[Figure 24 — Class Diagram: Menu, Category & Discount]**
> *(Insert diagram here — see SystemDiagrams.md, Section 5.3)*

> **[Figure 26 — Class Diagram: Stock & Cash]**
> *(Insert diagram here — see SystemDiagrams.md, Section 5.5)*

> **[Figure 11 — Activity Diagram: Cash Closing]**
> *(Insert diagram here — see SystemDiagrams.md, Section 2.5)*

> **[Figure 28 — Manager Dashboard / Settings Screenshot]**
> *(Insert screenshot here)*

#### 5.3.3 Testing

| Test ID | Test Case | Input | Expected Output | Result |
|---------|-----------|-------|-----------------|--------|
| T-21 | Add stock item | Name, unit, min stock | Item created and visible in list | PASS |
| T-22 | Record stock batch | Quantity, expiry, cost | Batch linked to stock item | PASS |
| T-23 | Low stock alert | Stock below minimum | Item flagged as LowStock = true | PASS |
| T-24 | Daily decay application | Decay rate configured | Stock quantity reduced on next decay run | PASS |
| T-25 | View daily sales report | Date filter | Revenue, orders, payment breakdown displayed | PASS |
| T-26 | Configure VAT rate | New VAT % | All new orders use updated VAT rate | PASS |
| T-27 | Create percentage discount | 10% off item | Discount applied correctly to order | PASS |
| T-28 | Create fixed discount | Rs 50 off | Discount deducted from order total | PASS |
| T-29 | Upload café logo | Image file | Logo displayed across all dashboards | PASS |
| T-30 | View cash closing records | Date range | Historical closing records displayed | PASS |

---

## 6. CONCLUSION

### 6.1 Reflection on Aims

The project set out to design and develop a comprehensive, real-time café management system that digitises and integrates core operational workflows. This aim has been fully achieved. The system delivers a working, role-based application covering authentication, order management, kitchen coordination, table and booking management, payment processing, stock tracking, and business reporting — all integrated within a single, cohesive platform.

### 6.2 Reflection on Objectives

All seven objectives defined in Section 1.3 were met:

1. ✅ Secure JWT authentication with OTP email verification and first-login enforcement is fully implemented and tested.
2. ✅ Real-time SignalR-based order notifications operate bidirectionally between cashier, kitchen, and waiter roles.
3. ✅ Table session and booking management — including seat reservations, booking charges, and session charges — is complete.
4. ✅ Multi-method payment processing with split billing and full/partial refunds is implemented and tested.
5. ✅ Stock management with batch tracking, low-stock alerts, and daily decay simulation is operational.
6. ✅ Business insights, cash closing reconciliation, and analytics reports are accessible to the manager.
7. ✅ A configurable discount engine supporting percentage and fixed-value offers is fully integrated.

### 6.3 Answer to the Academic Question

*"How can a real-time, role-based digital system improve operational efficiency and reduce manual error in a small-to-medium café environment?"*

The system demonstrates that real-time, role-based digitalisation improves café operations in at least four measurable ways:

1. **Reduced order errors:** Digital order transmission from cashier to kitchen via SignalR eliminates transcription errors inherent in verbal or paper-based order relay.
2. **Improved payment accuracy:** The cash closing module provides an automated reconciliation between system-calculated and physically-counted cash, surfacing discrepancies immediately.
3. **Better stock visibility:** The stock management module with low-stock alerts and batch expiry tracking enables proactive restocking rather than reactive response to shortfalls.
4. **Informed management decisions:** The business insights dashboard provides the manager with aggregated sales data that would otherwise require manual collation from receipts.

These outcomes align directly with the findings of Alt (2021), Dewi et al. (2021), and Roy et al. (2022), confirming that even a descriptive-level analytics platform delivers meaningful operational value in a small café context.

---

## 7. CRITICAL EVALUATION

### 7.1 Evaluation of the Report

This report follows the FYP template structure closely. The literature review is grounded in peer-reviewed sources from 2021–2024, ensuring currency and relevance. The SRS tables in Section 5 provide clear traceability between requirements and test results. However, the report would benefit from more quantitative evidence — for example, timing benchmarks for SignalR notification latency under concurrent load, or a formal user acceptance testing (UAT) survey with café staff.

### 7.2 Findings and Process

The development process confirmed several architectural assumptions: ASP.NET Core's built-in SignalR integration was seamless, and the JWT + role-claim model mapped cleanly to the dashboard routing logic. The most challenging aspect was managing concurrent table session state — ensuring that a table cannot be double-booked when two cashiers act simultaneously required careful server-side validation with atomic database updates.

The iterative sprint approach proved highly effective. Requirements such as the daily stock decay simulation and the split bill feature emerged during later sprints after initial stakeholder feedback, and could be incorporated without disrupting already-delivered subsystems.

### 7.3 System Evaluation

**Strengths:**
- Clean separation of concerns between frontend, backend, and real-time layer
- Comprehensive role coverage — all four café roles have functional, purpose-built dashboards
- Robust authentication with multi-step security (password + OTP + JWT)
- Configurable settings (VAT, service charge, categories, discounts) make the system adaptable to different café contexts

**Weaknesses:**
- No offline mode — the system requires a stable network connection at all times
- The stock decay feature, while useful, uses a simplified linear decay model rather than a more sophisticated demand-based projection
- The reporting module does not yet support export to PDF or Excel, limiting use in accounting workflows

### 7.4 Planning and Management Quality

The Agile Scrum approach ensured that working software was available at the end of each sprint. The Gantt chart (see Figure 32) reflects the planned vs. actual timeline; Sprint 5 (stock and settings) ran slightly over schedule due to the complexity of batch management logic, requiring one additional week. This was recovered by parallelising documentation and bug-fixing activities in Sprint 6.

### 7.5 Self-Reflection

This project has been the most technically demanding and professionally rewarding experience of my undergraduate programme. Prior to this project, my experience with real-time systems was limited to theoretical understanding. Implementing SignalR hubs, managing WebSocket connection lifecycles, and coordinating state between the server and multiple connected clients gave me practical skills in distributed systems design that are directly applicable to industry.

The project also strengthened my understanding of layered software architecture — the discipline of keeping controllers thin (delegating business logic to service classes), maintaining clean ERD-to-model mappings, and ensuring that the frontend consumes only what the API explicitly exposes. These are skills I expect to carry into my professional career.

Reflecting on what I would do differently: I would invest more time in automated integration testing earlier in the project, rather than relying primarily on manual testing. Setting up a CI/CD pipeline on GitHub Actions to run API tests on each pull request would have caught several regressions earlier and reduced debugging time in later sprints.

---

## 8. EVIDENCE OF PROJECT MANAGEMENT

### 8.1 Supervisor Meeting Log

*(Insert signed and scanned log sheet here)*

### 8.2 Gantt Chart

> **[Figure 32 — Gantt Chart]**
> *(Insert Gantt chart here)*

---

## 9. REFERENCES

Alt, R. (2021). Digital transformation in the restaurant industry: current developments and implications. *Journal of Smart Tourism*, *1*(1), 69–74. https://doi.org/10.52255/smarttourism.2021.1.1.9

Dewi, I. A., et al. (2021). Point of Sales System in InHome Cafe Website using Agile Methodology. *Journal of Innovation and Community Engagement*, *1*(1), 01–19. https://doi.org/10.28932/jice.v1i1.3321

Faruque, M. O., Chowdhury, S. N., Rabbani, M. G., & Khan, N. A. (2024). Technology adoption and digital transformation in small businesses: Trends, challenges, and opportunities. *International Journal for Multidisciplinary Research*, *6*(5). https://doi.org/10.36948/ijfmr.2024.v06i05.29207

Jangjarat, K., & Jewjinda, C. (2023). Impact of the digital economy and innovation on the businesses of small and medium enterprises. *Corporate and Business Strategy Review*, *4*(3), 102–110. https://doi.org/10.22495/cbsrv4i3art10

Roy, D., Spiliotopoulou, E., & de Vries, J. (2022). Restaurant analytics: Emerging practice and research opportunities. *Production and Operations Management*, *31*(10), 3687–3709. https://doi.org/10.1111/poms.13809

---

## 10. APPENDICES

### Appendix A — System Configuration Details

**Backend (ASP.NET Core):**
- .NET 8.0
- Entity Framework Core 8.0
- SQL Server (local: SQL Server Express; production: Azure SQL)
- SignalR (built-in)
- BCrypt.Net-Next v4.0.3
- MailKit v4.x for SMTP OTP delivery
- JWT Bearer Authentication via `Microsoft.AspNetCore.Authentication.JwtBearer`

**Frontend (React.js):**
- React 18.x
- React Router DOM v6
- @microsoft/signalr v8.x
- Axios v1.x for HTTP requests
- Recharts v2.x for analytics charts

**Hosting (Configured):**
- Backend: Azure App Service
- Database: Azure SQL Database
- File Storage: Azure Blob Storage (profile pictures, QR codes, logos)
- Frontend: Azure Static Web Apps / Vercel

### Appendix B — User Manual Summary

**Logging In:**
1. Navigate to the application URL.
2. Enter your staff email and password.
3. If first login: check your email for the OTP, enter it, then set your new password.
4. You will be redirected automatically to your role dashboard.

**Cashier — Placing an Order:**
1. Click "New Order" on the Cashier Dashboard.
2. Select order type (Dine-in / Takeaway).
3. For dine-in: select the floor and table.
4. Add menu items from the menu panel; add special requests as needed.
5. Optionally apply a discount.
6. Click "Submit Order" — the kitchen is notified automatically.
7. When the order is marked Ready, process payment using the payment panel.

**Chef — Kitchen Display:**
1. Incoming orders appear automatically on the Kitchen Display.
2. Click "Start Preparing" to accept the order.
3. Click "Mark Ready" when the order is complete.
4. The cashier and waiter are notified automatically.

**Manager — Viewing Reports:**
1. Navigate to the Manager Dashboard → Business Insights.
2. Select the date range and report type.
3. Sales totals, payment breakdowns, and order counts are displayed.

### Appendix C — Cost Estimation (Indicative)

| Item | Estimated Monthly Cost |
|------|------------------------|
| Azure App Service (B1 plan) | ~$13 USD |
| Azure SQL Database (S0 tier) | ~$15 USD |
| Azure Blob Storage (LRS, 5 GB) | ~$0.10 USD |
| Azure Static Web Apps | Free (Hobby tier) |
| SMTP email service | Free (Gmail SMTP) |
| **Total** | **~$28 USD/month** |

---

*End of Report*

*Café Management System — Final Year Project Report*
*Bishworaj Dhami | Islington College | 2025–2026*
