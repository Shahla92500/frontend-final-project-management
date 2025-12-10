import { useEffect, useState } from "react";
import { apiClient } from "../clients/api";
import { useParams } from "react-router-dom";
// import type { Project, Task } from "../types";
import type { Project } from "../types";
type Task = {
  _id: string;
  projectId: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
};

const DUMMY_TASKS: Task[] = [
  {
    _id: "t1",
    projectId: "p1",
    title: "Set up backend",
    description: "Create Node/Express server",
    status: "in-progress",
  },
  {
    _id: "t2",
    projectId: "p1",
    title: "Design UI",
    description: "Create wireframes",
    status: "todo",
  },
  {
    _id: "t3",
    projectId: "p2",
    title: "Write tests",
    description: "Add unit tests",
    status: "done",
  },
];
function ProjectDetailsPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [tasksError, setTasksError] = useState("");

    // form fields for new task
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] =
    useState<"todo" | "in-progress" | "done">("todo");

  const { projectId } = useParams();

  // 1) Fetch project details
  useEffect(() => {
    if (!projectId) return;
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        setError("");        
        const res = await apiClient.get(`/api/projects/${projectId}`);
        console.log(res.data);
        setProject(res.data);
      } catch (error : any) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

 // 2) Fetch tasks for this project 
  useEffect(() => {
    if (!projectId) return;
    const fetchProjectTasks = async () => {
      try {
        setTasksLoading(true);
        setTasksError("");
  // TODO: when test. finished to integrate with backend, uncomment:
        // const res = await apiClient.get(`/api/projects/${projectId}/tasks`);
        // setTasks(res.data);
        // FRONTEND-ONLY MOCK DATA FOR NOW:
        setTasks([
          {
            _id: "1",
            title: "Demo task 1",
            description: "This is just a mock task",
            status: "todo",
          },
          {
            _id: "2",
            title: "Demo task 2",
            description: "Second demo task",
            status: "in-progress",
          },
        ]);
      } catch (err: any) {
        console.error(err);
        setTasksError(err.message || "Failed to load tasks");
      } finally {
        setTasksLoading(false);
      }
    };
    fetchProjectTasks()
  }, [projectId]);


  if (loading) return <div className="text-3xl text-white">Loading...</div>;

  if (error) return <div className="text-3xl text-white">Error loading Project</div>;

  // 3) ADD TASK (frontend only now)
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    // When tested & to integrate with backend \:
    // const res = await apiClient.post(`/api/projects/${projectId}/tasks`, {
    //   title: taskTitle,
    //   description: taskDescription,
    //   status: taskStatus,
    // });
    // setTasks(prev => [...prev, res.data]);

    const newTask: Task = {
      _id: crypto.randomUUID(), // fake id just for FE testing, after it should be removed
      title: taskTitle,
      description: taskDescription,
      status: taskStatus,
    };
    setTasks((prev) => [...prev, newTask]);

    setTaskTitle("");
    setTaskDescription("");
    setTaskStatus("todo");
  };

  // 4) DELETE TASK
  const handleDeleteTask = async (taskId: string) => {
    // When integrate with backend :
    // await apiClient.delete(`/api/projects/${projectId}/tasks/${taskId}`);

    setTasks((prev) => prev.filter((t) => t._id !== taskId));
  };

  // 5) SIMPLE EDIT TASK (just change title via prompt for now)
  const handleEditTask = async (task: Task) => {
    const newTitle = window.prompt("New title:", task.title.toString());
    if (!newTitle) return;

    const updated: Task = { ...task, title: newTitle };

    // When integrate with backend:
    // await apiClient.put(
    //   `/api/projects/${projectId}/tasks/${task._id}`,
    //   updated
    // );

    setTasks((prev) =>
      prev.map((t) => (t._id === task._id ? updated : t))
    );
  };
  return (
   <div className="text-white">
      {/* PROJECT INFO */}
      <h1 className="text-4xl">Project Details</h1>

      <div className="mt-10">
        <div className="text-3xl">{project?.name}</div>
        <div className="text-xl">{project?.description}</div>
      </div>

      {/* TASKS SECTION */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Tasks</h2>

        {/* NEW TASK FORM */}
        <form
          onSubmit={handleAddTask}
          className="border p-3 rounded flex flex-col gap-2 max-w-md"
        >
          <label>
            Title:
            <input
              className="border rounded w-full text-black px-2"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </label>

          <label>
            Description:
            <textarea
              className="border rounded w-full text-black px-2"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </label>

          <label>
            Status:
            <select
              className="border rounded text-black px-2"
              value={taskStatus}
              onChange={(e) =>
                setTaskStatus(e.target.value as "todo" | "in-progress" | "done")
              }
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </label>

          <button
            type="submit"
            className="self-start bg-sky-500 px-4 py-2 rounded mt-2"
          >
            Add Task
          </button>
        </form>

        {/* TASKS LIST */}
        {tasksLoading && (
          <div className="mt-4 text-xl">Loading tasks...</div>
        )}
        {tasksError && (
          <div className="mt-4 text-red-400">{tasksError}</div>
        )}

        <ul className="mt-6 flex flex-col gap-3">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="border rounded p-3 flex justify-between items-start"
            >
              <div>
                <div className="font-semibold">{task.title}</div>
                <div className="text-sm text-gray-300">
                  {task.description}
                </div>
                <div className="text-xs mt-1">
                  Status:{" "}
                  <span className="font-medium">{task.status}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEditTask(task)}
                  className="px-3 py-1 text-sm bg-yellow-500 rounded"
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

          {tasks.length === 0 && !tasksLoading && (
            <div className="text-sm text-gray-300 mt-3">
              No tasks yet. Add one above.
            </div>
          )}
        </ul>
      </section>
    </div>
  );
}


export default ProjectDetailsPage;