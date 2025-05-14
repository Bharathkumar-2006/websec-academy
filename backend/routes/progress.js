const express = require('express');
const Progress = require('../models/Progress');
const auth = require('../middleware/auth');
const router = express.Router();

// Helper function to get or create progress for a user
async function getOrCreateProgress(userId) {
  let progress = await Progress.findOne({ user: userId });

  if (!progress) {
    progress = new Progress({
      user: userId,
    });
    await progress.save();
  }

  return progress;
}

// Get user progress
router.get('/', auth, async (req, res) => {
  try {
    let progress = await getOrCreateProgress(req.user._id);

    // Update lastActive
    progress.lastActive = new Date();
    await progress.save();

    const labProgressObject = {};
    progress.labProgress.forEach((value, key) => {
      labProgressObject[key] = value;
    });

    res.json({
      completedLabs: progress.completedLabs,
      labProgress: labProgressObject,
      earnedBadges: progress.earnedBadges,
      totalHours: progress.totalHours,
      currentStreak: progress.currentStreak,
      lastActive: progress.lastActive,
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ message: 'Error getting progress' });
  }
});

// Complete a lab
router.post('/complete-lab', auth, async (req, res) => {
  try {
    const { labId } = req.body;

    if (!labId) {
      return res.status(400).json({ message: 'Lab ID is required' });
    }

    let progress = await getOrCreateProgress(req.user._id);

    if (!progress.completedLabs.includes(labId)) {
      progress.completedLabs.push(labId);
      progress.labProgress.delete(labId); 

      const completedCount = progress.completedLabs.length;

      // Add badges based on the count of completed labs
      if (completedCount === 1 && !progress.earnedBadges.includes('first-lab')) {
        progress.earnedBadges.push('first-lab');
      }

      if (completedCount === 5 && !progress.earnedBadges.includes('lab-enthusiast')) {
        progress.earnedBadges.push('lab-enthusiast');
      }

      if (completedCount === 10 && !progress.earnedBadges.includes('lab-master')) {
        progress.earnedBadges.push('lab-master');
      }

      progress.totalHours += 0.5; // Add hours for completed lab
      progress.currentStreak = (new Date() - new Date(progress.lastActive)) <= 1 ? progress.currentStreak + 1 : 1;

      progress.lastActive = new Date();
      await progress.save();
    }

    res.json({ success: true, message: 'Lab completed successfully' });
  } catch (error) {
    console.error('Complete lab error:', error);
    res.status(500).json({ message: 'Error completing lab' });
  }
});

// Update lab progress
router.post('/update-lab', auth, async (req, res) => {
  try {
    const { labId, percentage } = req.body;

    if (!labId || percentage === undefined) {
      return res.status(400).json({ message: 'Lab ID and percentage are required' });
    }

    let progress = await getOrCreateProgress(req.user._id);

    if (progress.completedLabs.includes(labId)) {
      return res.json({ success: true, message: 'Lab already completed' });
    }

    progress.labProgress.set(labId, percentage);

    if (percentage === 100) {
      progress.completedLabs.push(labId);
      progress.labProgress.delete(labId);
    }

    progress.lastActive = new Date();
    await progress.save();

    res.json({ success: true, message: 'Lab progress updated' });
  } catch (error) {
    console.error('Update lab progress error:', error);
    res.status(500).json({ message: 'Error updating lab progress' });
  }
});

module.exports = router;
