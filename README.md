# Club Placemarks

A web application for managing club locations and details. This project allows users to sign up, log in, and maintain a list of clubs with their geographical locations.

## Features

- **User Authentication:** Secure signup and login functionality using cookie-based sessions.
- **Club Management:** Create, read, update, and delete (CRUD) operations for clubs.
- **Location Data:** Store and view geographical coordinates (Latitude & Longitude) for each club.
- **JSON Persistence:** Lightweight data storage using local JSON files (Lowdb).
- **REST API:** Full API support for user and club management.

## Tech Stack

- **Backend:** Node.js, Hapi.js
- **Language:** TypeScript
- **Templating:** Handlebars
- **Styling:** Bulma CSS Framework
- **Testing:** Mocha, Chai, Axios
- **Database:** Lowdb (JSON Store)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd club-placemarks
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following configuration:
   ```env
   NODE_ENV=development
   HOST=localhost
   PORT=3000
   COOKIE_PASSWORD=secretpasswordnotrevealedtoanyone
   ```

### Running the Application

To build the TypeScript project and start the server:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

### Running Tests

To run the full suite of unit and API tests:

```bash
npm test
```

## Project Structure

```
src/
  ├── api/           # API handlers
  ├── controller/    # Web controllers
  ├── model/         # Data models and JSON store implementation
  ├── view/          # Handlebars templates
  ├── server.ts      # Application entry point
  └── ...
test/                # Unit and API tests
```
