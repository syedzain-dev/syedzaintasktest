import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    setError("");
    try{
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    }catch(err){
      setError(err?.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="card" style={{maxWidth:480, margin:"40px auto"}}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="grid" style={{marginTop:12}}>
        <div><label>Email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required/>
        </div>
        <div><label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required/>
        </div>
        {error && <div className="badge" style={{color:"#fecaca", borderColor:"#7f1d1d"}}>{error}</div>}
        <button type="submit">Login</button>
      </form>
      <p style={{marginTop:12}}>No account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}
