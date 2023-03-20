import express from "express";
import jwt from "jsonwebtoken";
import { body, param, validationResult } from 'express-validator';
import env from "../environment.js"
import { getUsers, createUser, deleteUser, updateUser } from "../services/users.service.js";
import checkIfDocExists from "../middleware/checkIfDocExists.js";

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const result = await getUsers(req.body);
    return res.status(201).send(result)
  } catch (err: any) {
    return res.status(500).send(err.name + ': ' + err.message)
  }
})

router.post('/', 
    body('email', 'email is required')
    .notEmpty()
    .custom((value: string) => checkIfDocExists(true, value, getUsers, {email: value})),
    body('password', 'password is required').notEmpty(),
    async (req, res) => {
      const errors = validationResult(req)
      if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      try {
        const { email, password } = req.body
        const token = await jwt.sign({email, password}, env.jwtSecret);
        const user = await createUser({token: token, ...req.body})
        if(!user) {
          return res.status(401).send('error, user not created')
        }
        return res.status(201).send('user created');
      } catch (err: any) {
        return res.status(500).send(err.name + ': ' + err.message)
      }
  }
)

router.patch('/:userId', async (req, res) => {
  try {
    const user = await updateUser(req.params.userId, req.body)
    if(!user) {
      return res.status(401).send('error, user not updated')
    }
    return res.status(201).send('user updated');
  } catch (err: any) {
    return res.status(500).send(err.name + ': ' + err.message)
  }
}
)

router.delete('/:userId', async (req, res) => {
  try {
    const deleted = await deleteUser(req.params.userId)
    if(!deleted) {
      return res.status(401).send('error, user not deleted')
    }
    return res.status(201).send('user deleted')
  } catch (err: any) {
    return res.status(500).send(err.name + ': ' + err.message)
  }
})

export default router;