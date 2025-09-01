import "/src/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./src/pages/Signup";
import Login from "./src/pages/Login";
import AdminLandingPage from "./src/pages/AdminHome";
import NewEventForm from "./src/pages/NewEventForm";
import AdminStatusPage from "./src/pages/AdminStatusPage";
import UserHomePage from './src/pages/UserHomePage' 
import BookingForm from './src/pages/EventBookingForm'
import SuccessPage from "./src/pages/SuccessPage";
import UserPreviousBookingsPage from "./src/pages/UserPreviousBookings";// import UserPreviousBookings from './pages/UserPreviousBookings'
// import SuccessPage from './pages/SuccessPage'

// Simple protected route wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route → redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin routes */}
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute>
              <AdminLandingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-event"
          element={
            <ProtectedRoute>
              <NewEventForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/status"
          element={
            <ProtectedRoute>
              <AdminStatusPage />
            </ProtectedRoute>
          }
        />

        {/* User routes (to be added later) */}
        <Route 
          path="/user/home" 
          element={
            <ProtectedRoute>
              <UserHomePage />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/user/booking/:eventId" 
          element={
            <ProtectedRoute>
              <BookingForm />
            </ProtectedRoute>
          } 
        />

         <Route 
          path="/user/previousBooking" 
          element={
            <ProtectedRoute>
              <UserPreviousBookingsPage />
            </ProtectedRoute>
          } 
        />

       
        <Route 
          path="/user/success" 
          element={
            <ProtectedRoute>
              <SuccessPage />
            </ProtectedRoute>
          } 
        />  

        {/* Catch-all route → redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
