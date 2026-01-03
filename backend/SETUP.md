# GlobeTrotter Backend Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your database credentials
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_mysql_password
# DB_NAME=globetrotter
# JWT_SECRET=your_secret_key_here
```

### 3. Initialize Database
```bash
# Make sure MySQL is running
npm run init-db
```

This will:
- Create the `globetrotter` database
- Create all necessary tables
- Insert default interests (Food & Dining, Culture & History, etc.)
- Insert sample cities (Paris, Tokyo, New York, etc.)

### 4. Start the Server
```bash
# Development mode (auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## Testing the API

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Register a User
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Save the token from the response for authenticated requests.

### Create a Trip
```bash
curl -X POST http://localhost:5000/api/trips \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "destination": "Tokyo, Japan",
    "startDate": "2024-12-01",
    "endDate": "2024-12-10",
    "travelers": 2,
    "budget": 3500,
    "tripType": "adventure"
  }'
```

## Database Structure

The database includes:
- **Users**: Authentication and user profiles
- **Trips**: User travel plans
- **Interests**: Travel interest categories
- **Cities**: Destination information
- **Activities**: Things to do and attractions
- **Itinerary**: Day-by-day trip plans
- **Budget**: Budget tracking and expenses
- **Recommendations**: Personalized trip suggestions

## Troubleshooting

### Database Connection Error
- Verify MySQL is running: `mysql -u root -p`
- Check credentials in `.env`
- Ensure database user has proper permissions

### Port Already in Use
- Change `PORT` in `.env`
- Or kill the process using port 5000

### JWT Errors
- Ensure `JWT_SECRET` is set in `.env`
- Use a strong, random secret in production

## Next Steps

1. Connect your frontend to `http://localhost:5000`
2. Update frontend API calls to use the backend endpoints
3. Test all features end-to-end
4. Add more sample data as needed

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong `JWT_SECRET`
3. Configure production database
4. Set up proper CORS for your domain
5. Use environment variables for all secrets
6. Set up logging and monitoring

