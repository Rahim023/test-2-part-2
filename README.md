# MERN Auth Example

This project contains a simple MERN-stack authentication example using:
- MongoDB (mongoose)
- Express backend (JWT auth)
- React frontend (simple pages: login, signup, forgot password, discussion board)
- JWT stored in localStorage and sent as Bearer token

How to run locally:
1. Start MongoDB (e.g., mongod)
2. Backend:
   - cd backend
   - copy .env.example to .env and set MONGO_URI and JWT_SECRET
   - npm install
   - npm run dev
3. Frontend:
   - cd frontend
   - npm install
   - npm start
