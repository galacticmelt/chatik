import express from "express";
import jwt from "jsonwebtoken";
import { body, validationResult } from 'express-validator';
import env from "../environment.js"
import { getUsers } from "../services/users.service.js";
import checkIfDocExists from "../middleware/checkIfDocExists.js";

const router = express.Router();

interface IDecoded {
  email: string,
  password: string,
}

router.post('/', 
    body('email', 'email is required').notEmpty(),
    body('password', 'password is required').notEmpty(),
    async (req, res) => {
      const errors = validationResult(req)
      if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      try {
        const { email, password } = req.body
        const user = await getUsers({email: email})
        if(!user) {
          return res.status(401).send('No user with this email')
        }
        const decoded = await jwt.verify(user[0].token, env.jwtSecret) as IDecoded;
        if(decoded.password !== password) {
          return res.status(401).send('Wrong password')
        }
        return res.status(201).json(user[0].token);
      } catch (err: any) {
        return res.status(500).send(err.name + ': ' + err.message)
      }
  }
)

export default router;