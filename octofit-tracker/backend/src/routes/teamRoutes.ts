import { Router } from 'express';
import Team from '../models/Team.js';

const router = Router();

router.get('/', async (_request, response) => {
  try {
    const teams = await Team.find().populate('members');
    response.json(teams);
  } catch (error) {
    response.status(500).json({ message: 'Failed to fetch teams', error });
  }
});

router.post('/', async (request, response) => {
  try {
    const team = await Team.create(request.body);
    response.status(201).json(team);
  } catch (error) {
    response.status(400).json({ message: 'Failed to create team', error });
  }
});

export default router;
