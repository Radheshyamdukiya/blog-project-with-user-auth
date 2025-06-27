# Blog Project with User Authentication

A complete blog management system built using Node.js, Express, MongoDB, and EJS. It features secure user authentication, CRUD operations for posts, and user-specific post filtering.

## Features

- User Registration and Login using JWT and sessions
- Create, Read, Update, and Delete (CRUD) blog posts
- Separate views for "My Posts" and "All Posts"
- EJS-based templating for dynamic UI
- Protected routes with middleware

## Project Structure

blog-project  
├── models/  
├── routes/  
├── views/  
├── public/  
├── app.js  
└── package.json  

## Tech Stack

- Backend: Node.js, Express
- Frontend: HTML, CSS, EJS
- Database: MongoDB with Mongoose
- Authentication: JWT and express-session

## Installation

1. Clone the repository  
   `git clone https://github.com/your-username/blog-project.git`  
2. Navigate to the folder  
   `cd blog-project`  
3. Install dependencies  
   `npm install`  
4. Create a `.env` file in the root directory and add:
5. Start the server  
   `node app.js`  
6. Open in browser:  
   `http://localhost:3000`

## Dependencies

- express  
- mongoose  
- mongodb  
- ejs  
- dotenv  
- method-override  
- express-session  

## Future Improvements

- Add password hashing using bcrypt
- Add flash messages for feedback
- Improve mobile responsiveness
- Integrate search and filter features
