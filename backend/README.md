
# WebSecLearn Backend

This is the backend for the WebSecLearn application, providing API endpoints for user authentication and progress tracking.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```

3. Edit the `.env` file to set your MongoDB connection string and JWT secret.

## Running the Server

Development mode:
```
npm run dev
```

Production mode:
```
npm start
```

## API Routes

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user
- `GET /api/auth/validate`: Validate JWT token
- `GET /api/auth/user`: Get current user details

### Progress Tracking

- `GET /api/progress`: Get user's learning progress
- `POST /api/progress/complete-lab`: Mark a lab as completed
- `POST /api/progress/update-lab`: Update progress percentage for a lab

## Models

### User
- name: User's full name
- email: User's email (unique)
- password: Hashed password
- profileImage: URL to profile picture
- createdAt: Account creation date

### Progress
- user: Reference to User
- completedLabs: Array of completed lab IDs
- labProgress: Map of lab IDs to completion percentages
- earnedBadges: Array of earned badge IDs
- totalHours: Total learning hours
- currentStreak: Current daily streak
- lastActive: Date of last activity
