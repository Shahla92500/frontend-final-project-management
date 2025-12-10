
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import HomePage from "./pages/HomePage";
import Navbar from "./componenets/Navbar";

/*
* Set up routing in App
*/
function App() {
  return (
    <>
      <div className="p-5 bg-zinc-900 h-screen">
      <Navbar />
        <Routes>
          {/* Home page */}
          <Route path="/" element={<HomePage />}/>     

          {/* User auth */}
          <Route path="/auth" element={<AuthPage />}/>

          {/* Projects */}
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
        </Routes>
      </div>
    </>
  );
}
export default App;