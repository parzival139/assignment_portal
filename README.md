# Assignment Portal

## Overview
The **Assignment Portal** is a web application that facilitates the submission and management of assignments. This application allows users to register, log in, upload assignments, and view admin details. Admins can log in, view all submitted assignments, and change the status of those assignments. 

## Features
- **User Registration and Login**: Users can register with a username and password, and log in to access their account.
- **Assignment Upload**: Users can upload assignments with associated details.
- **Admin Functionality**: Admins can view all assignments and update their status (accepted/rejected).
- **View Admins**: Users can view a list of all admins.

## Tech Stack
- **Frontend**: React.js (for building the user interface)
- **Backend**: Node.js with Express (for handling API requests)
- **Database**: MongoDB (for data storage)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/parzival139/assignment_portal.git
   cd assignment_portal
   
2. **Install dependencies**:
   cd server
   npm install

3. **Setup Environment Variables**:
   Create a .env file in the server directory and add the following environment variables:
  - PORT=5000                        # Port number
  - MONGODB_URI=<your_mongo_db_uri>  # MongoDB connection string

4. **Run the Application: Start the server**:
   npm start
   Your server will be running on http://localhost:5000.

**API Endpoints**:

  *User Endpoints*:
   - POST /api/users/register: Register a new user.
   - POST /api/users/login: Log in an existing user.
   - POST /api/users/assignments/upload: Upload an assignment.

  *Admin Endpoints*:
   - POST /api/admin/register: Register a new admin.
   - POST /api/admin/login: Log in as an admin.
   - GET /api/admin/assignments: View all assignments.
    
**Testing**:
You can test the API endpoints using tools like Postman. I have attached the testing screenshots in the project as folder named "project_screenshots".


