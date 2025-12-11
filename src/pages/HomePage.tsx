import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="text-white flex flex-col items-center justify-center gap-6 h-full">
      <h1 className="text-4xl font-bold">Project Manager App</h1>
      <p className="text-lg text-gray-300">
        Welcome! Use the buttons below to get started.
      </p>

      <div className="flex gap-4 mt-4">
        {/* 1) Login / Register */}
        <Link
          to="/auth"
          className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-md font-semibold"
        >
          Login / Register
        </Link>

        {/* 2) Go to Projects (will redirect to /auth if not logged in) */}
        <Link
          to="/projects"
          className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-md font-semibold"
        >
          My Projects
        </Link>

        {/* 3) Example extra button (you can change it) */}
        <Link
          to="/auth"
          className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-md font-semibold"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default HomePage;