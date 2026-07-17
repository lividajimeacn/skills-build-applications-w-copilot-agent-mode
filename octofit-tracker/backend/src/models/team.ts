import { Schema, model, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description: string;
  members: string[];
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: String }]
}, { timestamps: true });

export const Team = model<ITeam>('Team', teamSchema);
