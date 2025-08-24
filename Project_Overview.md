# Task Management Web Application Overview

## Project Summary
This project is a full-stack web application designed to help users manage their tasks and categories efficiently. It features user authentication, task and category CRUD operations, and a modern, responsive user interface.

## Features
- **User Authentication:** Secure signup and login for users.
- **Dashboard:** View, create, edit, and delete tasks. Filter and search tasks by status, category, and title.
- **Category Management:** Create and delete categories to organize tasks.
- **Task Details:** Add title, description, due date, priority, and category to each task.
- **Responsive UI:** Built with React for a fast and interactive experience.

## Technology Stack
- **Frontend:** React, Vite, Axios, React Router
- **Backend:** Node.js, Express, Sequelize ORM, MySQL
- **Authentication:** JWT tokens stored in localStorage

## How It Works
1. Users sign up or log in to access their dashboard.
2. All task and category actions are sent to the backend via API calls.
3. The backend validates requests, interacts with the database, and returns results to the frontend.
4. Only authenticated users can manage their own tasks and categories.

## How to Run
1. Start the backend server: `npm start` in the `server` folder.
2. Start the frontend: `npm run dev` in the `client` folder.
3. Open the app in your browser at `http://localhost:5173`.

## Business Value
This application streamlines task management for individuals and teams, improving productivity and organization with a secure, user-friendly platform.

---
For more details or a demo, please contact the development team.
