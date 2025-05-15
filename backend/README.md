
# WebSecLearn Backend


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
