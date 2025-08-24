import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { validateTaskCreate, validateTaskId, listTasksQuery } from "../utils/validators.js";
import { handleValidation } from "../middleware/handleValidation.js";
import { createTask, listTasks, getTask, updateTask, deleteTask } from "../controllers/tasks.js";

const router = Router();
router.use(requireAuth);

router.get("/", listTasksQuery, handleValidation, listTasks);
router.post("/", validateTaskCreate, handleValidation, createTask);
router.get("/:id", validateTaskId, handleValidation, getTask);
router.put("/:id", validateTaskId, handleValidation, updateTask);
router.delete("/:id", validateTaskId, handleValidation, deleteTask);

export default router;
