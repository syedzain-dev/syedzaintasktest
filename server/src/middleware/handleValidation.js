import { validationResult } from "express-validator";

export function handleValidation(req, res, next){
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ message: "Validation error", errors: errors.array() });
  }
  next();
}
