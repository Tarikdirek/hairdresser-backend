# Hairdresser Backend

A Node.js + MongoDB backend for a barber/salon website.

## Features

- User registration and login (no authentication required for endpoints)
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
- `POST /api/appointments/book` — Book appointment
- `POST /api/appointments/cancel/:id` — Cancel appointment
- `POST /api/services` — Create service
- `GET /api/services` — List services
- `PUT /api/services/:id` — Update service
- `DELETE /api/services/:id` — Delete service
- `POST /api/stylists` — Add stylist
- `GET /api/stylists` — List stylists
- `PUT /api/stylists/:id` — Edit stylist
- `POST /api/gallery/upload` — Upload gallery image (multipart/form-data)

## Notes

- All endpoints are now public; no authentication or token is required.
- Images are stored in `/uploads`.
- MongoDB must be running for the backend to work.
