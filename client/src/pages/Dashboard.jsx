import React, { Suspense } from "react";
import api from "../utils/api";
import { TaskItem, TaskForm } from "../components/TaskParts.jsx";

export default function Dashboard(){

  const [tasks, setTasks] = React.useState([]);
  const [cats, setCats] = React.useState([]);
  const [filters, setFilters] = React.useState({ status:"", category:"", q:"", page:1, pageSize:50 });
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  async function fetchCats(){
    try{ const { data } = await api.get("/categories"); setCats(data); window.__CATS__ = data; }catch{}
  }

  async function fetchTasks(){
    setLoading(true); setError("");
    try{
      // Remove empty query params
      const params = { ...filters };
      if (!params.status) delete params.status;
      if (!params.category) delete params.category;
      if (!params.q) delete params.q;
      const { data } = await api.get("/tasks", { params });
      setTasks(data.items);
    }catch(err){
      setError(err?.response?.data?.message || "Failed to load tasks");
    }finally{ setLoading(false); }
  }

  React.useEffect(() => { fetchCats(); }, []);
  React.useEffect(() => { fetchTasks(); }, [filters.status, filters.category, filters.q, filters.page]);

  async function addTask(payload){
    console.log("Task payload:", payload); // Debug log
    try {
      await api.post("/tasks", payload);
      fetchTasks();
      setError("");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save task");
      console.error("Save task error:", err?.response?.data); // Debug log
    }
  }
  async function updateTask(id, patch){ await api.put("/tasks/"+id, patch); fetchTasks(); }
  async function deleteTask(id){ await api.delete("/tasks/"+id); fetchTasks(); }

  const counts = React.useMemo(() => ({
    total: tasks.length,
    todo: tasks.filter(t=>t.status==="todo").length,
    inprogress: tasks.filter(t=>t.status==="in-progress").length,
    done: tasks.filter(t=>t.status==="done").length,
  }), [tasks]);

  return (
    <div className="grid grid-2">
      <div className="card">
        <div className="header">
          <h2>Your Tasks</h2>
          <span className="badge">{counts.total} total • {counts.done} done</span>
        </div>

        <div className="form-row" style={{marginBottom:12}}>
          <div><label>Search</label>
            <input placeholder="Search by title..." value={filters.q} onChange={e=>setFilters(f=>({...f, q:e.target.value, page:1}))}/>
          </div>
          <div><label>Status</label>
            <select value={filters.status} onChange={e=>setFilters(f=>({...f, status:e.target.value, page:1}))}>
              <option value="">All</option>
              <option value="todo">To do</option>
              <option value="in-progress">In progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div><label>Category</label>
            <select value={filters.category} onChange={e=>setFilters(f=>({...f, category:e.target.value, page:1}))}>
              <option value="">All</option>
              {cats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>

        {loading ? <p>Loading...</p> : error ? <p className="badge" style={{color:"#fecaca", borderColor:"#7f1d1d"}}>{error}</p> : (
          <div className="list">
            {tasks.map(task => (
              <TaskItem key={task.id} task={task} onUpdate={updateTask} onDelete={deleteTask} />
            ))}
            {tasks.length === 0 && <p className="badge">No tasks yet</p>}
          </div>
        )}
      </div>

      <div className="card">
        <h2>Create / Edit</h2>
        <TaskFormWrapper onSubmit={addTask} cats={cats} />
        <CategoryManager cats={cats} refresh={fetchCats} />
      </div>
    </div>
  );
}

function TaskFormWrapper({ onSubmit, cats }) {
  // Set the window global variable
  window.__CATS__ = cats;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TaskForm onSubmit={onSubmit} />
    </Suspense>
  );
}

function CategoryManager({ cats, refresh }){
  const [name, setName] = React.useState("");
  async function addCat(e){
    e.preventDefault();
    if (!name.trim()) return;
    await api.post("/categories", { name });
    setName(""); refresh();
  }
  async function delCat(id){
    await api.delete("/categories/" + id);
    refresh();
  }
  return (
    <div style={{marginTop:16}}>
      <h3>Categories</h3>
      <form onSubmit={addCat} style={{display:"flex", gap:8, margin:"8px 0"}}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="New category" />
        <button type="submit">Add</button>
      </form>
      <div className="list">
        {cats.map(c => (
          <div key={c.id} className="item">
            <span>{c.name}</span>
            <button onClick={()=>delCat(c.id)} style={{background:"#ef4444", color:"#081012"}}>Delete</button>
          </div>
        ))}
        {cats.length === 0 && <p className="badge">No categories yet</p>}
      </div>
    </div>
  );
}
