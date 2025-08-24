import { Category } from "../models/index.js";

export async function listCategories(req, res){
  try{
    const cats = await Category.findAll({ where: { user_id: req.userId }, order: [["name","ASC"]] });
    res.json(cats);
  }catch(err){
    res.status(500).json({ message: err.message });
  }
}

export async function createCategory(req, res){
  try{
    const cat = await Category.create({ name: req.body.name, user_id: req.userId });
    res.status(201).json(cat);
  }catch(err){
    res.status(400).json({ message: err.message });
  }
}

export async function deleteCategory(req, res){
  try{
    const count = await Category.destroy({ where: { id: req.params.id, user_id: req.userId } });
    if (!count) return res.status(404).json({ message: "Category not found" });
    res.json({ success: true });
  }catch(err){
    res.status(400).json({ message: err.message });
  }
}
