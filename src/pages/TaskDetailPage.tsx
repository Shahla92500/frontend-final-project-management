//task detail    /projects/:projectId/tasks/:taskId.

import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { apiClient } from "../clients/api";
import BackButton from "../componenets/BackButton";

type TaskStatus = "todo" | "in-progress" | "done";

type Task = {
  _id: string;
  project: string;
  title: string;
  description: string;
  status: TaskStatus;
};

function TaskDetailPage() {
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState("");

  //  1) Fetch single task
  useEffect(() => {
    if (!projectId || !taskId) return;

    const fetchTask = async () => {
      try {
        setError("");
        const res = await apiClient.get<Task>(
          `/api/projects/${projectId}/tasks/${taskId}`
        );
        setTask(res.data);
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || err.message);
      }
    };

    fetchTask();
  }, [projectId, taskId]);

  if (!task) {
    return (
      <div className="text-white">
        {error ? (
          <div className="mb-4 text-red-400">{error}</div>
        ) : (
          "Task not found."
        )}{" "}
        <Link className="text-blue-400 underline" to={`/projects/${projectId}`}>
          Back to tasks
        </Link>
      </div>
    );
  }

  //  2) Delete (then go back to project)
  const handleDelete = async () => {
    if (!projectId) return;

    try {
      await apiClient.delete(`/api/projects/${projectId}/tasks/${task._id}`);
      navigate(`/projects/${projectId}`);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || err.message);
    }
  };

  //  3) Simple edit of title
  const handleEdit = async () => {
    if (!projectId) return;

    const newTitle = window.prompt("New title:", task.title.toString());
    if (!newTitle) return;

    const updated: Task = { ...task, title: newTitle };

    try {
      await apiClient.put(
        `/api/projects/${projectId}/tasks/${task._id}`,
        updated
      );
      setTask(updated);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <section className="mt-8 text-white">
            <BackButton />
      <h2 className="text-2xl font-semibold mb-4">Task Detail</h2>
      {error && <div className="mb-4 text-red-400">{error}</div>}

      <div className="border rounded p-4 max-w-2xl">
        <div className="text-xl font-bold mb-2">{task.title}</div>
        <div className="mb-2">{task.description}</div>
        <div className="mb-4 text-sm">
          Status: <span className="font-semibold">{task.status}</span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-yellow-500 rounded"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 rounded"
          >
            Delete
          </button>
          <button
            onClick={() => navigate(`/projects/${projectId}`)}
            className="px-4 py-2 bg-gray-600 rounded"
          >
            Back to Tasks
          </button>
        </div>
      </div>
    </section>
  );
}

export default TaskDetailPage;