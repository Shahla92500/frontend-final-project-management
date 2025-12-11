TaskMaster API – Frontend
📌 Project Overview

The frontend of Project Management is built with React to provide a responsive and user-friendly interface for managing projects and tasks.


Features

✅ User Management
  Register a new account and log in securely
  Maintain authenticated sessions
  Log out safelyUser authentication (login/logout)

✅ Project Management
  Create projects with a name and description
  View a dashboard of owned projects
  View details of a single project
  Update or delete only owned projects

✅ Task Management
  Create tasks within owned projects with title, description, and status
  View all tasks for a specific project
  Update task details and status within owned projects
  Delete tasks from owned projects

✅ Responsive design for desktop, tablette and mobile

Tech Stack:

- React
- TypeScript/JavaScript
- HTML5 / CSS3
- REST API integration


# Project Structure :
project-dashboard/
├── src/
│   └── clients
│   │   └── api.ts
│   ├── components/
│   │   ├── Navbar.tsx
│   ├── context/
│   │   ├── AuthProvider.tsx
│   ├── pages/
│   │   ├── AuthPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── ProjectsPage.tsx
│   │   ├── ProjectDetailPage.tsx
│   │   ├── RequireAuth.tsx
│   │   ├── TaskPage.tsx
│   │   └── TaskDetailPage.tsx
│   ├── types/
│   │   └── index.ts
│   ├── index.html
│   │── index.css
│   ├── App.tsx               # is general router
├── main.tsx
└── package.json
├── .gitignore
├── vite.config.ts
├── tsconfig.json
|── tsconfig.node.json
├── index.html
├── README.md
└── package.json

## Environment Variables


## Data Models
# User:
    username (unique)
    email (unique)
    password (hashed with bcrypt)

# Project:
    name
    description
    user → reference to owning User

# Task:
    title
    description
    status (todo | in-progress | done)
    project → reference to parent Project

## Authentication:
    
✅ All actions on project and tasks should enforce ownership checks.
✅ Tasks can ONLY be managed by the user who owns the parent project.
✅ Projects and Tasks routes are Protected & Nested

## Testing: # Use Postman to test API routes: 

- Recommended testing flow, CRUD endpoints
* Register user                                     (/api/users/register)
* Login to obtain JWT: in body=> (email + password) (/api/users/login)
    * Created JWT with user info will be in payload.
    * in displaying info we see { token, user }.
    * copy the token :
        -in Authorization section, paste the token in the given area for "Bearer Token"
* * => Only logged-in users can:
* Create project                                     (/api/projects)
* Create tasks within project                        (/api/projects/:projectId/tasks)
* List all project of a user                         (/api/projects)
* List all tasks of a project                        (/api/projects/:projectId/tasks)
* Update a project                                   (/api/projects/:id)
* update a task                                      (/api/projects/:projectId/tasks/:tasksId)
* Test ownership rules with different project
* Delete a project                                   (/api/projects/:id)
* Delete a task                                      (/api/projects/:projectId/tasks/:tasksId)
* Test ownership rules with different users

This project demonstrates a production-ready backend API with secure access control, hierarchical data modeling, and clean Express architecture. It serves as a strong foundation for scaling into a full-stack productivity platform.
## Dependencies
- Express
- MongoDB/Mongoose
- Dotenv
- Morgan
- Cors
- bcrypt
- jsonwebtoken
- passport

## Dev Dependencies

- Nodemon
## Running the Project:

# Initialize project by running these commandes:
    * npm install
    * npm i express mongoose bcrypt jsonwebtoken dotenv morgan cors
# run the server: 
    * npm run dev



## how to deploy frontend on Netlify
Frontend deployment:
Step 1: https://www.netlify.com/ 
Step 2: Sign up with GitHub or email
Step 3: Add new project:
Step 4: Click "GitHub" to pull from GitHub repos
Step 5: Click "All repos"
Step 6: Search for your frontend project to deploy and click it
Step 7: Confirm that it deploys with "npm run build"
Step 8: copy link rendering backend and put in env varibale: like : VITE_BACKEND_UR=https://backend-final-project-management.onrender.com
Step 9:Click "deploy"
Step 10: Click on project link to go to the project



