import express from "express";
const router = express.Router()
import env from '../environment'
import { jest } from '@jest/globals'

import { getUsers, createUser, deleteUser, updateUser } from "../services/users.service.js";

router.get('/', async (req, res) => {
  try {
    const result = await getUsers(req.body);
    return res.status(201).send(result)
  } catch (err: any) {
    return res.status(500).send(err.name + ': ' + err.message)
  }
})

router.post('/', async (req, res) => {
    try {
      const user = await createUser(req.body)
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