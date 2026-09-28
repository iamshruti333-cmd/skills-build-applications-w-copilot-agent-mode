import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import LeaderboardEntry from '../models/LeaderboardEntry.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Maya Chen',
        email: 'maya.chen@example.com',
        username: 'mayachen',
        fitnessLevel: 'intermediate',
      },
      {
        name: 'Jordan Brooks',
        email: 'jordan.brooks@example.com',
        username: 'jbrooks',
        fitnessLevel: 'advanced',
      },
      {
        name: 'Priya Shah',
        email: 'priya.shah@example.com',
        username: 'priyashah',
        fitnessLevel: 'beginner',
      },
      {
        name: 'Leo Martins',
        email: 'leo.martins@example.com',
        username: 'leomartins',
        fitnessLevel: 'intermediate',
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Summit Striders',
        description: 'A steady team focused on endurance and consistency.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Morning Momentum',
        description: 'Building healthy routines one workout at a time.',
        members: [users[2]._id, users[3]._id],
      },
    ]);

    await User.bulkWrite([
      { updateOne: { filter: { _id: users[0]._id }, update: { team: teams[0]._id } } },
      { updateOne: { filter: { _id: users[1]._id }, update: { team: teams[0]._id } } },
      { updateOne: { filter: { _id: users[2]._id }, update: { team: teams[1]._id } } },
      { updateOne: { filter: { _id: users[3]._id }, update: { team: teams[1]._id } } },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Running',
        durationMinutes: 42,
        caloriesBurned: 410,
        date: new Date('2026-09-25T07:30:00Z'),
      },
      {
        user: users[1]._id,
        type: 'Cycling',
        durationMinutes: 58,
        caloriesBurned: 620,
        date: new Date('2026-09-26T06:45:00Z'),
      },
      {
        user: users[2]._id,
        type: 'Yoga',
        durationMinutes: 30,
        caloriesBurned: 140,
        date: new Date('2026-09-26T18:00:00Z'),
      },
      {
        user: users[3]._id,
        type: 'Strength Training',
        durationMinutes: 45,
        caloriesBurned: 360,
        date: new Date('2026-09-27T17:15:00Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { user: users[1]._id, score: 1840, rank: 1 },
      { user: users[0]._id, score: 1625, rank: 2 },
      { user: users[3]._id, score: 1390, rank: 3 },
      { user: users[2]._id, score: 980, rank: 4 },
    ]);

    await Workout.insertMany([
      {
        name: 'Full-Body Foundations',
        category: 'Strength',
        difficulty: 'beginner',
        durationMinutes: 25,
        description: 'A balanced introduction to squats, presses, hinges, and core work.',
      },
      {
        name: 'Tempo Run Builder',
        category: 'Cardio',
        difficulty: 'intermediate',
        durationMinutes: 35,
        description: 'Intervals that build sustainable speed and aerobic capacity.',
      },
      {
        name: 'Power and Mobility',
        category: 'Mobility',
        difficulty: 'advanced',
        durationMinutes: 45,
        description: 'Dynamic mobility paired with explosive movements for experienced athletes.',
      },
    ]);

    console.log('Database seeding complete: 4 users, 2 teams, 4 activities, 4 leaderboard entries, and 3 workouts');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
