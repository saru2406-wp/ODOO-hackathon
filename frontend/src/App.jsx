import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import TripForm from './pages/TripForm';
import TripList from './pages/TripList';
import ItineraryBuilder from './pages/ItineraryBuilder';
import CitySearch from './pages/CitySearch';
import ActivitySearch from './pages/ActivitySearch';
import BudgetView from './pages/BudgetView';
import CalendarView from './pages/CalendarView';
import PublicItinerary from './pages/PublicItinerary';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes wrapped in Layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trips/new" element={<TripForm />} />
          <Route path="/trips" element={<TripList />} />
          <Route path="/itinerary/:id" element={<ItineraryBuilder />} />
          <Route path="/search/cities" element={<CitySearch />} />
          <Route path="/search/activities" element={<ActivitySearch />} />
          <Route path="/budget/:id" element={<BudgetView />} />
          <Route path="/calendar/:id" element={<CalendarView />} />
          <Route path="/public/:id" element={<PublicItinerary />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
