
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";

import TaskDetailPage from "./pages/TaskDetailPage";
import HomePage from "./pages/HomePage";
import Navbar from "./componenets/Navbar";
import RequireAuth from "./pages/RequireAuth";

/*
* Set up routing in App
*/
function App() {
  return (
    <>
      <div className="p-5 h-screen text-black bg-green-900 ">
      <Navbar />
        <Routes>
          {/* Home page */}
          <Route path="/" element={<HomePage />}/>     

          {/* User auth */}
          <Route path="/auth" element={<AuthPage />}/>

          {/* project list.  /projects ->Projects */}
          <Route path="/projects" element={
            <RequireAuth>
              <ProjectsPage />
            </RequireAuth>
          } />
          {/* Project details (includes TaskPage inside) /projects/:projectId ->Project Detail */}
          <Route 
              path="/projects/:projectId" 
              element={
                 <RequireAuth>
                   <ProjectDetailPage />
                 </RequireAuth>
              } />
       {/* Task detail (nested under a project) */}
        <Route
          path="/projects/:projectId/tasks/:taskId"
          element={
            <RequireAuth>
              <TaskDetailPage />
            </RequireAuth>
          }
        />

          {/* /projects/:projectId/tasks/:taskId → task detail */}
          {/* <Route path="tasks/:taskId" element={<TaskDetailPage />} />  */}
        </Routes>
      </div>
    </>
  );
}
export default App;