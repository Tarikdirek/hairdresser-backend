# Hairdresser Backend

A Node.js + MongoDB backend for a barber/salon website.

## Features

- User authentication (JWT)
- User profiles
- Appointment booking/cancellation
- Service management (CRUD)
- Stylist management
- Gallery uploads (Multer)

## Setup

1. Clone the repo and `cd` into the project folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with:
   ```env
   MONGODB_URI=mongodb://localhost:27017/kuafor
   JWT_SECRET=your_jwt_secret_here
   PORT=5000
   ```
4. Start MongoDB locally or use a cloud provider.
5. Run the server:
   ```bash
   node app.js
   ```

## API Endpoints

- `POST /api/auth/signup` — Register user
- `POST /api/auth/login` — Login user
- `POST /api/appointments/book` — Book appointment (auth required)
- `POST /api/appointments/cancel/:id` — Cancel appointment (auth required)
- `POST /api/services` — Create service (auth required)
- `GET /api/services` — List services
- `PUT /api/services/:id` — Update service (auth required)
- `DELETE /api/services/:id` — Delete service (auth required)
- `POST /api/stylists` — Add stylist (auth required)
- `GET /api/stylists` — List stylists
- `PUT /api/stylists/:id` — Edit stylist (auth required)
- `POST /api/gallery/upload` — Upload gallery image (auth required, multipart/form-data)

## Notes

- Protect sensitive routes with JWT (see `middleware/auth.js`).
- Images are stored in `/uploads`.
- MongoDB must be running for the backend to work.
