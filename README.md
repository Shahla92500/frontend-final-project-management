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
│   ├── components/
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── ProjectsPage.tsx
│   │   ├── ProjectDetailPage.tsx
│   │   ├── TaskPage.tsx
│   │   └── TaskDetailPage.tsx
│   └── dashboard/
│   │   └── Dashboard.tsx
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── taskUtils.ts
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

## Testing:

# Use Postman to test API routes.
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







# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.





## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
