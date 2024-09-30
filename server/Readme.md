# Folder Structure

### `/config`

-   **Description**: Contains application-wide settings and environment-specific configurations.

### `/controllers`

-   **Description**: Manages HTTP requests and responses; interacts with services to execute business logic.

### `/models`

-   **Description**: Defines data schemas and handles interactions with the database.

### `/routes`

-   **Description**: Maps API endpoints to their corresponding controller functions.

### `/services`

-   **Description**: Contains core business logic and reusable operations.

### `/middlewares`

-   **Description**: Custom functions for request processing, such as authentication and error handling.

### `/utils`

-   **Description**: Utility functions and helpers that can be reused throughout the application.

### `/public`

-   **Description**: Hosts static files, including images, stylesheets, and client-side scripts.

### `/tests`

-   **Description**: Includes unit and integration tests for various components of the application.

### `/migrations` & `/seeds`

-   **Description**: Manages database migrations and seed data for initial database population.

### `/app.js`

-   **Description**: Initializes the Express application and sets up routes and middleware.

### `/server.js`

-   **Description**: Starts the server and listens for incoming requests.
