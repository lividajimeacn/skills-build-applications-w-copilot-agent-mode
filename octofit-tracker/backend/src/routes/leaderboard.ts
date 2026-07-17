import { Router } from 'express';
import { Leaderboard } from '../models/leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  const entries = await Leaderboard.find({});
  res.json({ message: 'Leaderboard route', entries });
});

export default router;
