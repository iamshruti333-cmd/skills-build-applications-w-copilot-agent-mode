import mongoose from 'mongoose';

const leaderboardEntrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    rank: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true },
);

const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardEntrySchema);

export default LeaderboardEntry;
