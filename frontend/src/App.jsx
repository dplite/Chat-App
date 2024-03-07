import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

function App() {
  const { authUser } = useAuthContext();
  console.log(authUser, "au");
  return (
    <div className="h-screen p-4 flex items-center justify-center">
      {/* <Home /> */}

      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />} // if user is authenticated then navigate to home and log him in.
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
