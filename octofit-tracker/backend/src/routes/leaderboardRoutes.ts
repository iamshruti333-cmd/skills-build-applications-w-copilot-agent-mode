import { Router } from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry.js';

const router = Router();

router.get('/', async (_request, response) => {
  try {
    const leaderboard = await LeaderboardEntry.find().populate('user').sort({ score: -1, rank: 1 });
    response.json(leaderboard);
  } catch (error) {
    response.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
});

router.post('/', async (request, response) => {
  try {
    const entry = await LeaderboardEntry.create(request.body);
    response.status(201).json(entry);
  } catch (error) {
    response.status(400).json({ message: 'Failed to add leaderboard entry', error });
  }
});

export default router;
