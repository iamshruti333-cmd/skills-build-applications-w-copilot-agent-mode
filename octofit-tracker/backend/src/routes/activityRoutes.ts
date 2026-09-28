import { Router } from 'express';
import Activity from '../models/Activity.js';

const router = Router();

router.get('/', async (_request, response) => {
  try {
    const activities = await Activity.find().populate('user');
    response.json(activities);
  } catch (error) {
    response.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

router.post('/', async (request, response) => {
  try {
    const activity = await Activity.create(request.body);
    response.status(201).json(activity);
  } catch (error) {
    response.status(400).json({ message: 'Failed to create activity', error });
  }
});

export default router;
