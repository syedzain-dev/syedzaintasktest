import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { validateCategoryCreate, validateCategoryId } from "../utils/validators.js";
import { handleValidation } from "../middleware/handleValidation.js";
import { listCategories, createCategory, deleteCategory } from "../controllers/categories.js";

const router = Router();
router.use(requireAuth);

router.get("/", listCategories);
router.post("/", validateCategoryCreate, handleValidation, createCategory);
router.delete("/:id", validateCategoryId, handleValidation, deleteCategory);

export default router;
