import { connectToDatabase, disconnectFromDatabase } from '../config/database';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Workout } from '../models/workout';

// Seed the octofit_db database with test data.

async function seedDatabase() {
  try {
    await connectToDatabase();

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const users = await User.insertMany([
      { name: 'Maya Chen', email: 'maya@example.com', role: 'captain', fitnessGoal: 'Improve stamina' },
      { name: 'Jordan Diaz', email: 'jordan@example.com', role: 'member', fitnessGoal: 'Build strength' },
      { name: 'Ava Patel', email: 'ava@example.com', role: 'member', fitnessGoal: 'Lose weight' }
    ]);

    await Team.insertMany([
      {
        name: 'River Runners',
        description: 'A team focused on endurance and weekend runs.',
        members: users.slice(0, 2).map((user) => user._id.toString())
      },
      {
        name: 'Peak Performers',
        description: 'A team focused on strength and HIIT.',
        members: [users[2]._id.toString()]
      }
    ]);

    await Activity.insertMany([
      { userId: users[0]._id.toString(), type: 'Run', durationMinutes: 35, distanceKm: 5.5, caloriesBurned: 420 },
      { userId: users[1]._id.toString(), type: 'Strength', durationMinutes: 45, caloriesBurned: 310 },
      { userId: users[2]._id.toString(), type: 'Cycling', durationMinutes: 60, distanceKm: 18, caloriesBurned: 560 }
    ]);

    await Leaderboard.insertMany([
      { userId: users[0]._id.toString(), score: 980, rank: 1, trend: 'up' },
      { userId: users[1]._id.toString(), score: 912, rank: 2, trend: 'steady' },
      { userId: users[2]._id.toString(), score: 875, rank: 3, trend: 'up' }
    ]);

    await Workout.insertMany([
      { title: 'Tempo Run', focus: 'Cardio', durationMinutes: 30, difficulty: 'Intermediate' },
      { title: 'Core Blast', focus: 'Core', durationMinutes: 20, difficulty: 'Beginner' },
      { title: 'Power Circuit', focus: 'Strength', durationMinutes: 40, difficulty: 'Advanced' }
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await disconnectFromDatabase();
  }
}

seedDatabase();
