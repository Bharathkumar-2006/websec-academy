
const express = require('express');
const Progress = require('../models/Progress');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user progress
router.get('/', auth, async (req, res) => {
  try {
    let progress = await Progress.findOne({ user: req.user._id });
    
    // Create progress if it doesn't exist
    if (!progress) {
      progress = new Progress({
        user: req.user._id
      });
      await progress.save();
    }
    
    // Update lastActive
    progress.lastActive = new Date();
    await progress.save();
    
    // Convert Map to object for labProgress
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
      lastActive: progress.lastActive
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ message: 'Server error getting progress' });
  }
});

// Complete a lab
router.post('/complete-lab', auth, async (req, res) => {
  try {
    const { labId } = req.body;
    
    if (!labId) {
      return res.status(400).json({ message: 'Lab ID is required' });
    }
    
    let progress = await Progress.findOne({ user: req.user._id });
    
    if (!progress) {
      progress = new Progress({
        user: req.user._id
      });
    }
    
    // Add to completed labs if not already completed
    if (!progress.completedLabs.includes(labId)) {
      progress.completedLabs.push(labId);
      
      // Remove from labProgress if it exists there
      progress.labProgress.delete(labId);
      
      // Check for badges (simple logic - can be expanded)
      const completedCount = progress.completedLabs.length;
      
      if (completedCount === 1 && !progress.earnedBadges.includes('first-lab')) {
        progress.earnedBadges.push('first-lab');
      }
      
      if (completedCount === 5 && !progress.earnedBadges.includes('lab-enthusiast')) {
        progress.earnedBadges.push('lab-enthusiast');
      }
      
      if (completedCount === 10 && !progress.earnedBadges.includes('lab-master')) {
        progress.earnedBadges.push('lab-master');
      }
      
      // Add to total hours (rough estimate)
      progress.totalHours += 0.5;
      
      // Update streak
      const lastDay = new Date(progress.lastActive);
      const today = new Date();
      const diffTime = Math.abs(today - lastDay);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 1) {
        progress.currentStreak += 1;
      } else {
        progress.currentStreak = 1;
      }
      
      progress.lastActive = today;
      await progress.save();
    }
    
    res.json({ success: true, message: 'Lab completed successfully' });
  } catch (error) {
    console.error('Complete lab error:', error);
    res.status(500).json({ message: 'Server error completing lab' });
  }
});

// Update lab progress
router.post('/update-lab', auth, async (req, res) => {
  try {
    const { labId, percentage } = req.body;
    
    if (!labId || percentage === undefined) {
      return res.status(400).json({ message: 'Lab ID and percentage are required' });
    }
    
    let progress = await Progress.findOne({ user: req.user._id });
    
    if (!progress) {
      progress = new Progress({
        user: req.user._id
      });
    }
    
    // Don't update if lab is already completed
    if (progress.completedLabs.includes(labId)) {
      return res.json({ success: true, message: 'Lab already completed' });
    }
    
    // Update progress percentage
    progress.labProgress.set(labId, percentage);
    
    // If percentage is 100, add to completed labs
    if (percentage === 100) {
      progress.completedLabs.push(labId);
      progress.labProgress.delete(labId);
    }
    
    progress.lastActive = new Date();
    await progress.save();
    
    res.json({ success: true, message: 'Lab progress updated' });
  } catch (error) {
    console.error('Update lab progress error:', error);
    res.status(500).json({ message: 'Server error updating lab progress' });
  }
});

module.exports = router;
