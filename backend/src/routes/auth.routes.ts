import express from "express";
import { body } from 'express-validator';
import { validationResultHandler } from "../middleware/validationResultHandler.js";
import { tryCatch } from "../helpers/tryCatch.js";
import { logIn, refreshAccess } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post('/', 
  body('email', 'email is required').notEmpty(),
  body('password', 'password is required').notEmpty(),
  validationResultHandler,
  tryCatch(logIn)
)

router.post('/refresh-access',
  body('refreshToken', 'got empty refresh token').notEmpty(),
  validationResultHandler,
  tryCatch(refreshAccess)
)

export default router;