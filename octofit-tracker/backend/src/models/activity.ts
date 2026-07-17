import { Schema, model, type Document } from 'mongoose';

export interface IActivity extends Document {
  userId: string;
  type: string;
  durationMinutes: number;
  distanceKm?: number;
  caloriesBurned: number;
}

const activitySchema = new Schema<IActivity>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number },
  caloriesBurned: { type: Number, required: true }
}, { timestamps: true });

export const Activity = model<IActivity>('Activity', activitySchema);
