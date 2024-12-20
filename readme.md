# JSON Server Backend for Pawty Time

This repository contains the backend code for the **Pawty Time** project, which provides an API for managing animal adoption listings and community events. It leverages **JSON Server** for a fast setup of a mock REST API, making it perfect for development and testing before connecting to a full-fledged database.

## Features

- **Adoption Management**: Manage animal adoption listings, including creating, viewing, and updating details.
- **Event Management**: Create and manage community events related to animal welfare and adoption.
- **Authentication**: Simple authentication system for user registration, login, and session management.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server.
- **JSON Server**: A fast, low-maintenance REST API mock server used for creating endpoints for adoption listings and events.
- **Express.js**: Minimal web framework for handling routing and middleware, enabling easy extension and handling of HTTP requests.

## Installation & Setup

To set up the project, follow these steps:

### Prerequisites

- **Node.js** (v14 or higher): Ensure Node.js is installed on your system.
- **npm** (Node Package Manager): Comes bundled with Node.js.

### Instructions

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/BaptisteDSH/json-server-backend.git
   cd json-server-backend
   ```

2. **Install Dependencies**:
   Install the required packages:

   ```bash
   npm install
   ```

3. **Configure the Environment**:
   Create a `.env` file in the root of the project and add the following variables:

   ```
   PORT=5000
   JWT_SECRET=<your-secret-key>
   ```

4. **Start the Server**:
   Launch the server:

   ```bash
   npm start
   ```

   The API will be accessible at (https://module-3-final-project-server.onrender.com/).

### API Endpoints

#### Adoption Routes

- **`GET /adoptions`**: Retrieve all adoption listings.
- **`POST /adoptions`**: Create a new adoption listing.
- **`GET /adoptions/:id`**: Retrieve a single adoption listing by ID.
- **`PUT /adoptions/:id`**: Update an adoption listing by ID.
- **`DELETE /adoptions/:id`**: Delete an adoption listing by ID.

#### Event Routes

- **`GET /events`**: Retrieve all community events.
- **`POST /events`**: Create a new event.
- **`GET /events/:id`**: Retrieve a single event by ID.
- **`PUT /events/:id`**: Update an event by ID.
- **`DELETE /events/:id`**: Delete an event by ID.

#### Authentication Routes

- **`POST /auth/login`**: User login (requires username/password).
- **`POST /auth/register`**: User registration (requires username, password, and email).

## Contributions

Contributions are highly encouraged! If you want to contribute:

1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature/my-feature
   ```
3. Make your changes, commit, and push to your fork:
   ```bash
   git commit -m "Add new feature"
   git push origin feature/my-feature
   ```
4. Open a Pull Request with your changes.

## License

This project is licensed under the MIT License.

## Contact

For any questions or suggestions, feel free to contact us at: contact@pawtytime.com.
