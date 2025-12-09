
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import TaskPage from "./pages/TaskPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import Navbar from "./componenets/Navbar";


function App() {
  return (
    <>
      <div className="p-5 bg-zinc-900 h-screen">
      <Navbar />
        <Routes>
        {/* User auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Projects */}
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
        {/* Tasks */}
        <Route path="/projects" element={<TaskPage />} />
        <Route path="/projects/:projectId" element={<TaskDetailPage />} />

        </Routes>
      </div>
    </>
  );
}
export default App;