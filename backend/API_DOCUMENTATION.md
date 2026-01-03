# GlobeTrotter API Documentation

Complete API reference for the GlobeTrotter backend.

## Base URL
```
http://localhost:5000/api
```

## Authentication

Most endpoints require authentication via JWT token. Include the token in the Authorization header:
```
Authorization: Bearer <your_token>
```

Or as a query parameter:
```
?token=<your_token>
```

---

## Authentication Endpoints

### Register User
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

---

## Trip Endpoints

### Get All Trips
```http
GET /api/trips
Authorization: Bearer <token>
```

### Get Single Trip
```http
GET /api/trips/:id
Authorization: Bearer <token>
```

### Create Trip
```http
POST /api/trips
Authorization: Bearer <token>
Content-Type: application/json

{
  "destination": "Tokyo, Japan",
  "tripType": "adventure",
  "startDate": "2024-12-01",
  "endDate": "2024-12-10",
  "travelers": 2,
  "budget": 3500,
  "description": "Exploring temples and food",
  "interests": [1, 2, 3],
  "accommodation": "hotel",
  "transportation": "flight"
}
```

### Update Trip
```http
PUT /api/trips/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "destination": "Updated destination",
  "status": "upcoming"
}
```

### Delete Trip
```http
DELETE /api/trips/:id
Authorization: Bearer <token>
```

---

## Itinerary Endpoints

### Get Itinerary for Trip
```http
GET /api/itinerary/trip/:tripId
Authorization: Bearer <token>
```

### Create Itinerary Day
```http
POST /api/itinerary/days
Authorization: Bearer <token>
Content-Type: application/json

{
  "tripId": 1,
  "dayNumber": 1,
  "date": "2024-12-01",
  "title": "Arrival Day"
}
```

### Add Activity to Day
```http
POST /api/itinerary/activities
Authorization: Bearer <token>
Content-Type: application/json

{
  "itineraryDayId": 1,
  "activityId": 5,
  "time": "09:00",
  "title": "Visit Temple",
  "type": "sightseeing",
  "location": "Senso-ji Temple",
  "notes": "Bring camera"
}
```

### Update Activity
```http
PUT /api/itinerary/activities/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "time": "10:00",
  "title": "Updated title"
}
```

### Delete Activity
```http
DELETE /api/itinerary/activities/:id
Authorization: Bearer <token>
```

---

## Budget Endpoints

### Get Budget for Trip
```http
GET /api/budget/trip/:tripId
Authorization: Bearer <token>
```

### Create Budget Category
```http
POST /api/budget/categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "tripId": 1,
  "name": "Flights",
  "allocated": 1200,
  "color": "#3B82F6",
  "icon": "✈️"
}
```

### Add Transaction
```http
POST /api/budget/transactions
Authorization: Bearer <token>
Content-Type: application/json

{
  "budgetCategoryId": 1,
  "description": "Flight to Tokyo",
  "amount": 850,
  "transactionDate": "2024-11-25",
  "type": "expense"
}
```

### Get Transactions
```http
GET /api/budget/transactions/category/:categoryId
Authorization: Bearer <token>
```

---

## City Endpoints

### Get All Cities
```http
GET /api/cities?search=paris&country=France&minCost=3&maxCost=5
Authorization: Bearer <token>
```

**Query Parameters:**
- `search` - Search by name, country, or description
- `country` - Filter by country
- `minCost` - Minimum cost index (1-5)
- `maxCost` - Maximum cost index (1-5)
- `minPopularity` - Minimum popularity (0-100)

### Get Single City
```http
GET /api/cities/:id
Authorization: Bearer <token>
```

---

## Activity Endpoints

### Get All Activities
```http
GET /api/activities?search=temple&category=sightseeing&price=budget&minRating=4&cityId=2
Authorization: Bearer <token>
```

**Query Parameters:**
- `search` - Search by name or description
- `category` - Filter by category
- `price` - Filter by price range (free, budget, moderate, luxury)
- `minRating` - Minimum rating (0-5)
- `cityId` - Filter by city

### Save Activity
```http
POST /api/activities/:id/save
Authorization: Bearer <token>
```

### Get Saved Activities
```http
GET /api/activities/saved/all
Authorization: Bearer <token>
```

---

## Recommendation Endpoints

### Get Recommendations
```http
GET /api/recommendations?budget=mid-range&duration=medium&activities[]=beach&activities[]=culture
Authorization: Bearer <token>
```

**Query Parameters:**
- `budget` - budget, mid-range, luxury
- `duration` - short, medium, long
- `season` - spring, summer, fall, winter, any
- `activities` - Array of activity types
- `region` - asia, europe, americas, etc.

---

## Expense Split Endpoints

### Create Expense Split
```http
POST /api/expenses/split
Authorization: Bearer <token>
Content-Type: application/json

{
  "tripId": 1,
  "totalAmount": 1000,
  "splitType": "equal",
  "participants": [
    { "name": "You", "share": 500, "percentage": 50 },
    { "name": "Friend", "share": 500, "percentage": 50 }
  ]
}
```

### Get Expense Splits
```http
GET /api/expenses/split/trip/:tripId
Authorization: Bearer <token>
```

---

## Sharing Endpoints

### Share Trip
```http
POST /api/sharing/trip/:tripId
Authorization: Bearer <token>
Content-Type: application/json

{
  "isPublic": true
}
```

### Get Public Trips
```http
GET /api/sharing/public?limit=20&offset=0
```

### Get Trip by Share Code
```http
GET /api/sharing/code/:shareCode
```

### Like Shared Trip
```http
POST /api/sharing/like/:shareCode
Authorization: Bearer <token>
```

---

## Booking Endpoints

### Get Hotels
```http
GET /api/bookings/hotels?cityId=2&minPrice=50&maxPrice=200&minRating=4
Authorization: Bearer <token>
```

### Get Flights
```http
GET /api/bookings/flights?origin=Tokyo&destination=Paris&date=2024-12-01&maxPrice=1000
Authorization: Bearer <token>
```

---

## Admin Endpoints

**Note:** All admin endpoints require admin role.

### Get Dashboard Stats
```http
GET /api/admin/stats
Authorization: Bearer <admin_token>
```

### Get All Users
```http
GET /api/admin/users?limit=50&offset=0
Authorization: Bearer <admin_token>
```

### Update User Role
```http
PUT /api/admin/users/:id/role
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "role": "admin"
}
```

### Add City
```http
POST /api/admin/cities
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Barcelona",
  "country": "Spain",
  "countryCode": "ES",
  "costIndex": 3,
  "popularity": 88,
  "description": "Vibrant city with amazing architecture"
}
```

### Add Activity
```http
POST /api/admin/activities
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Sagrada Familia",
  "category": "sightseeing",
  "location": "Barcelona, Spain",
  "cityId": 10,
  "priceRange": "moderate",
  "priceAmount": 25,
  "rating": 4.8,
  "reviewCount": 5000,
  "duration": "2-3 hours",
  "description": "Famous basilica",
  "highlights": ["Architecture", "Gaudi", "Views"],
  "tags": ["landmark", "architecture", "history"]
}
```

---

## Error Responses

All errors follow this format:
```json
{
  "message": "Error description"
}
```

**Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Notes

- All dates should be in ISO 8601 format (YYYY-MM-DD)
- All times should be in 24-hour format (HH:MM)
- Amounts are in decimal format
- JSON fields (highlights, tags, best_for) should be JSON arrays
- Pagination uses `limit` and `offset` query parameters

