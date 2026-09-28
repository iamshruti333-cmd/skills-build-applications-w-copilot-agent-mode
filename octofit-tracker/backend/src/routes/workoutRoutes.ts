import { Router } from 'express';
import Workout from '../models/Workout.js';

const router = Router();

router.get('/', async (_request, response) => {
  try {
    const workouts = await Workout.find();
    response.json(workouts);
  } catch (error) {
    response.status(500).json({ message: 'Failed to fetch workouts', error });
  }
});

router.post('/', async (request, response) => {
  try {
    const workout = await Workout.create(request.body);
    response.status(201).json(workout);
  } catch (error) {
    response.status(400).json({ message: 'Failed to create workout', error });
  }
});

export default router;
