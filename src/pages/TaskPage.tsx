
      /* /projects/:projectId  -> task list */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiClient } from "../clients/api";
type TaskStatus = "todo" | "in-progress" | "done";
//import {type Task} from "../types/index";

export type Task = {
  _id: string;
  project: string;       // projectId
  title: string;
  description: string;
  status: TaskStatus;
};


function TaskPage() {
 const { projectId } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState<TaskStatus>("todo");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  // Fetch tasks from BE: GET /api/projects/:projectId/tasks
  useEffect(() => {
     if (!projectId) return;

    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await apiClient.get<Task[]>(
          `/api/projects/${projectId}/tasks`
        );
        setTasks(res.data);
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId]);

  //  2) Add task (POST): POST /api/projects/:projectId/tasks
  // const handleAddTask = async (e: React.FormEvent) => {
  const handleSubmitTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !taskTitle.trim()) return;

    try {
      // EDIT EXISTING TASK
    if (editingTaskId) {
      const res = await apiClient.put(
        `/api/projects/${projectId}/tasks/${editingTaskId}`,
        {
          title: taskTitle,
          description: taskDescription,
          status: taskStatus,
        }
      );

      setTasks((prev) =>
        prev.map((t) => (t._id === editingTaskId ? res.data : t))
      );
      setEditingTaskId(null);
    } else {
       // CREATE NEW TASK

       const res = await apiClient.post<Task>(`/api/projects/${projectId}/tasks`,
        {
          title: taskTitle,
          description: taskDescription,
          status: taskStatus,
         }
      );

      setTasks((prev) => [...prev, res.data]);
    }
      setTaskTitle("");
      setTaskDescription("");
      setTaskStatus("todo");
      setShowForm(false);
      setLoading(true);
      setError("");

    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

 // 3) Delete task: DELETE /api/projects/:projectId/tasks/:tasksId
  const handleDeleteTask = async (taskId: string) => {
    if (!projectId) return;

    try {
      setError("");
      await apiClient.delete(`/api/projects/${projectId}/tasks/${taskId}`);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || err.message);
    }
  };
//  4) Edit task title :PUT /api/projects/:projectId/tasks/:tasksId
  const handleEditTask = async (taskId: string) => {
    if (!projectId) return;

    const task = tasks.find((t) => t._id === taskId);
    if (!task) return;

    // const newTitle = window.prompt("New title:", task.title);
    // if (!newTitle) return;

    // const updated: Task = { ...task, title: newTitle };

    // try {
    //   setError("");
    //   await apiClient.put(
    //     `/api/projects/${projectId}/tasks/${taskId}`,
    //     updated
    //   );

    //   setTasks((prev) =>
    //     prev.map((t) => (t._id === taskId ? updated : t))
    //   );
    // } catch (err: any) {
    //   console.error(err);
    //   setError(err.response?.data?.message || err.message);
    // }

    setEditingTaskId(task._id);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setTaskStatus(task.status);
    setShowForm(true);
  };
  return (
      <section className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Tasks</h2>

      {error && <div className="text-red-400 mb-4">{error}</div>}
      {loading && <div className="mb-4">Loading...</div>}

      {/* ADD TASK BUTTON */}
      {!showForm && (
        <button
          className="mb-4 bg-sky-500 px-4 py-2 rounded"
          onClick={() => setShowForm(true)}
        >
          Add New Task
        </button>
      )}

      {/* NEW TASK FORM */}
      {showForm && (
        <form
          onSubmit={handleSubmitTask}
          className="border p-3 rounded flex flex-col gap-2 max-w-md mb-6"
        >
          <label>
            Title:
            <input
              className="border rounded w-full text-blue-300 px-2"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </label>

          <label>
            Description:
            <textarea
              className="border rounded w-full text-blue-300 px-2"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </label>

          <label>
            Status:
            <select
              className="border rounded text-blue-300 px-2"
              value={taskStatus}
              onChange={(e) =>
                setTaskStatus(e.target.value as TaskStatus)
              }
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </label>

          <div className="flex gap-2 mt-2">
            <button type="submit" className="bg-sky-500 px-4 py-2 rounded">
              Save Task
            </button>
            <button
              type="submit"
              className="bg-gray-600 px-4 py-2 rounded">
              {/*  onClick={() => setShowForm(false)} */}
              {editingTaskId ? "Update Task" : "Save Task"}
            
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* TASK LIST */}
      <ul className="flex flex-col gap-3">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="border rounded p-3 flex justify-between items-start"
          >
            <div>
              <div className="font-semibold">{task.title}</div>
              <div className="text-sm text-gray-300">{task.description}</div>
              <div className="text-xs mt-1">
                Status: <span className="font-medium">{task.status}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleEditTask(task._id)}
                className="px-3 py-1 text-sm bg-blue-500 rounded"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDeleteTask(task._id)}
                className="px-3 py-1 text-sm bg-red-600 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}

        {tasks.length === 0 && !loading && (
          <div className="text-sm text-gray-300">
            No tasks yet. Click “Add New Task”.
          </div>
        )}
      </ul>
    </section>
  );
}
export default TaskPage;