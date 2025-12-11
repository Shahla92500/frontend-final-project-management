import { useEffect, useState } from "react";
import { apiClient } from "../clients/api";
import { useParams } from "react-router-dom";
import TaskPage from './TaskPage'
// import type { Project, Task } from "../types";
import type { Project } from "../types";
// type Task = {
//   _id: string;
//   project: string;
//   title: string;
//   description: string;
//   status: "todo" | "in-progress" | "done";
// };

// const DUMMY_PROJECTS: Project[] = [
//   { _id: "p1", name: "Project One", description: "First test project" },
//    { _id: "p2", name: "Project Two", description: "Second test project" },
// ];

function ProjectDetailsPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 1) Fetch project details
  useEffect(() => {
    if (!projectId) return;

    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        setError("");        
          // TO uncomment : when I re-enable backend:
    //     const res = await apiClient.get(`/api/projects/${projectId}`);
    //     setProject(res.data);
//
     // FRONTEND ONLY – without BE:
        setProject({
          _id: projectId,
          name: "Project One",
          description: "First test project",
        });
//
 
      } catch (error : any) {
          console.log(error);
          setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectDetails();
//=====should be removed after integration
    // const found = DUMMY_PROJECTS.find((p) => p._id === projectId) || null;
    // setProject(found);
//=============
  }, [projectId]);


  if (loading) return <div className="text-3xl text-white">Loading...</div>;

  if (error) return <div className="text-3xl text-white">Error loading Project</div>;

  return (
   <div className="text-white">
      {/* PROJECT INFO */}
      <h1 className="text-4xl">Project Details</h1>

      <div className="mt-10">
        <div className="text-3xl">{project?.name}</div>
        <div className="text-xl">{project?.description}</div>
      </div>
       {/* TASKS FOR THIS PROJECT */}
      {projectId && <TaskPage />}
    </div>
  );
}

export default ProjectDetailsPage;