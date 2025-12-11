import { useEffect, useState, useContext } from "react";
import { apiClient } from "../clients/api";
import { AuthContext } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import type { Project } from "../types";
//============it should be removed after integration BE & FE
// const DUMMY_PROJECTS: Project[] = [
//   { _id: "p1", name: "Project One", description: "First test project" },
//   { _id: "p2", name: "Project Two", description: "Second test project" },
// ];
//================================

function ProjectsPage() {
  const auth = useContext(AuthContext);
   const navigate = useNavigate();
  const token = auth?.token;
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
            console.log("token: ", token);
      // if (!token) {        
      //     navigate("/auth");
      //     return
      // } 
      
      const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");
       console.log("Requesting /api/projects with headers:", apiClient.defaults.headers.common);
        const res = await apiClient.get("/api/projects");
           console.log("Projects response here:", res.data);
      //  // Make sure an array is in state
      const data = Array.isArray(res.data)
        ? res.data : res.data.projects ?? [];   // adjust to match backend shape
        
        setProjects(data);
        console.log("API response:",data);

      } catch (error : any) {
        console.log(error);
        if (error.response?.status === 401) {
          // token invalid/expired → go back to login
          navigate("/auth");
        } else {
          setError(error.message || "Failed to load projects");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

    //  setProjects(DUMMY_PROJECTS); //==it should be removed after integration BE & FE    

  }, [token]);

  if (loading) return <div className="text-3xl text-white">Loading...</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await apiClient.post("/api/projects", { name, description });
      setProjects((prev) => [...prev, res.data]);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
      setName("")
      setDescription("")
    }
  };

  // FRONTEND-ONLY edit (no backend yet)
const handleEditProject = (projectId: string) => {
  const project = projects.find((p) => p._id === projectId);
  if (!project) return;

  const newName = window.prompt("New project name:", project.name);
  const newDescription = window.prompt(
    "New project description:",
    project.description
  );
  // later, for integrate backend:
  // await apiClient.put(`/api/projects/${projectId}`, { name: newName, description: newDescription });

  if (!newName || !newDescription) return;

  setProjects((prev) =>
    prev.map((p) =>
      p._id === projectId
        ? { ...p, name: newName, description: newDescription }
        : p
    )
  );

};
// FRONTEND-ONLY delete
const handleDeleteProject = async (projectId: string) => {
  // only without backend:
  // if (!window.confirm("Delete this project?")) return;

  // only, with backend:
  await apiClient.delete(`/api/projects/${projectId}`);
    setProjects((prev) => prev.filter((p) => p._id !== projectId));
};

  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold text-white">Projects</h1>

      <form
        onSubmit={handleSubmit}
        className=" border p-2 h-50 mt-10 flex flex-col gap-2 rounded"
      >
        <label htmlFor="project-name">Project Name: </label>
        <input
          type="text" name="project-name"  className="border"  value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="project-description">Project Description</label>
        <input
          type="text" name="project-description" className="border" value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="submit"  value="Create Project" className="mt-auto bg-sky-500 rounded"
        />
      </form>

      {error && <div>{error}</div>}

      <div className="w-full flex gap-5 mt-10">
        {projects &&
          projects.map((project) => (
            <div
              key={project._id}
              className="text-white w-50 flex flex-col h-50 border border-red-500 p-2 text-center rounded"
            >
              <div className="font-bold">{project.name}</div>
              <div>{project.description}</div>
              <div className="flex flex-col gap-2 mt-2">
                <Link
                  to={`/projects/${project._id}`}
                  className="mt-auto bg-sky-500 rounded px-2 py-1"
                >
                  See Project
                </Link>

                <button
                  type="button"
                  onClick={() => handleEditProject(project._id)}
                  className="bg-yellow-500 rounded px-2 py-1"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteProject(project._id)}
                  className="bg-red-600 rounded px-2 py-1"
                >
                  Delete
                </button>
              </div>              
            </div>
          ))}
      </div>
    </div>
  );
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default ProjectsPage;