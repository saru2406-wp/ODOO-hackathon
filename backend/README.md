# GlobeTrotter Backend API

Backend API for the GlobeTrotter travel planning application built with Node.js, Express, and MySQL.

## Features

- ✅ User Authentication (JWT-based)
- ✅ Trip Management (CRUD operations)
- ✅ Itinerary Builder (Days and Activities)
- ✅ Budget Tracking (Categories and Transactions)
- ✅ City and Activity Search
- ✅ Personalized Recommendations
- ✅ Expense Splitting
- ✅ Saved Activities
- ✅ Shared Trips (Publicationary)

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   - Database connection details
   - JWT secret key
   - Server port

3. **Initialize the database:**
   ```bash
   npm run init-db
   ```
   
   This will:
   - Create the database if it doesn't exist
   - Create all necessary tables
   - Insert default interests and sample cities

4. **Start the server:**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Trips
- `GET /api/trips` - Get all trips for user
- `GET /api/trips/:id` - Get single trip
- `POST /api/trips` - Create new trip
- `PUT /api/trips/:id` - Update trip
- `DELETE /api/trips/:id` - Delete trip

### Itinerary
- `GET /api/itinerary/trip/:tripId` - Get itinerary for trip
- `POST /api/itinerary/days` - Create itinerary day
- `POST /api/itinerary/activities` - Add activity to day
- `PUT /api/itinerary/activities/:id` - Update activity
- `DELETE /api/itinerary/activities/:id` - Delete activity
- `DELETE /api/itinerary/days/:id` - Delete itinerary day

### Budget
- `GET /api/budget/trip/:tripId` - Get budget for trip
- `POST /api/budget/categories` - Create budget category
- `PUT /api/budget/categories/:id` - Update category
- `POST /api/budget/transactions` - Add transaction
- `GET /api/budget/transactions/category/:categoryId` - Get transactions
- `DELETE /api/budget/transactions/:id` - Delete transaction

### Cities
- `GET /api/cities` - Get all cities (with filters)
- `GET /api/cities/:id` - Get single city

### Activities
- `GET /api/activities` - Get all activities (with filters)
- `GET /api/activities/:id` - Get single activity
- `POST /api/activities/:id/save` - Save activity
- `DELETE /api/activities/:id/save` - Unsave activity
- `GET /api/activities/saved/all` - Get saved activities

### Recommendations
- `GET /api/recommendations` - Get personalized recommendations
- `POST /api/recommendations/:id/save` - Save recommendation

### Expenses
- `POST /api/expenses/split` - Create expense split
- `GET /api/expenses/split/trip/:tripId` - Get expense splits for trip

## Database Schema

The database includes the following main tables:
- `users` - User accounts
- `trips` - User trips
- `interests` - Travel interests
- `cities` - City information
- `activities` - Activities and attractions
- `itinerary_days` - Itinerary days
- `itinerary_activities` - Activities in itinerary
- `budget_categories` - Budget categories
- `budget_transactions` - Budget transactions
- `expense_splits` - Expense splitting
- `saved_activities` - User saved activities
- `trip_recommendations` - Trip recommendations
- `shared_trips` - Shared/public trips

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

Or as a query parameter:
```
?token=<token>
```

## Error Handling

The API returns standard HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

Error responses include a `message` field with details.

## Development

The server runs on `http://localhost:5000` by default.

Use `npm run dev` for development with auto-reload (requires nodemon).

## Production

1. Set `NODE_ENV=production` in `.env`
2. Use a strong `JWT_SECRET`
3. Configure proper CORS settings
4. Use a production database
5. Set up proper logging and monitoring

## License

ISC

