# BreakBuddy API

A Node.js API for the BreakBuddy breakfast booking system with employee and chef authentication.

## Features

- Employee registration and login
- Chef login
- JWT-based authentication
- Password hashing with bcrypt
- Request validation with Zod
- MongoDB database integration

## Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)

### Installation

1. Clone the repository
2. Navigate to the API directory:
   ```bash
   cd breakbuddy-api
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file based on `env.example`:
   ```bash
   cp env.example .env
   ```

5. Update the `.env` file with your configuration:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/breakbuddy
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

6. Create a default chef account:
   ```bash
   node src/scripts/createChef.js
   ```

7. Start the server:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication

#### Employee Registration
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "fullName": "John Doe",
    "employeeId": "EMP001",
    "email": "john@company.com",
    "password": "password123",
    "confirmPassword": "password123"
  }
  ```

#### Employee Login
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@company.com",
    "password": "password123"
  }
  ```

#### Chef Login
- **POST** `/api/auth/chef/login`
- **Body:**
  ```json
  {
    "chefId": "chef001",
    "password": "chef123"
  }
  ```

### Health Check
- **GET** `/health`

## Default Chef Credentials

After running the setup script, you can use these default credentials:
- **Chef ID:** `chef001`
- **Password:** `chef123`

## Response Format

### Success Response
```json
{
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "fullName": "John Doe",
    "employeeId": "EMP001",
    "email": "john@company.com",
    "role": "employee"
  }
}
```

### Error Response
```json
{
  "error": "Invalid email or password"
}
```

## Authentication

Include the JWT token in the Authorization header for protected routes:
```
Authorization: Bearer <your-jwt-token>
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Zod** - Request validation
- **CORS** - Cross-origin resource sharing 