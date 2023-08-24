[![GitHub Profile](https://img.shields.io/github/followers/treesaretall?style=social)](https://github.com/treesaretall)

# SocialBack - Backend Social Media Application

SocialBack is a backend application for a social media platform that provides API routes for managing users and thoughts. This README will guide you through the setup and usage of this application.

## Walkthrough Video

[Click to Watch Video](https://drive.google.com/file/d/1Wt5joqIOIOxyqdiiQ1q_SZQk0cmZejG7/view)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
  - [Thought Routes](#thought-routes)
  - [User Routes](#user-routes)
- [License](#license)

## Installation

To run SocialBack locally, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/treesaretall/socialback.git
   ```

2. Change to the project directory:

   ```bash
   cd socialback
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Seed the application:

   ```bash
   npm run seed
   ```

5. Start the application:

   ```bash
   npm run start
   ```

   This will start the application using Nodemon, which will automatically reload the server when changes are made.

6. The server should now be running locally at `http://localhost:3000`.

## Usage

You can use this backend application to develop a social media platform by integrating it with your frontend application. This backend provides API routes for managing users and thoughts, allowing you to create, read, update, and delete users and thoughts.

## API Routes

### Thought Routes

- **GET /api/thoughts**: Get a list of all thoughts.
- **POST /api/thoughts**: Create a new thought.

- **GET /api/thoughts/:thoughtId**: Get a single thought by its ID.
- **PUT /api/thoughts/:thoughtId**: Update a thought by its ID.
- **DELETE /api/thoughts/:thoughtId**: Delete a thought by its ID.

- **POST /api/thoughts/:thoughtId/reactions**: Add a reaction to a thought.
- **DELETE /api/thoughts/:thoughtId/reactions/:reactionId**: Remove a reaction from a thought.

### User Routes

- **GET /api/users**: Get a list of all users.
- **POST /api/users**: Create a new user.

- **GET /api/users/:userId**: Get a single user by their ID.
- **PUT /api/users/:userId**: Update a user by their ID.
- **DELETE /api/users/:userId**: Delete a user by their ID.

- **POST /api/users/:userId/friends/:friendId**: Add a friend to a user's friend list.
- **DELETE /api/users/:userId/friends/:friendId**: Remove a friend from a user's friend list.

You can use these API routes to build the core functionality of your social media platform.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
