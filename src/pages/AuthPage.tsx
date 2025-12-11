import { useState, useContext } from "react";

import {AuthContext} from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [showRegister, setShowRegister] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);


  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  if (!auth) return null;
  const {logIn, register} = auth; 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      // api logIn is called here
      await logIn(email,password); //=> call login function in AuthProvider
      console.log("Before Navigating to project", email);

      // navigate to project  here
      navigate("/projects");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

   // REGISTER FORM SUBMIT
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      
      setError("");
      setLoading(true);
      await register(username, email, password); // => call register function in AuthProvider
         // Show success message
      setRegistered(true);
        // clear the form:
      setUsername("");
      setEmail("");
      setPassword("");
      console.log("Account created! Click below to go to your projects.");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  // --- SUCCESS MESSAGE ---
  if (registered) {
    return (
    <div className="text-white flex flex-col items-center justify-center mt-20">
      <div className="bg-pink-300 text-black p-6 rounded shadow-lg max-w-md text-center">
        <h1 className="text-2xl font-bold mb-3">Congratulations!</h1>
        <p className="mb-4">
          Your user has been registered correctly.
          <br />
          If you want to add projects to your name, click on the
          <span className="font-semibold"> Projects </span>
          button in the navbar.
        </p>
      </div>
    </div>
    );
  }

  return (
    <div className="text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mt-10 text-center">
        Start managing your projects.
      </h1>

      {/* ERROR  */}
      {error && <div className="mt-4 text-red-400">{error}</div>}

      {/* FORM  */}
      {showRegister ? (
        <form
          onSubmit={handleRegister}
          className="border mt-10 p-2 h-60 w-150 flex flex-col justify-around items-center rounded"
        >
          <div className="text-xl font-bold">Register</div>

          <label htmlFor="username">  Username:
            <input
              type="text" name="username" value={username} // id=""
              onChange={(e) => setUsername(e.target.value)}
              className="ml-2 border rounded text-blue"
            />
          </label>
          <label htmlFor="email"> Email:
            <input type="text" name="email" value={email} // id="" 
              onChange={(e) => setEmail(e.target.value)}
              className="ml-10 border rounded text-blue"
            />
          </label>
          <label htmlFor="password"> Password:
            <input type="password" name="password" value={password} // id=""
              onChange={(e) => setPassword(e.target.value)}
              className="ml-3 border rounded text-blue"
            />
          </label>

          <input
            type="submit"
            value={loading ? "Loading..." : "Register"}
            className="border py-2 px-4 rounded"
          />

          {/* LOADING  */}
          {loading && <div className="animate-pulse">...</div>}
        </form>
      ) : (
        <form
          onSubmit={handleLogin}
          className="border mt-10 p-2 h-60 w-150 flex flex-col justify-around items-center rounded"
        >
          <div className="text-xl font-bold">Login</div>
          <label htmlFor="email">
            Email:
            <input type="text" name="email" value={email} // id=""
              onChange={(e) => setEmail(e.target.value)}
              className="ml-10 border rounded text-blue-300"
            />
          </label>
          <label htmlFor="password">
            Password:
            <input type="password" name="password" value={password} // id=""
              onChange={(e) => setPassword(e.target.value)}
              className="ml-3 border rounded text-blue-500"
            />
          </label>
          <input type="submit" value={loading ? "Loading..." : "Login"}
            className="border py-2 px-4 rounded"
          />
          {/* LOADING  */}
          {loading && <div className="animate-pulse">...</div>}
        </form>
      )}

      {/* TOGGLE FORM  */}
      {showRegister ? (
        <div>
          Already have an account?{" "}
          <span
            className="text-blue-500 hover:cursor-pointer"
            onClick={() => setShowRegister(false)}
          >
            Sign in
          </span>{" "}
        </div>
      ) : (
        <div>
          Don't have an account?{" "}
          <span
            className="text-blue-500 hover:cursor-pointer"
            onClick={() => setShowRegister(true)}
          >
            Sign up
          </span>{" "}
        </div>
      )}
    </div>
  );
}

export default AuthPage;