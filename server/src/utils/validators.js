import { body, param, query } from "express-validator";

export const validateSignup = [
  body("name").isString().isLength({ min: 2 }),
  body("email").isEmail(),
  body("password").isLength({ min: 6 })
];

export const validateLogin = [
  body("email").isEmail(),
  body("password").isLength({ min: 6 })
];

export const validateTaskCreate = [
  body("title").isString().isLength({ min: 1 }),
  body("priority").optional().isIn(["low","medium","high"]),
  body("status").optional().isIn(["todo","in-progress","done"]),
  body("due_date").optional().isISO8601().toDate(),
  body("category_id").optional().isInt()
];

export const validateTaskId = [ param("id").isInt() ];

export const validateCategoryCreate = [
  body("name").isString().isLength({ min: 1 })
];

export const validateCategoryId = [ param("id").isInt() ];

export const listTasksQuery = [
  query("status").optional().isIn(["todo","in-progress","done"]),
  query("category").optional().isInt(),
  query("q").optional().isString(),
  query("page").optional().toInt(),
  query("pageSize").optional().toInt()
];
