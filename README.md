
This repository contains a MERN (MongoDB, Express.js, React.js, Node.js) project with separate folders for the frontend and backend. Follow the instructions below to set up and run both the frontend and backend parts of the project.

Prerequisites
Make sure you have the following software installed on your machine:

Node.js: Download and install Node.js
MongoDB: Download and install MongoDB
Frontend Setup
Open a terminal in the frontend folder.

Install dependencies using the following command:

bash
Copy code
npm install
Create a .env file in the frontend folder with the following content:

env
Copy code
REACT_APP_API_URL=http://localhost:5000
Adjust the REACT_APP_API_URL variable if your backend server runs on a different port.

Run the development server with the following command:

bash
Copy code
npm run dev
This will start the React development server. Open your browser and go to http://localhost:3000 to view the application.

Backend Setup
Open a terminal in the backend folder.

Install dependencies using the following command:

bash
Copy code
npm install
Create a .env file in the backend folder with the following content:

env
Copy code
PORT=5000
MONGODB_URI=mongodb://localhost:27017/your-database-name
Adjust the PORT and MONGODB_URI variables as needed.

Run the backend server with the following command:

bash
Copy code
npm start
The backend server will start, and it will be accessible at http://localhost:5000.

Project Structure
frontend: Contains the React.js frontend code.
backend: Contains the Node.js and Express.js backend code.
Feel free to modify and extend the codebase according to your project requirements. Enjoy building with the MERN stack!
