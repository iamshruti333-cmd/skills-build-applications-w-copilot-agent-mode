import { Router } from 'express';
import User from '../models/User.js';

const router = Router();

router.get('/', async (_request, response) => {
  try {
    const users = await User.find().populate('team');
    response.json(users);
  } catch (error) {
    response.status(500).json({ message: 'Failed to fetch users', error });
  }
});

router.post('/', async (request, response) => {
  try {
    const user = await User.create(request.body);
    response.status(201).json(user);
  } catch (error) {
    response.status(400).json({ message: 'Failed to create user', error });
  }
});

export default router;
