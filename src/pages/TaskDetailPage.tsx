//task detail    /projects/:projectId/tasks/:taskId.

import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

type TaskStatus = "todo" | "in-progress" | "done";

type Task = {
  _id: string;
  project: string;
  title: string;
  description: string;
  status: TaskStatus;
};

// same dummy list for now
const DUMMY_TASKS: Task[] = [
  { _id: "t1", project: "p1", title: "Demo task 1", description: "Just a mock", status: "todo" },
  { _id: "t2", project: "p1", title: "Demo task 2", description: "Second mock", status: "in-progress" },
  { _id: "t3", project: "p2", title: "Other project task", description: "Another one", status: "done" },
];

function TaskDetailPage() {
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (!projectId || !taskId) return;

    // FRONTEND ONLY – find in dummy data
    const found = DUMMY_TASKS.find(
      (t) => t._id === taskId && t.project === projectId
    );
    setTask(found || null);

    // When integrated:
    // const res = await apiClient.get(
    //   `/api/projects/${projectId}/tasks/${taskId}`
    // );
    // setTask(res.data);
  }, [projectId, taskId]);

  if (!task) {
    return (
      <div className="text-white">
        Task not found.{" "}
        <Link className="text-blue-400 underline" to={`/projects/${projectId}`}>
          Back to tasks
        </Link>
      </div>
    );
  }

  const handleDelete = async () => {
    // await apiClient.delete(`/api/projects/${projectId}/tasks/${task._id}`);
    console.log("Delete task", task._id);
    navigate(`/projects/${projectId}`);
  };

  const handleEdit = async () => {
    const newTitle = window.prompt("New title:", task.title.toString());
    if (!newTitle) return;

    // await apiClient.put(`/api/projects/${projectId}/tasks/${task._id}`, {
    //   ...task,
    //   title: newTitle,
    // });

    setTask({ ...task, title: newTitle });
  };

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Task Detail</h2>
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