// API Service - Centralized API calls
const API_BASE_URL = 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Generic fetch wrapper
const apiCall = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: (email, password) => apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }),
  signup: (name, email, password) => apiCall('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  }),
  getCurrentUser: () => apiCall('/auth/me'),
};

// Trips API
export const tripsAPI = {
  getAll: () => apiCall('/trips'),
  getById: (id) => apiCall(`/trips/${id}`),
  create: (tripData) => apiCall('/trips', {
    method: 'POST',
    body: JSON.stringify(tripData),
  }),
  update: (id, tripData) => apiCall(`/trips/${id}`, {
    method: 'PUT',
    body: JSON.stringify(tripData),
  }),
  delete: (id) => apiCall(`/trips/${id}`, {
    method: 'DELETE',
  }),
};

// Itinerary API
export const itineraryAPI = {
  getByTrip: (tripId) => apiCall(`/itinerary/trip/${tripId}`),
  createDay: (dayData) => apiCall('/itinerary/days', {
    method: 'POST',
    body: JSON.stringify(dayData),
  }),
  addActivity: (activityData) => apiCall('/itinerary/activities', {
    method: 'POST',
    body: JSON.stringify(activityData),
  }),
  updateActivity: (id, activityData) => apiCall(`/itinerary/activities/${id}`, {
    method: 'PUT',
    body: JSON.stringify(activityData),
  }),
  deleteActivity: (id) => apiCall(`/itinerary/activities/${id}`, {
    method: 'DELETE',
  }),
  deleteDay: (id) => apiCall(`/itinerary/days/${id}`, {
    method: 'DELETE',
  }),
};

// Budget API
export const budgetAPI = {
  getByTrip: (tripId) => apiCall(`/budget/trip/${tripId}`),
  createCategory: (categoryData) => apiCall('/budget/categories', {
    method: 'POST',
    body: JSON.stringify(categoryData),
  }),
  updateCategory: (id, categoryData) => apiCall(`/budget/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(categoryData),
  }),
  addTransaction: (transactionData) => apiCall('/budget/transactions', {
    method: 'POST',
    body: JSON.stringify(transactionData),
  }),
  getTransactions: (categoryId) => apiCall(`/budget/transactions/category/${categoryId}`),
  deleteTransaction: (id) => apiCall(`/budget/transactions/${id}`, {
    method: 'DELETE',
  }),
};

// Cities API
export const citiesAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiCall(`/cities?${params.toString()}`);
  },
  getById: (id) => apiCall(`/cities/${id}`),
};

// Activities API
export const activitiesAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiCall(`/activities?${params.toString()}`);
  },
  getById: (id) => apiCall(`/activities/${id}`),
  save: (id) => apiCall(`/activities/${id}/save`, { method: 'POST' }),
  unsave: (id) => apiCall(`/activities/${id}/save`, { method: 'DELETE' }),
  getSaved: () => apiCall('/activities/saved/all'),
};

// Recommendations API
export const recommendationsAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiCall(`/recommendations?${params.toString()}`);
  },
  save: (id) => apiCall(`/recommendations/${id}/save`, { method: 'POST' }),
};

// Sharing API
export const sharingAPI = {
  shareTrip: (tripId, isPublic) => apiCall(`/sharing/trip/${tripId}`, {
    method: 'POST',
    body: JSON.stringify({ isPublic }),
  }),
  getPublic: (limit = 20, offset = 0) => apiCall(`/sharing/public?limit=${limit}&offset=${offset}`),
  getByCode: (shareCode) => apiCall(`/sharing/code/${shareCode}`),
  like: (shareCode) => apiCall(`/sharing/like/${shareCode}`, { method: 'POST' }),
  unshare: (tripId) => apiCall(`/sharing/trip/${tripId}`, { method: 'DELETE' }),
};

// Expenses API
export const expensesAPI = {
  createSplit: (splitData) => apiCall('/expenses/split', {
    method: 'POST',
    body: JSON.stringify(splitData),
  }),
  getByTrip: (tripId) => apiCall(`/expenses/split/trip/${tripId}`),
};

// Bookings API
export const bookingsAPI = {
  getHotels: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiCall(`/bookings/hotels?${params.toString()}`);
  },
  getFlights: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiCall(`/bookings/flights?${params.toString()}`);
  },
};

export default {
  auth: authAPI,
  trips: tripsAPI,
  itinerary: itineraryAPI,
  budget: budgetAPI,
  cities: citiesAPI,
  activities: activitiesAPI,
  recommendations: recommendationsAPI,
  sharing: sharingAPI,
  expenses: expensesAPI,
  bookings: bookingsAPI,
};

