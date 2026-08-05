# WTWR (What to Wear?): Back End

This project provides the back-end API for the WTWR application. It stores
users and clothing items, allows clients to create accounts and sign in, and
supports protected profile, creation, deletion, liking, and unliking actions.

## Technologies and Techniques

- Node.js and Express for the HTTP server and REST API
- MongoDB and Mongoose for data storage, schemas, and validation
- Validator for checking avatar and clothing-image URLs
- JSON Web Tokens and bcrypt for authentication and password hashing
- Authorization checks that restrict item deletion to its owner
- CORS support for the front-end application
- Modular routes, controllers, models, and error constants
- ESLint with the Airbnb configuration and Prettier
- Nodemon for hot reload during development

## Running the Project

- `npm run start` — launch the server at `http://localhost:3001`
- `npm run dev` — launch the server with hot reload
- `npm run lint` — check the project with ESLint

MongoDB must be available locally before the server starts. The application
connects to `mongodb://localhost:27017/wtwr_db`.

Public routes are `POST /signup`, `POST /signin`, and `GET /items`. Protected
routes expect an `Authorization: Bearer <token>` header and include
`GET /users/me`, `PATCH /users/me`, and all item mutation routes.

## Testing

The API can be tested with Postman or another HTTP client. Before committing,
make sure `sprint.txt` contains the current sprint number.
