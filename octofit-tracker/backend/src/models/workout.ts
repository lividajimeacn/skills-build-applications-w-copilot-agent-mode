import { Schema, model, type Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  focus: string;
  durationMinutes: number;
  difficulty: string;
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  focus: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, default: 'Intermediate' }
}, { timestamps: true });

export const Workout = model<IWorkout>('Workout', workoutSchema);
