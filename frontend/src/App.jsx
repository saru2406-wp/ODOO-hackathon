import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import TripForm from "./pages/TripForm";
import TripList from "./pages/TripList";
import ItineraryBuilder from "./pages/ItineraryBuilder";
import CalendarView from "./pages/CalendarView";
import BudgetView from "./pages/BudgetView";
import ActivitySearch from "./pages/ActivitySearch";
import CitySearch from "./pages/CitySearch";
import Publicationary from "./pages/Publicationary";
import AdminDashboard from "./pages/AdminDashboard";
import HotelBooking from "./pages/HotelBooking";
import FlightBooking from "./pages/FlightBooking";
import TripRecommendations from "./pages/TripRecommendations";  
import ExpenseSplitter from "./components/ExpenseSplitter"
import "./App.css";

function App() {
  const isAuthenticated = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/trips/new" element={isAuthenticated ? <TripForm /> : <Navigate to="/login" />} />
          <Route path="/trips" element={isAuthenticated ? <TripList /> : <Navigate to="/login" />} />
          <Route path="/itinerary" element={isAuthenticated ? <ItineraryBuilder /> : <Navigate to="/login" />} />
          <Route path="/calendar" element={isAuthenticated ? <CalendarView /> : <Navigate to="/login" />} />
          <Route path="/budget" element={isAuthenticated ? <BudgetView /> : <Navigate to="/login" />} />
          <Route path="/activities" element={isAuthenticated ? <ActivitySearch /> : <Navigate to="/login" />} />
          <Route path="/cities" element={isAuthenticated ? <CitySearch /> : <Navigate to="/login" />} />
          <Route path="/publicationary" element={isAuthenticated ? <Publicationary /> : <Navigate to="/login" />} />
          <Route path="/hotels" element={isAuthenticated ? <HotelBooking /> : <Navigate to="/login" />} />
          <Route path="/flights" element={isAuthenticated ? <FlightBooking /> : <Navigate to="/login" />} />
          <Route path="/recommendations" element={isAuthenticated ? <TripRecommendations /> : <Navigate to="/login" />} />
          
          
          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={isAuthenticated && userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} 
          />
          
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;