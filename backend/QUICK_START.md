# Quick Start Guide

## Starting the Server

### If Port 5000 is Already in Use:

1. **Find the process:**
   ```powershell
   netstat -ano | findstr :5000
   ```

2. **Kill the process (replace <PID> with the number from step 1):**
   ```powershell
   taskkill /PID <PID> /F
   ```

3. **Or use this one-liner:**
   ```powershell
   Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
   ```

### Start the Server:

```powershell
cd backend
npm run dev
```

The server will start on `http://localhost:5000`

## Testing the Server

Visit in your browser:
- Health check: http://localhost:5000/api/health
- API base: http://localhost:5000/api

## Common Issues

### Port Already in Use
- Kill the process using the commands above
- Or change PORT in `.env` file

### Database Connection Error
- Make sure MySQL is running
- Check your password in `.env` (should be in quotes if it has special characters)
- Verify credentials are correct

### Module Not Found
- Run `npm install` in the backend directory

