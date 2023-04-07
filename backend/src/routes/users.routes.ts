import express from "express";
import { body } from 'express-validator';
import { validationResultHandler } from "../middleware/validationResultHandler.js";
import { notFoundHandler } from "../middleware/notFoundHandler.js";
import { bearerPassport } from "../middleware/passport.js";
import { tryCatch } from "../helpers/tryCatch.js";
import { 
  getUsersController, 
  createUserController, 
  updateUserController, 
  deleteUserController 
} from "../controllers/users.controllers.js";


const router = express.Router()

router.get('/',
  bearerPassport,
  tryCatch(getUsersController)
)

router.post('/', 
  body('email', 'email is required').notEmpty(),
  body('password', 'password is required').notEmpty(),
  validationResultHandler,
  tryCatch(createUserController)
)

router.patch('/:userId',
  tryCatch(updateUserController)
)

router.delete('/:userId',
  tryCatch(deleteUserController)
)

router.use(notFoundHandler)

export default router;