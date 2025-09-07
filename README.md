# 📖 BookNGo Frontend

## Table of Contents
1. [Project Overview](#project-overview)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Architecture](#architecture)  
5. [Page & Component Structure](#page--component-structure)  
6. [Setup & Installation](#setup--installation)  
7. [Running the Application](#running-the-application)  
8. [Folder Structure](#folder-structure)  

---

## Project Overview

**BookNGo Frontend** is the client-side application for the BookNGo event booking platform. Users can browse events, book tickets, and view their previous bookings. Admins can create events, manage them, and view all bookings.  

The frontend is built using **React.js** with **Tailwind CSS** for styling. It communicates with the backend via RESTful APIs.

---

## Features

### User Features:
- View event listings with cards  
- Open booking form by clicking an event  
- Submit booking form with name, contact, and ticket details  
- View previous bookings  

### Admin Features:
- Admin login and authentication  
- Add new events using forms  
- View all bookings in table format  

### Common Features:
- Responsive design using Tailwind CSS  
- Client-side input validation and error handling  
- Navigation bar with dynamic user/admin links  

---

## Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | React.js |
| Styling | Tailwind CSS |
| Icons | react-icons |
| State Management | React `useState`, `useEffect` |
| Routing | react-router-dom |
| HTTP Client | Axios |
| Version Control | Git, GitHub |
| Deployment | Vercel / Netlify |

---

---

## Page & Component Structure

### Navbar
- Dynamic for **User/Admin**
- Displays: Home, Previous Bookings (user), Status (admin), Hi {Name}, Logout

### User Pages
1. **UserLanding.jsx** – Shows event cards  
2. **UserBookingForm.jsx** – Booking form with validations  
3. **UserPreviousBookings.jsx** – Table of past bookings  
4. **SuccessPage.jsx** – Confirmation after booking  

### Admin Pages
1. **AdminLanding.jsx** – Dashboard / quick links  
2. **AdminStatus.jsx** – Table view of all bookings  
3. **AdminAddEvent.jsx** – Form to create new events  

### Components
- **Hero.jsx** – Landing page hero section  
- **About.jsx** – About the platform  
- **Skills.jsx** – Tech stack overview  
- **Projects.jsx** – Project screenshots & descriptions  
- **Contact.jsx** – Contact form  

> All forms include **client-side validation** and error handling using React state + CSS feedback.

---

## Setup & Installation

1. **Clone the repo**
```bash
git clone https://github.com/your-username/bookngo-frontend.git
cd bookngo-frontend
```
2. **Install Dependencies**
```bash
npm install
```
3. **Create a .env file (if needed for backend API)**
   ```bash
   VITE_API_BASE_URL=http://localhost:5000/bookngo

## Running the Application
# Start the development server
npm run dev
Default port: http://localhost:5173 (Vite default)

The frontend communicates with the backend using the base URL defined in .env




The frontend follows a **component-based structure**:

