import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
// import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App(){
  const navigate = useNavigate();
  function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");
  return (
    <div className="container">
      <header className="header">
        <h1>Task Management</h1>
        <nav style={{display:"flex", gap:12, alignItems:"center"}}>
          {user ? <span className="badge">Hi, {user.name}</span> : null}
          {token ? <button onClick={logout}>Logout</button> : <Link to="/login">Login</Link>}
        </nav>
      </header>
     

      <Routes>
        {/* Default route for / */}
        <Route path="/" element={token ? <Dashboard /> : <Login />} />
        <Route path="/Dashboard" element={<Dashboard debug={true}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
