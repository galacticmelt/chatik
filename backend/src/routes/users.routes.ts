import express from "express";
import { body } from 'express-validator';
import { validationResultHandler } from "../middleware/validationResultHandler.js";
import { notFoundHandler } from "../middleware/notFoundHandler.js";
import { bearerPassport } from "../middleware/passport.js";
import { tryCatch } from "../helpers/tryCatch.js";
import { 
  getUserByParams, getUserById, createUser, updateUser, deleteUser 
} from "../controllers/users.controllers.js";


const router = express.Router()

router.get('/',
  bearerPassport,
  tryCatch(getUserByParams)
)

router.get('/:userId',
  bearerPassport,
  tryCatch(getUserById)
)

router.post('/', 
  body('email', 'email is required').notEmpty(),
  body('password', 'password is required').notEmpty(),
  validationResultHandler,
  tryCatch(createUser)
)

router.patch('/:userId',
  tryCatch(updateUser)
)

router.delete('/:userId',
  tryCatch(deleteUser)
)

router.use(notFoundHandler)

export default router;