import express from "express";
import { body, cookie } from 'express-validator';
import { validationResultHandler } from "../middleware/validationResultHandler.js";
import { tryCatch } from "../helpers/tryCatch.js";
import { createChatCTRL, getChatsByUserCTRL, deleteChatCTRL } from "../controllers/chats.controllers.js";

const router = express.Router();

router.post('/', tryCatch(createChatCTRL))

router.get('/getByUser/:userId', tryCatch(getChatsByUserCTRL))

router.delete('/:chatId', tryCatch(deleteChatCTRL))

export default router;