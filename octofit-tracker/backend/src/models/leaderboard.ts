import { Schema, model, type Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: string;
  score: number;
  rank: number;
  trend: string;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: String, required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
  trend: { type: String, default: 'up' }
}, { timestamps: true });

export const Leaderboard = model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
