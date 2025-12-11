import { useEffect, useState } from "react";
//import { apiClient } from "../clients/api";
import { useParams } from "react-router-dom";
import TaskPage from './TaskPage'
// import type { Project, Task } from "../types";
import type { Project } from "../types";
import BackButton from "../componenets/BackButton"

function ProjectDetailsPage() {
  const { projectId } = useParams();
  // const [project, setProject] = useState<Project | null>(null);
  const project = useState<Project | null>(null)[0];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 1) Fetch project details
  useEffect(() => {
    if (!projectId) return;

    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        setError("");        
    //     const res = await apiClient.get(`/api/projects/${projectId}`);
    //     setProject(res.data);

      } catch (error : any) {
          console.log(error);
          setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectDetails();

  }, [projectId]);


  if (loading) return <div className="text-3xl text-white">Loading...</div>;

  if (error) return <div className="text-3xl text-white">Error loading Project</div>;

  return (
   <div className="text-white">
        <BackButton />
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