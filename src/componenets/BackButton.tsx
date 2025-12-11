import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="mb-4 px-4 py-2 rounded bg-sky-500 text-white hover:bg-sky-600"
    >
      ← Back
    </button>
  );
}

export default BackButton;