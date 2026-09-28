import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    durationMinutes: {
      type: Number,
      required: true,
      min: 5,
    },
    description: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;
