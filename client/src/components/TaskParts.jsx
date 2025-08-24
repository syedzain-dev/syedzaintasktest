import React from "react";

export function TaskItem({ task, onUpdate, onDelete }){
  function cycleStatus(){
    const next = task.status === "todo" ? "in-progress" : task.status === "in-progress" ? "done" : "todo";
    onUpdate(task.id, { status: next });
  }
  return (
    <div className="item">
      <div>
        <div style={{display:"flex", gap:8, alignItems:"center"}}>
          <strong>{task.title}</strong>
          {task.category ? <span className="badge">{task.category.name}</span> : null}
          <span className="badge">{task.priority}</span>
          <button onClick={cycleStatus}>{task.status}</button>
        </div>
        {task.description ? <p style={{margin:"6px 0 0", color:"#cbd5e1"}}>{task.description}</p> : null}
        {task.due_date ? <p className="badge" style={{marginTop:6}}>Due: {new Date(task.due_date).toLocaleDateString()}</p> : null}
      </div>
      <div style={{display:"flex", gap:8}}>
        <button onClick={() => onDelete(task.id)} style={{background:"#ef4444", color:"#081012"}}>Delete</button>
      </div>
    </div>
  );
}

export function TaskForm({ onSubmit }){
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category_id, setCategory] = React.useState("");
  const [due_date, setDueDate] = React.useState("");
  const [priority, setPriority] = React.useState("medium");

  function reset(){ setTitle(""); setDescription(""); setCategory(""); setDueDate(""); setPriority("medium"); }

  async function handleSubmit(e){
    e.preventDefault();
    const payload = {
      title,
      description,
      category_id: category_id ? parseInt(category_id) : null,
      due_date: due_date || null,
      priority
    };
    await onSubmit(payload);
    reset();
  }

  const cats = window.__CATS__ || [];
  return (
    <form onSubmit={handleSubmit} className="grid" style={{gap:12}}>
      <div><label>Title</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g., Plan sprint" required/>
      </div>
      <div><label>Description</label>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} rows={3} placeholder="Optional notes..."/>
      </div>
      <div className="form-row">
        <div><label>Category</label>
          <select value={category_id} onChange={e=>setCategory(e.target.value)}>
            <option value="">None</option>
            {cats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div><label>Due date</label>
          <input type="date" value={due_date} onChange={e=>setDueDate(e.target.value)} />
        </div>
      </div>
      <div><label>Priority</label>
        <select value={priority} onChange={e=>setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button type="submit">Save task</button>
    </form>
  );
}
