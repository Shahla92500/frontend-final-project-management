import { useEffect, useState, useContext } from "react";
import { apiClient } from "../clients/api";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import type { Project } from "../types";
//============it should be removed after integration BE & FE
const DUMMY_PROJECTS: Project[] = [
  { _id: "p1", name: "Project One", description: "First test project" },
  { _id: "p2", name: "Project Two", description: "Second test project" },
];
//================================

function ProjectsPage() {
  const auth = useContext(AuthContext);
  const token = auth?.token;
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
      //  if (!token) return
      // const fetchProjects = async () => {
      // try {
      //   setLoading(true);
      //   const res = await apiClient.get("/api/projects");
      //   console.log("Headers sent:", apiClient.defaults.headers.common);
      //   console.log("Response status:", res.status);
      //   console.log("API /api/projects response:",res.data);

      //  // Make sure I always store an array in state
      // const data = Array.isArray(res.data)
      //   ? res.data
      //   : res.data.projects ?? [];   // adjust to match backend shape
        
      //   setProjects(data);
      //   console.log("API response:",data);

    //   } catch (error : any) {
    //     console.log(error);
    //     setError(error.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchProjects();

     setProjects(DUMMY_PROJECTS); //==it should be removed after integration BE & FE    

  }, []);

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
    //add tasks for this project
// useEffect(() => {
//     const fetchProjectTasks = async () => {
//         try {
//             const tasks = await apiClient.get(`/api/projects/${projectId}/tasks`);
//             // state
//             // loading error
//         } catch (error) {
//             console.error(error);
            
//         }
//     }
//     // fetchProjectTasks()
//   }, [projectId])
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
              <Link to={`/projects/${project._id}`}
                className="mt-auto bg-sky-500 rounded" >
                See Project
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default ProjectsPage;