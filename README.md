
# Petty Cash Management Backend

This is the backend code for the Petty Cash Management application. It provides APIs for user authentication, managing income, expenses, and other related functionalities.

## Table of Contents
- [Petty Cash Management Backend](#petty-cash-management-backend)
  - [Table of Contents](#table-of-contents)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)

## Technologies Used
- **Node.js**: Backend runtime environment
- **Express.js**: Web application framework for Node.js
- **MongoDB**: NoSQL database for storing user data, income, and expenses
- **Mongoose**: MongoDB object modeling tool for Node.js
- **JWT (JSON Web Tokens)**: For user authentication and authorization
- **bcrypt**: For hashing user passwords
- **dotenv**: For loading environment variables from a `.env` file
- **nodemailer**: For sending account activation and forgot password emails
- **crypto**: For generating random bytes for password reset tokens

## Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/petty-cash-management-backend.git
2. Navigate to the project directory:
   ```bash
   Copy code
   cd petty-cash-management-backend

3. Install dependencies:
   ```bash
   Copy code
   npm install
4. Set up environment variables:
   *Create a .env file in the root directory
   *Define the following environment variables in the .env file:

makefile
Copy code
PORT=3000
MONGODBCONNECTIONSTRING=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret-key>
EMAIL=<your-email-for-sending-emails>
PASSWORD=<your-email-password>
EMAIL_PORT=<your-email-port>

*Usage*
To start the server, run:

   ```bash
Copy code
npm start

The server will start running on the port specified in the .env file (default is 3000).

<b>API Endpoints</b>

POST /api/users/signup: Register a new user
POST /api/users/login: Log in an existing user
GET /api/users/getuser: Get user details (requires authentication)
POST /api/users/forgotpassword: Send a forgot password email
POST /api/users/newincome: Create a new income (requires authentication)
PUT /api/users/updateincome/:id: Update income by ID (requires authentication)
GET /api/users/allincomedata: Get all income data (requires authentication)
DELETE /api/users/deleteincome/:id: Delete income by ID (requires authentication)
POST /api/users/createexpense: Create a new expense (requires authentication)
GET /api/users/allexpenses: Get all expenses (requires authentication)
DELETE /api/users/deleteexpense/:id: Delete expense by ID (requires authentication)
PUT /api/users/updateexpense/:id: Update expense by ID (requires authentication)

*Contributing*
Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or create a pull request.

*License*
This project is licensed under the MIT License.







