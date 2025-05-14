
const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  completedLabs: [{
    type: String,
    ref: 'Lab'
  }],
  labProgress: {
    type: Map,
    of: Number,
    default: {}
  },
  earnedBadges: [String],
  totalHours: {
    type: Number,
    default: 0
  },
  currentStreak: {
    type: Number,
    default: 0
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Progress', ProgressSchema);
