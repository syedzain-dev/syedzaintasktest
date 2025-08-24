import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export async function signup(req, res){
  const { name, email, password } = req.body;
  try{
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ message: "Email already in use" });
    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password_hash });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
  }catch(err){
    res.status(500).json({ message: err.message });
  }
}

export async function login(req, res){
  const { email, password } = req.body;
  try{
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  }catch(err){
    res.status(500).json({ message: err.message });
  }
}
