import { Op } from "sequelize";
import { Task, Category } from "../models/index.js";

export async function createTask(req, res){
  try{
    const task = await Task.create({ ...req.body, user_id: req.userId });
    res.status(201).json(task);
  }catch(err){
    res.status(400).json({ message: err.message });
  }
}

export async function listTasks(req, res){
  try{
    const { status, category, q, page = 1, pageSize = 50 } = req.query;
    const where = { user_id: req.userId };
    if (status) where.status = status;
    if (category) where.category_id = category;
    if (q) where.title = { [Op.like]: `%${q}%` };

    const offset = (parseInt(page)-1) * parseInt(pageSize);
    const { rows, count } = await Task.findAndCountAll({
      where, order: [["created_at","DESC"]], offset, limit: parseInt(pageSize),
      include: [{ model: Category, attributes: ["id","name"] }]
    });
    res.json({ items: rows, total: count, page: parseInt(page), pageSize: parseInt(pageSize) });
  }catch(err){
    res.status(500).json({ message: err.message });
  }
}

export async function getTask(req, res){
  try{
    const task = await Task.findOne({ where: { id: req.params.id, user_id: req.userId } });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  }catch(err){
    res.status(400).json({ message: err.message });
  }
}

export async function updateTask(req, res){
  try{
    const task = await Task.findOne({ where: { id: req.params.id, user_id: req.userId } });
    if (!task) return res.status(404).json({ message: "Task not found" });
    await task.update(req.body);
    res.json(task);
  }catch(err){
    res.status(400).json({ message: err.message });
  }
}

export async function deleteTask(req, res){
  try{
    const count = await Task.destroy({ where: { id: req.params.id, user_id: req.userId } });
    if (!count) return res.status(404).json({ message: "Task not found" });
    res.json({ success: true });
  }catch(err){
    res.status(400).json({ message: err.message });
  }
}
