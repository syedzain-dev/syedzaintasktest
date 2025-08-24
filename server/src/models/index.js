import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const User = sequelize.define("users", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: true, createdAt: "created_at", updatedAt: false });

export const Category = sequelize.define("categories", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: true, createdAt: "created_at", updatedAt: false });

export const Task = sequelize.define("tasks", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  priority: { type: DataTypes.ENUM("low","medium","high"), allowNull: false, defaultValue: "medium" },
  status: { type: DataTypes.ENUM("todo","in-progress","done"), allowNull: false, defaultValue: "todo" },
  due_date: { type: DataTypes.DATE, allowNull: true }
}, { timestamps: true, createdAt: "created_at", updatedAt: "updated_at" });

// Associations
User.hasMany(Category, { foreignKey: "user_id", onDelete: "CASCADE" });
Category.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Task, { foreignKey: "user_id", onDelete: "CASCADE" });
Task.belongsTo(User, { foreignKey: "user_id" });

Category.hasMany(Task, { foreignKey: "category_id", onDelete: "SET NULL" });
Task.belongsTo(Category, { foreignKey: "category_id" });
