import express from "express";
import { body, cookie } from 'express-validator';
import { validationResultHandler } from "../middleware/validationResultHandler.js";
import { tryCatch } from "../helpers/tryCatch.js";
import { createMessage, getMessagesByChat, deleteMessage } from "../controllers/messages.controllers.js";

const router = express.Router();

router.post('/', tryCatch(createMessage));

router.get('/getByChat/:chatId', tryCatch(getMessagesByChat));

router.delete('/', tryCatch(deleteMessage));

export default router