import { Router } from "express";
import { signup, login } from "../controllers/auth.js";
import { validateSignup, validateLogin } from "../utils/validators.js";
import { handleValidation } from "../middleware/handleValidation.js";

const router = Router();

router.post("/signup", validateSignup, handleValidation, signup);
router.post("/login", validateLogin, handleValidation, login);

export default router;
