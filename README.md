# BreakBuddy API

A Node.js API for the BreakBuddy breakfast booking system with employee and chef authentication.

## 🚀 Features

- **Employee Registration & Login** - Secure user authentication
- **Chef Login** - Kitchen staff authentication
- **JWT-based Authentication** - Secure token-based sessions
- **Password Hashing** - bcrypt with 12 salt rounds
- **Request Validation** - Zod schema validation with detailed error messages
- **MongoDB Integration** - NoSQL database with Mongoose ODM
- **ES Modules** - Modern JavaScript with import/export syntax
- **CORS Support** - Cross-origin resource sharing enabled
- **Error Handling** - Comprehensive error management
- **Role-based Access** - Employee and Chef role management

## 🏗️ Architecture

```
breakbuddy-api/
├── src/
│   ├── models/           # Database models
│   │   ├── User.model.js
│   │   └── Chef.model.js
│   ├── controllers/      # Business logic
│   │   └── authController.js
│   ├── routes/           # API routes
│   │   └── auth.routes.js
│   ├── middleware/       # Custom middleware
│   │   ├── auth.js
│   │   └── validate.js
│   ├── validation/       # Zod schemas
│   │   └── auth.js
│   └── scripts/          # Utility scripts
│       └── createChef.js
├── index.js              # Server entry point
├── package.json
└── README.md
```

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud instance)
- **npm** or **yarn** package manager

## 🔧 Installation & Setup

### 1. Clone and Navigate
```bash
git clone <repository-url>
cd breakbuddy-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file based on `env.example`:
```bash
cp env.example .env
```

Update the `.env` file:
```env
# Server Configuration
PORT=5000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/breakbuddy

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Environment
NODE_ENV=development
```

### 4. Create Default Chef Account
```bash
node src/scripts/createChef.js
```

### 5. Start the Server
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

## 🔌 API Endpoints

### Authentication Endpoints

#### Employee Registration
- **POST** `/api/auth/register`
- **Description:** Register a new employee account
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
- **Response:**
  ```json
  {
    "message": "User registered successfully",
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

#### Employee Login
- **POST** `/api/auth/login`
- **Description:** Authenticate employee user
- **Body:**
  ```json
  {
    "email": "john@company.com",
    "password": "password123"
  }
  ```
- **Response:** Same as registration response

#### Chef Login
- **POST** `/api/auth/chef/login`
- **Description:** Authenticate chef user
- **Body:**
  ```json
  {
    "chefId": "chef001",
    "password": "chef123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Chef login successful",
    "token": "jwt-token-here",
    "chef": {
      "id": "chef-id",
      "name": "Master Chef",
      "chefId": "chef001",
      "role": "chef"
    }
  }
  ```

### Utility Endpoints

#### Health Check
- **GET** `/health`
- **Description:** Check API health status
- **Response:**
  ```json
  {
    "status": "OK",
    "message": "BreakBuddy API is running"
  }
  ```

## 🔐 Authentication

### JWT Token Usage
Include the JWT token in the Authorization header for protected routes:
```
Authorization: Bearer <your-jwt-token>
```

### Token Expiration
- **Duration:** 24 hours
- **Auto-logout:** On token expiration or invalid token

## 📊 Database Models

### User Model
```javascript
{
  fullName: String (required),
  employeeId: String (required, unique),
  email: String (required, unique),
  password: String (hashed, required),
  role: String (default: 'employee'),
  profile: {
    phone: String,
    department: String
  },
  timestamps: true
}
```

### Chef Model
```javascript
{
  name: String (required),
  chefId: String (required, unique),
  password: String (hashed, required),
  role: String (default: 'chef'),
  timestamps: true
}
```

## ✅ Validation Rules

### Employee Registration
- **Full Name:** Required, 2-50 characters
- **Employee ID:** Required, 3-20 characters, unique
- **Email:** Required, valid email format, unique
- **Password:** Required, minimum 6 characters
- **Confirm Password:** Must match password

### Employee Login
- **Email:** Required, valid email format
- **Password:** Required

### Chef Login
- **Chef ID:** Required
- **Password:** Required

## 🚨 Error Handling

### Error Response Format
```json
{
  "error": "Specific error message",
  "details": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["email"],
      "message": "Email is required"
    }
  ]
}
```

### Common Error Codes
- **400** - Bad Request (validation errors)
- **401** - Unauthorized (invalid credentials)
- **403** - Forbidden (insufficient permissions)
- **404** - Not Found (route not found)
- **500** - Internal Server Error

## 🔧 Development

### Scripts
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm test         # Run tests (if configured)
```

### Default Credentials

#### Chef Account
- **Chef ID:** `chef001`
- **Password:** `chef123`

#### Test Employee
```json
{
  "fullName": "Test Employee",
  "employeeId": "EMP1001",
  "email": "test@company.com",
  "password": "TestPass123",
  "confirmPassword": "TestPass123"
}
```

## 🛡️ Security Features

- **Password Hashing** - bcrypt with 12 salt rounds
- **JWT Tokens** - Secure session management
- **Input Validation** - Zod schema validation
- **CORS Protection** - Cross-origin request handling
- **Error Sanitization** - Safe error messages
- **Role-based Access** - User role management

## 🧪 Testing

### Manual Testing with Postman

1. **Start the server:**
   ```bash
   npm run dev
   ```

2. **Test Registration:**
   - Method: `POST`
   - URL: `http://localhost:5000/api/auth/register`
   - Body: JSON with registration data

3. **Test Login:**
   - Method: `POST`
   - URL: `http://localhost:5000/api/auth/login`
   - Body: JSON with login credentials

4. **Test Chef Login:**
   - Method: `POST`
   - URL: `http://localhost:5000/api/auth/chef/login`
   - Body: JSON with chef credentials

## 📚 Technologies Used

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing library
- **Zod** - TypeScript-first schema validation
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

---

**Note:** This API is designed to work with the BreakBuddy frontend application. Make sure to configure the frontend to use the correct backend URL. 